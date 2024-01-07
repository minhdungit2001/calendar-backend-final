"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthUserDto {
    constructor({ _id, email, fullName, groupIds, avatar, phoneNumber, position, department, authType, createdBy, updatedBy, }) {
        this._id = _id;
        this.email = email;
        this.fullName = fullName;
        this.groupIds = groupIds;
        this.avatar = avatar;
        this.phoneNumber = phoneNumber;
        this.position = position;
        this.department = department;
        this.authType = authType;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
    }
}
exports.default = AuthUserDto;
//# sourceMappingURL=AuthUserDto.js.map