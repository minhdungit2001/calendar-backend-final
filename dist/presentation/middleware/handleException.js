"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../../application/exceptions");
function handleException(app) {
    // For not found route
    app.use((req, res, next) => {
        const error = new exceptions_1.NotFoundException(404, "NOT_FOUND_API", `Not found API ${req.path} endpoint`);
        next(error);
    });
    // For receive throw new exception
    app.use((err, req, res, next) => {
        console.log(err);
        const status = err.status || 500;
        // Response to client
        return res.status(status).json({
            error: {
                code: err.code,
                message: err.message,
            },
        });
    });
}
exports.default = handleException;
//# sourceMappingURL=handleException.js.map