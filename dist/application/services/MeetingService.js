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
const Meeting_1 = require("../dtos/Meeting");
const MeetingRepository_1 = __importDefault(require("../../infrastructure/repositories/MeetingRepository"));
const AuthUserService_1 = __importDefault(require("./AuthUserService"));
const BaseCrudService_1 = __importDefault(require("./base/BaseCrudService"));
const exceptions_1 = require("../exceptions");
class MeetingService extends BaseCrudService_1.default {
    constructor() {
        super(new MeetingRepository_1.default(), Meeting_1.MeetingDto);
        this.meetingRepository = new MeetingRepository_1.default();
        this.userRepository = new AuthUserService_1.default();
    }
    formatMeetingResponse(meetings) {
        let formatMeetings = {
            upcoming: [],
            passed: [],
            count: 0,
        };
        //TODO: Private user information
        meetings.forEach((item) => {
            if (item._id && item._id.status) {
                const status = item._id.status;
                const newElement = {
                    date: item._id.date,
                    documents: item.documents,
                    count: item.count,
                };
                formatMeetings.count += item.count;
                formatMeetings[status].push(newElement);
            }
        });
        formatMeetings.passed.reverse();
        return formatMeetings;
    }
    findAllMeetingWithStatusAsync(userId, startDate = new Date().setDate(new Date().getDate() - 15), endDate = new Date().setDate(new Date().getDate() + 15)) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = yield this.userRepository.findByIdAsync(userId);
            if (!userDto)
                return;
            const meetings = yield this.meetingRepository.findAllMeetingWithStatusAsync(userId, userDto.groupIds, startDate, endDate);
            return this.formatMeetingResponse(meetings);
        });
    }
    findByGroupIdsWithStatusAsync(groupIds, startDate = new Date().setDate(new Date().getDate() - 15), endDate = new Date().setDate(new Date().getDate() + 15), userId, isAdmin = false, isPrivate = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const meetings = yield this.meetingRepository.findByGroupIdsWithStatusAsync(groupIds, startDate, endDate, userId, isAdmin, isPrivate);
            return this.formatMeetingResponse(meetings);
        });
    }
    findByUserIdWithStatusAsync(groupIds, userId, startDate = new Date().setDate(new Date().getDate() - 15), endDate = new Date().setDate(new Date().getDate() + 15)) {
        return __awaiter(this, void 0, void 0, function* () {
            const meetings = yield this.meetingRepository.findByUserIdWithStatusAsync(groupIds, userId, startDate, endDate);
            return this.formatMeetingResponse(meetings);
        });
    }
    validMeetingsAsync(startDate, endDate, userId, meetingId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const existMeeting = yield this.meetingRepository.findMeetingPeriod(startDate, endDate, userId);
            if (existMeeting && existMeeting.length > 2) {
                throw new exceptions_1.BaseException(404, "CONFLICT_TIME", `CRUD ${this.modleName} failed! Conflict time.`);
            }
            if (existMeeting &&
                existMeeting.length == 1 &&
                ((_b = (_a = existMeeting[0]) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) != meetingId) {
                throw new exceptions_1.BaseException(404, "CONFLICT_TIME", `CRUD ${this.modleName} failed! Conflict time.`);
            }
        });
    }
    validMeetingTimeAsync(startDatetime, duration, adminId, userIds, meetingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(startDatetime);
            const endDate = new Date(startDatetime);
            endDate.setMinutes(endDate.getMinutes() + duration);
            if (startDate < new Date()) {
                throw new exceptions_1.ConflictException(404, "TIME_PASSED", `Start time cannot is passed.`);
            }
            if (userIds && userIds.length > 0) {
                yield Promise.all([
                    this.validMeetingsAsync(startDate, endDate, userIds[0], meetingId),
                    this.validMeetingsAsync(startDate, endDate, adminId, meetingId),
                ]);
            }
            else {
                yield Promise.all([
                    this.validMeetingsAsync(startDate, endDate, adminId, meetingId),
                ]);
            }
        });
    }
    /**
     * Creeate new entity
     * @param entityCreateDto data transfer object with accept filed create entity
     * @returns entityDto if successful
     */
    createAsync(meetingCreateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { adminId, userIds, startDatetime, duration } = meetingCreateDto;
            yield this.validMeetingTimeAsync(startDatetime, duration, adminId, userIds);
            const entity = yield this.crudRepository.createAsync(meetingCreateDto);
            // Convert to dto object
            return new this.EntityDto(entity);
        });
    }
    /**
     * update new entity
     * @param meetingUpdateDto data transfer object with accept filed create entity
     * @returns meetingDto if successful
     */
    updateAsync(id, meetingUpdateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userIds, startDatetime, duration = 0 } = meetingUpdateDto;
            const existMeeting = yield this.findByIdAsync(id);
            if (!existMeeting) {
                throw new exceptions_1.NotFoundException(404, "NOT_FOUND", `Update ${this.modleName} failed! This meeting ${id} not exist.s`);
            }
            yield this.validMeetingTimeAsync(startDatetime, duration, existMeeting.adminId, userIds, id);
            const entity = yield this.crudRepository.updateAsync(id, meetingUpdateDto);
            // Convert to dto object
            return new this.EntityDto(entity);
        });
    }
}
exports.default = MeetingService;
//# sourceMappingURL=MeetingService.js.map