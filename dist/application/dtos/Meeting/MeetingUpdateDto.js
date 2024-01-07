"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MeetingPrivateUpdateDto {
    constructor({ userIds, isPrivate, freeTimeId, }) {
        if (userIds)
            this.userIds = userIds;
        if (freeTimeId)
            this.freeTimeId = freeTimeId;
        if (isPrivate)
            this.isPrivate = isPrivate;
    }
}
class MeetingUpdateDto extends MeetingPrivateUpdateDto {
    constructor({ startDatetime, duration, location, detail, name, description, userIds, freeTimeId, isPrivate, }) {
        super({ userIds, freeTimeId, isPrivate });
        if (startDatetime)
            this.startDatetime = startDatetime;
        if (duration)
            this.duration = duration;
        if (location)
            this.location = location;
        if (detail)
            this.detail = detail;
        if (name)
            this.name = name;
        if (description)
            this.description = description;
    }
}
exports.default = MeetingUpdateDto;
//# sourceMappingURL=MeetingUpdateDto.js.map