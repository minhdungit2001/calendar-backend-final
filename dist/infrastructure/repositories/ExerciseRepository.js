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
const mongoose_1 = require("mongoose");
const ExerciseModel_1 = require("../models/ExerciseModel");
const BaseCrudRepository_1 = __importDefault(require("./base/BaseCrudRepository"));
class ExerciseRepository extends BaseCrudRepository_1.default {
    constructor() {
        super(ExerciseModel_1.ExerciseModel);
    }
    findByIdPopulateAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel
                .findById(id)
                .populate("fileInfoId groupId submittedIds.fileInfoId submittedIds.userId");
        });
    }
    findByGroupIdAsync(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exercises = yield this.moongoseModel
                .find({
                groupId: groupId,
            })
                .populate("fileInfoId groupId submittedIds.fileInfoId submittedIds.userId");
            return exercises;
        });
    }
    updateSubmittedIdsAsync(id, userId, fileInfoId, isPush = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let updateAggregate = {
                $push: {
                    submittedIds: {
                        userId: userId,
                        fileInfoId: fileInfoId,
                        submittedAt: new Date(),
                    },
                },
            };
            if (!isPush) {
                updateAggregate = { $pull: { submittedIds: { userId: userId } } };
            }
            return yield this.moongoseModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, updateAggregate, { new: true });
        });
    }
}
exports.default = ExerciseRepository;
//# sourceMappingURL=ExerciseRepository.js.map