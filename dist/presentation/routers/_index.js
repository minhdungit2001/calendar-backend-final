"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = __importDefault(require("./base/test"));
const AuthUserRouter_1 = __importDefault(require("./AuthUserRouter"));
const MeetingRouter_1 = __importDefault(require("./MeetingRouter"));
const ExerciseRouter_1 = __importDefault(require("./ExerciseRouter"));
const FileInfoRouter_1 = __importDefault(require("./FileInfoRouter"));
const TimeslotRouter_1 = __importDefault(require("./TimeslotRouter"));
const GroupRouter_1 = __importDefault(require("./GroupRouter"));
function routerConfig(app) {
    app.use("/api/v1/test", test_1.default);
    app.use("/api/v1/users", AuthUserRouter_1.default);
    app.use("/api/v1/exercises", ExerciseRouter_1.default);
    app.use("/api/v1/fileInfos", FileInfoRouter_1.default);
    app.use("/api/v1/meetings", MeetingRouter_1.default);
    app.use("/api/v1/timeslots", TimeslotRouter_1.default);
    app.use("/api/v1/groups", GroupRouter_1.default);
}
exports.default = routerConfig;
//# sourceMappingURL=_index.js.map