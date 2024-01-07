"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeslotUpdateDto {
    constructor({ freeTimes, name, location, detail, description, typeMeeting, }) {
        if (freeTimes)
            this.freeTimes = freeTimes;
        if (name)
            this.name = name;
        if (location)
            this.location = location;
        if (detail)
            this.detail = detail;
        if (description)
            this.description = description;
        if (typeMeeting)
            this.typeMeeting = typeMeeting;
    }
}
exports.default = TimeslotUpdateDto;
//# sourceMappingURL=TimeslotUpdateDto.js.map