"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseModel = void 0;
const mongoose_1 = require("mongoose");
const ExerciseSchema = new mongoose_1.Schema({
    groupId: {
        type: mongoose_1.Schema.Types.ObjectId,
        immutable: true,
        required: true,
        ref: "groups",
    },
    adminId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        immutable: true,
        ref: "users",
    },
    fileInfoId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "fileInfos",
    },
    submittedIds: {
        type: [
            {
                userId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "users",
                },
                fileInfoId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "fileInfos",
                },
                submittedAt: Date,
            },
        ],
        default: [],
    },
    startDatetime: {
        type: Date,
        default: new Date(),
    },
    endDatetime: {
        type: Date,
        default: new Date().setMonth(new Date().getMonth() + 6),
    },
    name: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
}, { timestamps: true });
exports.ExerciseModel = (0, mongoose_1.model)("exercises", ExerciseSchema);
exports.default = exports.ExerciseModel;
//# sourceMappingURL=ExerciseModel.js.map