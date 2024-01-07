"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthUserUpdateDto {
    constructor({ password, fullName, groupIds, avatar, phoneNumber, position, department, authType, updatedBy, }) {
        this.updatedBy = updatedBy || "Minh Dung";
        // If value is empty, it will not in update dto because if it is key with empty value, it will delete old value
        if (password)
            this.password = password;
        if (fullName)
            this.fullName = fullName;
        if (groupIds)
            this.groupIds = groupIds;
        if (avatar)
            this.avatar = avatar;
        if (phoneNumber)
            this.phoneNumber = phoneNumber;
        if (position)
            this.position = position;
        if (department)
            this.department = department;
        if (authType)
            this.authType = authType;
    }
}
exports.default = AuthUserUpdateDto;
//# sourceMappingURL=AuthUserUpdateDto.js.map