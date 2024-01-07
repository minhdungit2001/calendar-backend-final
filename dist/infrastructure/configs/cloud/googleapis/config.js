"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const googleapis_1 = require("googleapis");
dotenv_1.default.config();
const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET;
const REDIRECT_URL = process.env.GOOGLE_API_REDIRECT_URL;
const REFRESH_TOKEN = process.env.GOOGLE_API_REFRESH_TOKEN;
const oauth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
});
const drive = googleapis_1.google.drive({
    version: "v3",
    auth: oauth2Client,
});
exports.default = drive;
//# sourceMappingURL=config.js.map