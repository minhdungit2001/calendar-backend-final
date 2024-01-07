"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeslotModel = void 0;
const mongoose_1 = require("mongoose");
const TimeslotSchema = new mongoose_1.Schema({
    adminId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        immutable: true,
        ref: "users",
    },
    freeTimes: {
        type: [
            {
                startDatetime: { type: Date },
                duration: { type: Number },
            },
        ],
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
    location: {
        type: String,
        default: null,
    },
    detail: {
        type: String,
        default: null,
    },
    typeMeeting: {
        type: String, // "individual" or "group"
        default: "individual",
    },
}, { timestamps: true });
exports.TimeslotModel = (0, mongoose_1.model)("timeslots", TimeslotSchema);
exports.default = exports.TimeslotModel;
//# sourceMappingURL=TimeslotModel.js.map