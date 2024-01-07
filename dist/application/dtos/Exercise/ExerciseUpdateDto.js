"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MeetingUpdateDto {
    constructor({ submittedIds, name, fileInfoId, description, startDatetime, endDatetime, }) {
        if (submittedIds)
            this.submittedIds = submittedIds;
        if (name)
            this.name = name;
        if (fileInfoId)
            this.fileInfoId = fileInfoId;
        if (description)
            this.description = description;
        if (startDatetime)
            this.startDatetime = startDatetime;
        if (endDatetime)
            this.endDatetime = endDatetime;
    }
}
exports.default = MeetingUpdateDto;
//# sourceMappingURL=ExerciseUpdateDto.js.map