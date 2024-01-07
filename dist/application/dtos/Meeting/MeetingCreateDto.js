"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MeetingPrivateCreateDto {
    constructor({ userIds, freeTimeId, isPrivate = false, }) {
        this.userIds = userIds;
        this.freeTimeId = freeTimeId;
        this.isPrivate = isPrivate;
    }
}
class MeetingCreateDto extends MeetingPrivateCreateDto {
    constructor({ groupId, adminId, startDatetime, duration, location, detail, name, description, userIds, freeTimeId, isPrivate, }) {
        super({ userIds, freeTimeId, isPrivate });
        this.groupId = groupId;
        this.adminId = adminId;
        this.startDatetime = startDatetime;
        this.duration = duration;
        this.location = location;
        this.detail = detail;
        this.name = name;
        this.description = description;
    }
}
exports.default = MeetingCreateDto;
//# sourceMappingURL=MeetingCreateDto.js.map