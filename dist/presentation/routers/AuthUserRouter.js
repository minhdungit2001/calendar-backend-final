"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const AuthUserController_1 = __importDefault(require("../../controller/controllers/AuthUserController"));
const validateRequest_1 = require("../../controller/middleware/validateRequest");
const passport_1 = __importDefault(require("../../controller/middleware/passport"));
const controller = new AuthUserController_1.default();
const router = (0, express_promise_router_1.default)();
router.delete("/all", controller.deleteAllAsync);
router.get("/query", controller.findByNameIncludeAsync);
// Sign up
router
    .route("/signup")
    .post((0, validateRequest_1.validateBody)(validateRequest_1.schemas.authSignup), controller.authSignUpAsync);
// Sign in
router
    .route("/signin")
    .post((0, validateRequest_1.validateBody)(validateRequest_1.schemas.authSignin), passport_1.default.authenticate("local", { session: false }), controller.authSignInAsync);
// Sign in
router.route("/auth/google").get(passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}), controller.authSignInAsync);
router.route("/auth/google/success").get(controller.authSignInAsync);
router.route("/callback").get(passport_1.default.authenticate("google", {
    failureRedirect: `${process.env.VUE_URL}/login`,
    successRedirect: `${process.env.VUE_URL}/?auth=true`,
}));
router
    .route("/:id/change-password")
    .put(passport_1.default.authenticate("jwt-access-token", { session: false }), passport_1.default.authenticate("local", { session: false }), controller.authChangePassword);
// Authentication test
router.route("/secret").get(passport_1.default.authenticate("jwt-access-token", { session: false }), controller.checkExpriedToken, controller.secretToken);
// Create refresh token
router
    .route("/refresh")
    .get(passport_1.default.authenticate("jwt-access-token", { session: false }), passport_1.default.authenticate("jwt-refresh-token", { session: false }), controller.refreshToken);
// Get info by id
router
    .route("/:id")
    .get((0, validateRequest_1.validateParam)(validateRequest_1.schemas.id, "id"), passport_1.default.authenticate("jwt-access-token", { session: false }), controller.checkExpriedToken, controller.findByIdAsync);
// Update
router
    .route("/:id")
    .put((0, validateRequest_1.validateParam)(validateRequest_1.schemas.id, "id"), (0, validateRequest_1.validateBody)(validateRequest_1.schemas.updateUser), passport_1.default.authenticate("jwt-access-token", { session: false }), controller.checkExpriedToken, controller.updateAsync);
router.route("/").get(controller.getAllAsync);
exports.default = router;
//# sourceMappingURL=AuthUserRouter.js.map