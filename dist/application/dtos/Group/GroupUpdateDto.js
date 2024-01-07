"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GroupUpdateDto {
    constructor({ userIds, name, description, maxGuest, }) {
        if (userIds)
            this.userIds = userIds;
        if (name)
            this.name = name;
        if (description)
            this.description = description;
        if (maxGuest)
            this.maxGuest = maxGuest;
    }
}
exports.default = GroupUpdateDto;
//# sourceMappingURL=GroupUpdateDto.js.map