"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = exports.ConflictException = exports.BaseException = exports.AuthException = void 0;
class BaseException extends Error {
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
        this.message = message;
    }
    toString() {
        return `Status: ${this.status}, message: ${this.message}`;
    }
}
exports.BaseException = BaseException;
/**
 * Auth excetion
 * Occurte when dis authentication
 */
class AuthException extends BaseException {
    constructor(status, code, message) {
        super(status, code, message);
    }
}
exports.AuthException = AuthException;
class ConflictException extends BaseException {
    constructor(status, code, message) {
        super(status, code, message);
    }
}
exports.ConflictException = ConflictException;
class NotFoundException extends BaseException {
    constructor(status, code, message) {
        super(status, code, message);
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=index.js.map