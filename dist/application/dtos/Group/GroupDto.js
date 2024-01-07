"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GroupDto {
    constructor({ _id, adminId, userIds, name, description, maxGuest, }) {
        this._id = _id;
        this.adminId = adminId;
        this.userIds = userIds;
        this.name = name;
        this.description = description;
        this.maxGuest = maxGuest;
    }
}
exports.default = GroupDto;
//# sourceMappingURL=GroupDto.js.map