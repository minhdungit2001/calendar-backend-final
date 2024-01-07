"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExerciseCreateDto {
    constructor({ groupId, adminId, fileInfoId, submittedIds, name, description, startDatetime, endDatetime, }) {
        this.groupId = groupId;
        this.adminId = adminId;
        this.fileInfoId = fileInfoId;
        this.submittedIds = submittedIds;
        this.name = name;
        this.description = description;
        this.startDatetime = startDatetime;
        this.endDatetime = endDatetime;
    }
}
exports.default = ExerciseCreateDto;
//# sourceMappingURL=ExerciseCreateDto.js.map