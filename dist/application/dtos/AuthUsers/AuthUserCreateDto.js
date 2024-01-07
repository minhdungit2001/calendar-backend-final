"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthUserCreateDto {
    constructor({ email, password, fullName, groupIds, avatar, phoneNumber, position, department, authType, createdBy, }) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.groupIds = groupIds;
        this.avatar = avatar;
        this.phoneNumber = phoneNumber;
        this.position = position;
        this.department = department;
        this.authType = authType || "local";
        this.createdBy = createdBy || "Minh Dung";
    }
}
exports.default = AuthUserCreateDto;
//# sourceMappingURL=AuthUserCreateDto.js.map