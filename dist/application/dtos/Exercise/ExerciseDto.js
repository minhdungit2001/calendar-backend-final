"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExerciseDto {
    constructor({ _id, groupId, adminId, fileInfoId, submittedIds, name, description, startDatetime, endDatetime, }) {
        this._id = _id;
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
exports.default = ExerciseDto;
//# sourceMappingURL=ExerciseDto.js.map