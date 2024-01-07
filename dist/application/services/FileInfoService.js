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
const FileInfo_1 = require("../dtos/FileInfo");
const FileInfoRepository_1 = __importDefault(require("../../infrastructure/repositories/FileInfoRepository"));
const BaseCrudService_1 = __importDefault(require("./base/BaseCrudService"));
class FileInfoService extends BaseCrudService_1.default {
    constructor() {
        super(new FileInfoRepository_1.default(), FileInfo_1.FileInfoDto);
        this.fileInfoRepository = new FileInfoRepository_1.default();
    }
    findSubmittedRoleAdminAsync(groupId, exerciseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.fileInfoRepository.findSubmittedRoleAdminAsync(groupId, exerciseId);
            if (entities === null || entities.length === 0) {
                return [];
            }
            return entities === null || entities === void 0 ? void 0 : entities.map((entity) => new this.EntityDto(entity));
        });
    }
    findSubmittedRoleMemberAsync(groupId, exerciseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.fileInfoRepository.findSubmittedRoleMemberAsync(groupId, exerciseId, userId);
            if (entities === null || entities.length === 0) {
                return [];
            }
            return entities === null || entities === void 0 ? void 0 : entities.map((entity) => new this.EntityDto(entity));
        });
    }
    findDescriptionAsync(exerciseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.fileInfoRepository.findDescriptionAsync(exerciseId);
            if (entities === null || entities.length === 0) {
                return [];
            }
            return entities === null || entities === void 0 ? void 0 : entities.map((entity) => new this.EntityDto(entity));
        });
    }
    findByUserIdAsync(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.fileInfoRepository.findByUserIdAsync(userId);
            if (entities === null || entities.length === 0) {
                return [];
            }
            return entities === null || entities === void 0 ? void 0 : entities.map((entity) => new this.EntityDto(entity));
        });
    }
    findByGroupIdAsync(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.fileInfoRepository.findByGroupIdAsync(groupId);
            if (entities === null || entities.length === 0) {
                return [];
            }
            return entities === null || entities === void 0 ? void 0 : entities.map((entity) => new this.EntityDto(entity));
        });
    }
}
exports.default = FileInfoService;
//# sourceMappingURL=FileInfoService.js.map