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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserModel = exports.AuthUserDefiition = void 0;
const mongoose_1 = require("mongoose");
const base_1 = require("./base");
const bcryptHashFunction_1 = require("../secret/bcryptHashFunction");
exports.AuthUserDefiition = Object.assign({ email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        immutable: true,
    }, password: {
        type: String,
        default: null,
    }, fullName: {
        type: String,
        required: true,
    }, groupIds: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "groups",
        default: null,
    }, avatar: {
        id: {
            type: String,
            default: null,
        },
        url: {
            type: String,
            default: null,
        },
        public_id: {
            type: String,
            default: null,
        },
    }, phoneNumber: {
        type: String,
        default: null,
    }, authType: {
        type: String,
        enum: ["local", "google", "facebook"],
        default: "local",
    }, position: {
        type: String,
        default: null,
    }, department: {
        type: String,
        default: null,
    } }, base_1.ObjDefinition);
const AuthUserSchema = new mongoose_1.Schema(exports.AuthUserDefiition, {
    timestamps: true,
});
AuthUserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield (0, bcryptHashFunction_1.hashPassword)(this.password);
        if (hash) {
            this.password = hash;
        }
        return next();
    });
});
AuthUserSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield (0, bcryptHashFunction_1.hashPassword)(this._update.password);
        if (hash) {
            this._update.password = hash;
        }
        return next();
    });
});
exports.AuthUserModel = (0, mongoose_1.model)("users", AuthUserSchema);
exports.default = exports.AuthUserModel;
//# sourceMappingURL=AuthUserModel.js.map