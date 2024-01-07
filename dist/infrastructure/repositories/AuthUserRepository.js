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
const AuthUserModel_1 = require("../models/AuthUserModel");
const BaseCrudRepository_1 = __importDefault(require("./base/BaseCrudRepository"));
const cloud_1 = __importDefault(require("../../infrastructure/configs/cloud"));
/**
 * Example of implementation abstract class base
 */
class AuthUserRepository extends BaseCrudRepository_1.default {
    constructor() {
        super(AuthUserModel_1.AuthUserModel);
    }
    findByIdPopulateAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel.findById(id);
        });
    }
    /**
     * Update user with id
     *
     * @param {string} id
     * @param {EntityUpdateDto} userUpdateDto
     * @returns new value of doucument with id = parameter id
     */
    updateAsync(id, userUpdateDto, imgAvatar) {
        return __awaiter(this, void 0, void 0, function* () {
            if (imgAvatar) {
                // If have imageAvatar file, then delete old image in cloud, and set new image
                var oldEntity = yield this.moongoseModel.findById(id);
                if (oldEntity) {
                    if (oldEntity.avatar.public_id) {
                        yield cloud_1.default.deleteImage(oldEntity.avatar.public_id);
                    }
                    const newAvatarInfo = yield cloud_1.default.uploadImage(imgAvatar);
                    userUpdateDto.avatar = newAvatarInfo;
                }
            }
            const user = yield this.moongoseModel.findOneAndUpdate({ _id: id }, userUpdateDto, { new: true });
            return user;
        });
    }
}
exports.default = AuthUserRepository;
//# sourceMappingURL=AuthUserRepository.js.map