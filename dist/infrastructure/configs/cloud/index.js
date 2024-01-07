"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = __importDefault(require("./googleapis"));
const cloudinary_1 = __importDefault(require("./cloudinary"));
class CloudUploader {
    constructor(cloudImage, cloudFile) {
        this.uploadImage = cloudImage.uploadImage.bind(cloudImage);
        this.deleteImage = cloudImage.deleteImage.bind(cloudImage);
        this.uploadFile = cloudFile.uploadFile.bind(cloudFile);
        this.deleteFile = cloudFile.deleteFile.bind(cloudFile);
    }
}
const uploader = new CloudUploader(cloudinary_1.default, googleapis_1.default);
exports.default = uploader;
//# sourceMappingURL=index.js.map