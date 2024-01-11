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
const BaseCrudController_1 = __importDefault(require("./base/BaseCrudController"));
const MeetingService_1 = __importDefault(require("../../application/services/MeetingService"));
const Meeting_1 = require("../../application/dtos/Meeting");
class MeetingController extends BaseCrudController_1.default {
    constructor() {
        super(new MeetingService_1.default(), Meeting_1.MeetingDto, Meeting_1.MeetingCreateDto, Meeting_1.MeetingUpdateDto);
        this.addUserIdsAsync = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userIds } = req.body;
            const response = yield this.meetingService.updateOneAddItemsByIdAsync(id, "userIds", userIds);
            res.status(200).json(response);
        });
        this.removeUserIdsAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userIds } = req.body;
            const response = yield this.meetingService.updateOneRemoveItemsByIdAsync(id, "userIds", userIds);
            res.status(200).json(response);
        });
        this.findByFreeTimeIdAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { freeTimeId } = req.params;
            const meetings = yield this.meetingService.findByCollectionIdAsync("freeTimeId", freeTimeId);
            var result = null;
            if (meetings && meetings.length > 0) {
                result = meetings[0];
            }
            res.status(200).json(result);
        });
        this.findAllMeetingWithStatusAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { startDatetime, endDatetime } = req.queryValid;
            const { userId } = req.params;
            const meetings = yield this.meetingService.findAllMeetingWithStatusAsync(userId, startDatetime, endDatetime);
            res.status(200).json(meetings);
        });
        this.filterMeetingsByUserIdAysnc = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userFilter, groupId } = req.params;
            const meetings = yield this.meetingService.filterMeetingsByUserIdAysnc(userFilter, groupId);
            res.status(200).json(meetings);
        });
        this.findByUserIdWithStatusAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, groupId } = req.params;
            const { startDatetime, endDatetime } = req.queryValid;
            const meetings = yield this.meetingService.findByUserIdWithStatusAsync([groupId], userId, startDatetime, endDatetime);
            res.status(200).json(meetings);
        });
        this.findByGroupIdAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { startDatetime, endDatetime, isAdmin, isPrivate } = req.queryValid;
            const { userId, groupId } = req.params;
            const meetings = yield this.meetingService.findByGroupIdsWithStatusAsync([groupId], startDatetime, endDatetime, userId, isAdmin, isPrivate);
            res.status(200).json(meetings);
        });
        this.meetingService = new MeetingService_1.default();
    }
}
exports.default = MeetingController;
//# sourceMappingURL=MeetingController.js.map