"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCrudController_1 = __importDefault(require("./base/BaseCrudController"));
const FileInfoService_1 = __importDefault(require("../../application/services/FileInfoService"));
const FileInfo_1 = require("../../application/dtos/FileInfo");
class FileInfoController extends BaseCrudController_1.default {
    constructor() {
        super(new FileInfoService_1.default(), FileInfo_1.FileInfoDto, FileInfo_1.FileInfoCreateDto, FileInfo_1.FileInfoUpdateDto);
        this.fileInfoService = new FileInfoService_1.default();
    }
}
exports.default = FileInfoController;
//# sourceMappingURL=FileInfoController.js.map