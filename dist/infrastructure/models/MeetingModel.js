"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingModel = void 0;
const mongoose_1 = require("mongoose");
const MeetingSchema = new mongoose_1.Schema({
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
    startDatetime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        default: null,
    },
    detail: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    // For privatemeting
    isPrivate: {
        type: Boolean,
        default: false,
    },
    userIds: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "users",
        default: null,
    },
    freeTimeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: null,
    },
}, { timestamps: true });
exports.MeetingModel = (0, mongoose_1.model)("meetings", MeetingSchema);
exports.default = exports.MeetingModel;
//# sourceMappingURL=MeetingModel.js.map