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
const FileInfoModel_1 = require("../models/FileInfoModel");
const BaseCrudRepository_1 = __importDefault(require("./base/BaseCrudRepository"));
const mongoose_1 = require("mongoose");
/**
 * Example of implementation abstract class base
 */
class FileInfoRepository extends BaseCrudRepository_1.default {
    constructor() {
        super(FileInfoModel_1.FileInfoModel);
    }
    findByIdPopulateAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel
                .findById(id)
                .populate("userId groupId exerciseId");
        });
    }
    /**
     * Tìm tất cả Submitted của exercise
     * @param groupId
     * @param exerciseId
     * @returns
     */
    findSubmittedRoleAdminAsync(groupId, exerciseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel
                .find({
                $and: [
                    { groupId: new mongoose_1.Types.ObjectId(groupId) },
                    { exerciseId: new mongoose_1.Types.ObjectId(exerciseId) },
                    { type: "submitted" },
                ],
            })
                .sort({ createdAt: -1 });
        });
    }
    /**
     * Tìm submitted của bản thân trong exercise này, chi 1 submitted được cho phép
     * @param groupId
     * @param exerciseId
     * @param userId
     * @returns
     */
    findSubmittedRoleMemberAsync(groupId, exerciseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel
                .find({
                $and: [
                    { groupId: new mongoose_1.Types.ObjectId(groupId) },
                    { exerciseId: new mongoose_1.Types.ObjectId(exerciseId) },
                    { userId: new mongoose_1.Types.ObjectId(userId) },
                    { type: "submitted" },
                ],
            })
                .sort({ createdAt: -1 });
        });
    }
    findDescriptionAsync(exerciseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel
                .find({
                $and: [
                    { exerciseId: new mongoose_1.Types.ObjectId(exerciseId) },
                    { type: "description" },
                ],
            })
                .sort({ createdAt: -1 });
        });
    }
    findByUserIdAsync(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel
                .find({
                userId: new mongoose_1.Types.ObjectId(userId),
            })
                .sort({ createdAt: -1 });
        });
    }
    findByGroupIdAsync(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel
                .find({
                groupId: new mongoose_1.Types.ObjectId(groupId),
            })
                .sort({ createdAt: -1 });
        });
    }
}
exports.default = FileInfoRepository;
//# sourceMappingURL=FileInfoRepository.js.map