"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MeetingPrivateDto {
    constructor({ isPrivate, userIds, freeTimeId, }) {
        this.userIds = userIds;
        this.isPrivate = isPrivate;
        this.freeTimeId = freeTimeId;
    }
}
class MeetingDto extends MeetingPrivateDto {
    constructor({ _id, groupId, adminId, startDatetime, duration, location, detail, name, description, isPrivate, userIds, freeTimeId, }) {
        super({ userIds, isPrivate, freeTimeId });
        this._id = _id;
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
exports.default = MeetingDto;
//# sourceMappingURL=MeetingDto.js.map