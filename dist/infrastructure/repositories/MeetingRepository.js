"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MeetingModel_1 = require("../models/MeetingModel");
const mongoose_1 = require("mongoose");
const BaseCrudRepository_1 = __importDefault(require("./base/BaseCrudRepository"));
/**
 * Example of implementation abstract class base
 */
class MeetingRepository extends BaseCrudRepository_1.default {
    constructor() {
        super(MeetingModel_1.MeetingModel);
    }
    findByIdPopulateAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel.findById(id).populate("adminId groupId");
        });
    }
    findAllMeetingWithStatusAsync(userId, groupIds, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupIdsSchema = groupIds.map((groupId) => new mongoose_1.Types.ObjectId(groupId));
            const matchConditions = {
                $or: [
                    { groupId: { $in: groupIdsSchema }, isPrivate: false },
                    { adminId: new mongoose_1.Types.ObjectId(userId) },
                    { userIds: new mongoose_1.Types.ObjectId(userId) },
                ],
                startDatetime: { $gt: new Date(startDate), $lt: new Date(endDate) },
            };
            return yield this.findMeetingsWithStatusAsync(matchConditions);
        });
    }
    findByGroupIdsWithStatusAsync(groupIds, startDate, endDate, userId, isAdmin, isPrivate = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupIdsSchema = groupIds.map((groupId) => new mongoose_1.Types.ObjectId(groupId));
            const conditionOr = [];
            // Public thì tất cả đều có thể xem
            if (isPrivate === false) {
                conditionOr.push({
                    isPrivate: false,
                });
            }
            // Nếu là admin thì lấy cả cái private
            if (isAdmin && isPrivate) {
                conditionOr.push({ isPrivate: true });
            }
            // Trường hợp không phải admin chỉ lấy những cái private của mình
            if (!isAdmin && isPrivate) {
                conditionOr.push(Object.assign(Object.assign({}, (userId ? { userIds: new mongoose_1.Types.ObjectId(userId) } : null)), { isPrivate: true }));
            }
            const matchConditions = {
                groupId: { $in: groupIdsSchema },
                startDatetime: { $gt: new Date(startDate), $lt: new Date(endDate) },
                $or: conditionOr,
            };
            return yield this.findMeetingsWithStatusAsync(matchConditions);
        });
    }
    findByUserIdWithStatusAsync(groupIds, userId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupIdsSchema = groupIds.map((groupId) => new mongoose_1.Types.ObjectId(groupId));
            const matchConditions = {
                groupId: { $in: groupIdsSchema },
                isPrivate: true,
                userIds: new mongoose_1.Types.ObjectId(userId),
                startDatetime: { $gt: new Date(startDate), $lt: new Date(endDate) },
            };
            return yield this.findMeetingsWithStatusAsync(matchConditions);
        });
    }
    // async findByAdminIdWithStatusAsync(
    //   adminId: string,
    //   startDate: Date | number | string,
    //   endDate: Date | number | string
    // ) {
    //   const matchConditions = {
    //     adminId: new Types.ObjectId(adminId),
    //     startDatetime: { $gt: new Date(startDate), $lt: new Date(endDate) },
    //   };
    //   return await this.findMeetingsWithStatusAsync(matchConditions);
    // }
    findMeetingsWithStatusAsync(matchConditions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel.aggregate([
                {
                    $match: matchConditions,
                },
                {
                    $sort: { startDatetime: 1 },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userIds",
                        foreignField: "_id",
                        as: "userIds", // New name
                    },
                },
                {
                    $lookup: {
                        from: "groups",
                        localField: "groupId",
                        foreignField: "_id",
                        as: "groupId",
                    },
                },
                {
                    $unwind: "$groupId",
                },
                {
                    $group: {
                        _id: {
                            status: {
                                $cond: {
                                    if: {
                                        $gte: ["$startDatetime", "$$NOW"],
                                    },
                                    then: "upcoming",
                                    else: "passed",
                                },
                            },
                        },
                        documents: {
                            $push: "$$ROOT",
                        },
                    },
                },
                {
                    $project: {
                        status: "$_id.status",
                        _id: 0,
                        documents: 1,
                    },
                },
                {
                    $unwind: "$documents",
                },
                {
                    $group: {
                        _id: {
                            date: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: {
                                        $add: ["$documents.startDatetime", 7 * 60 * 60 * 1000],
                                    },
                                },
                            },
                            status: "$status",
                        },
                        count: { $sum: 1 },
                        documents: {
                            $push: "$$ROOT.documents",
                        },
                    },
                },
                {
                    $sort: { "_id.date": 1 },
                },
            ]);
        });
    }
    findMeetingPeriod(startDate, endDate, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const meetings = yield this.moongoseModel.aggregate([
                {
                    $match: {
                        $or: [
                            { adminId: new mongoose_1.Types.ObjectId(userId) },
                            { userIds: new mongoose_1.Types.ObjectId(userId) },
                        ],
                    },
                },
                {
                    $match: {
                        $or: [
                            {
                                $and: [
                                    { startDatetime: { $gte: startDate } },
                                    { startDatetime: { $lt: endDate } },
                                ],
                            },
                            {
                                $expr: {
                                    $and: [
                                        { $gte: ["$startDatetime", startDate] },
                                        {
                                            $lte: [
                                                {
                                                    $add: [
                                                        "$startDatetime",
                                                        { $multiply: ["$duration", 60000] },
                                                    ],
                                                },
                                                endDate,
                                            ],
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                },
            ]);
            return meetings;
        });
    }
}
exports.default = MeetingRepository;
//# sourceMappingURL=MeetingRepository.js.map