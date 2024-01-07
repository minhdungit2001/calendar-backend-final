"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
const mongoose_1 = require("mongoose");
const GroupSchema = new mongoose_1.Schema({
    adminId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        immutable: true,
        ref: "users",
    },
    userIds: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "users",
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
    maxGuest: {
        type: Number,
        default: 1,
    },
}, { timestamps: true });
exports.GroupModel = (0, mongoose_1.model)("groups", GroupSchema);
exports.default = exports.GroupModel;
//# sourceMappingURL=GroupModel.js.map