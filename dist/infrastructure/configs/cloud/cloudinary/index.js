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
const ICloudUpload_1 = require("../ICloudUpload");
const config_1 = __importDefault(require("./config"));
class Cloudinary {
    uploadImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiResponse = yield config_1.default.uploader.upload(file.tempFilePath, {
                public_id: `${new Date().getTime()}`,
                resource_type: "image",
            }, function (error, result) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("Upload cloudinary error: ", error);
                    // Delete temporary file
                    yield (0, ICloudUpload_1.deleteTempFilePath)(file.tempFilePath);
                });
            });
            return {
                id: apiResponse.asset_id,
                public_id: apiResponse.public_id,
                url: apiResponse.url,
            };
        });
    }
    deleteImage(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield config_1.default.api.delete_resources([fileId], {
                type: "upload",
                resource_type: "image",
            });
            return result.deleted[fileId];
        });
    }
}
exports.default = new Cloudinary();
//# sourceMappingURL=index.js.map