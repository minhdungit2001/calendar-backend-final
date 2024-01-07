"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryGetMeetingByFieldId = void 0;
const validateQueryGetMeetingByFieldId = () => {
    return (req, res, next) => {
        const { startDatetime, endDatetime, isPrivate, isAdmin } = req.query;
        req.queryValid = Object.assign({}, req.query);
        const isBooleanMap = {
            true: true,
            false: false,
        };
        req.queryValid.startDatetime = startDatetime
            ? new Date(startDatetime)
            : undefined;
        req.queryValid.endDatetime = endDatetime
            ? new Date(endDatetime)
            : undefined;
        req.queryValid.isPrivate = isBooleanMap[isPrivate];
        req.queryValid.isAdmin = isBooleanMap[isAdmin];
        next();
    };
};
exports.validateQueryGetMeetingByFieldId = validateQueryGetMeetingByFieldId;
//# sourceMappingURL=validateQuerySpecial.js.map