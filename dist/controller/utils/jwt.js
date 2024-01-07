"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeRefreshToken = exports.encodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Encode id to the token
// Token for 3 days
const encodeToken = (id, role = "users") => {
    return jsonwebtoken_1.default.sign({
        iss: "Minh Dung",
        role: role,
        sub: id,
        iat: new Date().getTime(),
        exp: new Date().getTime() + 60000 * 60, //60 minutes live
        // exp: new Date().getTime() + 30000,
    }, process.env.JWT_SECRET_KEY);
};
exports.encodeToken = encodeToken;
const encodeRefreshToken = (id, role = "users") => {
    const liveTime = 60000 * 60 * 24 * 15; //15 days live (60000=1minute)
    const expiresIn = new Date().getTime() + liveTime;
    const refreshToken = jsonwebtoken_1.default.sign({
        iss: "Minh Dung",
        role: role,
        sub: id,
        iat: new Date().getTime(),
        exp: expiresIn,
    }, process.env.JWT_SECRET_REFRESH_TOKEN);
    return {
        refreshToken,
        expiresIn,
    };
};
exports.encodeRefreshToken = encodeRefreshToken;
//# sourceMappingURL=jwt.js.map