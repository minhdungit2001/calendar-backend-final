"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInfoModel = void 0;
const mongoose_1 = require("mongoose");
const FileInfoSchema = new mongoose_1.Schema({
    groupId: {
        type: mongoose_1.Schema.Types.ObjectId,
        immutable: true,
        required: true,
        ref: "groups",
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        immutable: true,
        ref: "users",
    },
    exerciseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        immutable: true,
        ref: "exercises",
    },
    type: {
        type: String,
        required: true,
        default: "description",
    },
    fileId: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    webContentLink: {
        type: String,
        required: true,
    },
    webViewLink: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.FileInfoModel = (0, mongoose_1.model)("fileInfos", FileInfoSchema);
exports.default = exports.FileInfoModel;
//# sourceMappingURL=FileInfoModel.js.map