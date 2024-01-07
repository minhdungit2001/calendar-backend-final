"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const ICloudUpload_1 = require("../ICloudUpload");
class GoogleApis {
    constructor() {
        // Set Public File
        this.setFilePublic = function (fileId) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield config_1.default.permissions.create({
                        fileId,
                        requestBody: {
                            role: "reader",
                            type: "anyone",
                        },
                    });
                    const googleRes = yield config_1.default.files.get({
                        fileId,
                        fields: "webViewLink, webContentLink",
                    });
                    return googleRes.data;
                }
                catch (error) {
                    console.log(error);
                }
            });
        };
    }
    // Upload File
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var result = {};
                const googleRes = yield config_1.default.files.create({
                    requestBody: {
                        name: file.name,
                        mimeType: file.mimetype,
                    },
                    media: {
                        mimeType: file.mimetype,
                        body: fs_1.default.createReadStream(path_1.default.join(file.tempFilePath)),
                    },
                });
                if (googleRes.status === 200) {
                    result = yield this.setFilePublic(googleRes.data.id);
                    result = Object.assign({ id: googleRes.data.id, name: googleRes.data.name }, result);
                    (0, ICloudUpload_1.deleteTempFilePath)(file.tempFilePath);
                }
                return result;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Delete File
    deleteFile(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield config_1.default.files.delete({
                    fileId: fileId,
                });
                return res.status;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new GoogleApis();
//# sourceMappingURL=index.js.map