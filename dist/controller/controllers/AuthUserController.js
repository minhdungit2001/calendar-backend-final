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
const AuthUserService_1 = __importDefault(require("../../application/services/AuthUserService"));
const jwt_1 = require("../utils/jwt");
const AuthUsers_1 = require("../../application/dtos/AuthUsers");
const exceptions_1 = require("../../application/exceptions");
const BaseCrudController_1 = __importDefault(require("./base/BaseCrudController"));
class AuthUserController extends BaseCrudController_1.default {
    constructor() {
        super(new AuthUserService_1.default(), AuthUsers_1.AuthUserDto, AuthUsers_1.AuthUserCreateDto, AuthUsers_1.AuthUserUpdateDto);
        this.authUserService = new AuthUserService_1.default();
        this.authChangePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { newPassword } = req.body;
            yield this.authUserService.updateAsync((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString(), {
                password: newPassword,
            });
            return res.status(200).json({
                success: true,
            });
        });
        // Signup new user
        this.authSignUpAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Raw user data get from body
            const rawEntity = req.body;
            const userCreateDto = new this.EntityCreateDto(rawEntity);
            const userDto = yield this.authUserService.createAsync(userCreateDto);
            return res.status(201).json(userDto);
        });
        // Signin user
        this.authSignInAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Recieve user from passport jwt middleware. It had done verification
            const userDto = new this.EntityDto(req.user);
            const userDtoId = userDto._id;
            const accessToken = (0, jwt_1.encodeToken)(userDtoId, this.modelName);
            const { refreshToken, expiresIn } = (0, jwt_1.encodeRefreshToken)(userDtoId, this.modelName);
            return res.status(200).json({
                role: this.modelName,
                user: userDto,
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: expiresIn,
            });
        });
        this.authGoogleSuccess = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            // Recieve user from passport jwt middleware. It had done verification
            const REDICTURL = process.env.VUE_URL;
            const userId = ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id) || "";
            if (!userId) {
                res.redirect(`${REDICTURL}/login`);
            }
            const accessToken = (0, jwt_1.encodeToken)(userId, this.modelName, 60000 * 5);
            res.redirect(`${REDICTURL}/?auth=google&_note=${accessToken}`);
        });
        // Update user
        this.updateAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Id from route params
            const { id } = req.params;
            // Avatar file get from request file
            let imgAvatar;
            if (req.files && req.files.fileUpload) {
                imgAvatar = req.files.fileUpload;
            }
            else {
                imgAvatar = undefined;
            }
            // Raw user from boy for update limited fields upload
            const userUpdateDto = new this.EntityUpdateDto(Object.assign({ _id: id }, req.body));
            const newEntityDto = yield this.authUserService.updateAsync(id, userUpdateDto, imgAvatar);
            return res.status(200).json(newEntityDto);
        });
        this.checkExpriedToken = (req, res, next) => {
            const payload = req.authInfo;
            var isExprire;
            if (payload) {
                isExprire = new Date().getTime() > payload.exp;
            }
            if (isExprire) {
                throw new exceptions_1.AuthException(403, "EXPRIRED_TOKEN", "Expired token");
            }
            return next();
        };
        this.secretToken = (req, res, next) => {
            const user = req.user;
            return res.status(200).json(user);
        };
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (user) {
                const accessToken = (0, jwt_1.encodeToken)(user._id, this.modelName);
                return res.status(200).json({
                    accessToken: accessToken,
                });
            }
            throw new exceptions_1.AuthException(403, "FAILED_TOKEN", "Invalid token");
        });
        this.findByNameIncludeAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Get id from route parameters
            const { name } = req.query;
            const userDto = yield this.authUserService.findByNameIncludeAsync(name);
            return res.status(200).json(userDto);
        });
    }
}
exports.default = AuthUserController;
//# sourceMappingURL=AuthUserController.js.map