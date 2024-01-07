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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthUserModel_1 = __importDefault(require("../../infrastructure/models/AuthUserModel"));
dotenv_1.default.config();
// Get role for authenticated
function roleToModel(role) {
    var Model;
    switch (role) {
        case AuthUserModel_1.default.collection.collectionName:
            Model = AuthUserModel_1.default;
            break;
        default:
            Model = AuthUserModel_1.default;
            break;
    }
    return Model;
}
// Validate the token
// Like static, In function passportConfig(Model) if you import AuthUserModel first and UserModel later, it will only read UserModel
passport_1.default.use("jwt-access-token", new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
}, (payload, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check expiration token in service and controller for send request send back refresh token if getting. Not like verifying in refresh token, check inside
        // Get model to check authentication: it be AuthUserModel or UserModel
        const Model = roleToModel(payload.role);
        // Get entity from payload
        const entity = yield Model.findOne({ _id: payload.sub });
        // If not exist entity, it will not verify
        if (!entity) {
            return next(null, false, payload);
        }
        // req.user is entity of verify access-token
        return next(null, entity, payload);
    }
    catch (err) {
        next(err, false);
    }
})));
// Validate the refresh token
// Get from header Authorizationrefreshtoken: token
const customRefreshExtractor = (req) => {
    let token = req.headers.authorizationrefreshtoken;
    return token;
};
passport_1.default.use("jwt-refresh-token", new passport_jwt_1.Strategy({
    jwtFromRequest: customRefreshExtractor,
    secretOrKey: process.env.JWT_SECRET_REFRESH_TOKEN,
}, (payload, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get model to check authentication: it be AuthUserModel or UserModel
        const Model = roleToModel(payload.role);
        // Check expiration of refresh token
        const dateNow = new Date();
        if (dateNow.getTime() > payload.exp)
            return next(null, false, payload);
        // Check refresh token user
        const entity = yield Model.findOne({ _id: payload.sub });
        if (!entity)
            return next(null, false, payload);
        return next(null, entity, payload);
    }
    catch (err) {
        next(err, false);
    }
})));
// Passport local: Check email and password for authType local
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true,
}, (req, email, password, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get role from body and get model corresponding
        const { role } = req.body;
        const Model = roleToModel(role);
        // Check verify user with hashpassword
        const entity = yield Model.findOne({ email: email });
        if (!entity) {
            return next(null, false);
        }
        if (entity.authType === "local") {
            const isCorrectPassword = yield bcrypt_1.default.compare(password, entity.password);
            if (!isCorrectPassword) {
                return next(null, false);
            }
        }
        // req.user = entity when succerss verification
        return next(null, entity);
    }
    catch (error) {
        next(error, false);
    }
})));
// Passport Google
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_API_CLIENT_ID,
    clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
    passReqToCallback: true,
    callbackURL: "/api/v1/users/callback",
}, (req, accessToken, refreshToken, profile, next) => __awaiter(void 0, void 0, void 0, function* () {
    // User.findOrCreate({ "google.id": profile.id }, function (error, user) {
    //   return next(error, user);
    // });
    var _a;
    try {
        const email = !!((_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) && profile.emails[0].value;
        // Check whether the user exists in our database
        const userGoogle = yield AuthUserModel_1.default.findOne({
            email: email,
            // authGoogleId: profile.id,
            // authType: "google",
        });
        if (userGoogle)
            return next(null, userGoogle);
        // If the first login with google
        const newUser = new AuthUserModel_1.default({
            authType: "google",
            email: email,
            authGoogleId: profile.id,
        });
        yield newUser.save();
        next(null, newUser);
    }
    catch (error) {
        next(error);
    }
})));
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map