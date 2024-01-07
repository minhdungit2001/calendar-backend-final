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
const AuthUserRepository_1 = __importDefault(require("../../infrastructure/repositories/AuthUserRepository"));
const BaseCrudService_1 = __importDefault(require("./base/BaseCrudService"));
const exceptions_1 = require("../../application/exceptions");
const AuthUsers_1 = require("../dtos/AuthUsers");
class AuthUserService extends BaseCrudService_1.default {
    constructor() {
        super(new AuthUserRepository_1.default(), AuthUsers_1.AuthUserDto);
        this.authUserRepository = new AuthUserRepository_1.default();
    }
    // Check email: user does not have same email
    checkDuplicateEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.authUserRepository.findOneAsync({
                email: email,
            });
            if (entity) {
                return false;
            }
            return true;
        });
    }
    // Override
    createAsync(entityCreateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate duplicate email address
            const isValid = yield this.checkDuplicateEmail(entityCreateDto.email);
            if (!isValid) {
                throw new exceptions_1.ConflictException(409, "EMAIL_EXISTS", "Email already in exist");
            }
            const entityCreate = yield this.authUserRepository.createAsync(entityCreateDto);
            // Return entityDto for frontend
            const entityDto = new this.EntityDto(entityCreate);
            return entityDto;
        });
    }
    updateAsync(id, entityUpdateDto, imgAvatar) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check is exists user before
            const entity = yield this.authUserRepository.findByIdAsync(id);
            // Throw exception if entity not found in database
            if (!entity) {
                throw new exceptions_1.NotFoundException(404, "NOT_FOUND", `Enity '${this.modleName}' with id = ${id} is not exist!`);
            }
            // Get response
            const updateEntityRes = yield this.authUserRepository.updateAsync(id, entityUpdateDto, imgAvatar);
            // Convert dto to return
            return new this.EntityDto(updateEntityRes);
        });
    }
    findByNameIncludeAsync(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = {};
            if (name) {
                query.fullName = { $regex: new RegExp(name, "i") };
            }
            const entities = yield this.authUserRepository.findAsync(query);
            if ((entities === null || entities === void 0 ? void 0 : entities.length) === 0 || entities === null) {
                return null;
            }
            const entityDtos = entities === null || entities === void 0 ? void 0 : entities.map((entity) => new this.EntityDto(entity));
            return entityDtos;
        });
    }
}
exports.default = AuthUserService;
//# sourceMappingURL=AuthUserService.js.map