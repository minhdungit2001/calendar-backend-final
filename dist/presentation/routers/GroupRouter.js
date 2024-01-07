"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
const GroupController_1 = __importDefault(require("../../controller/controllers/GroupController"));
const validateRequest_1 = require("../../controller/middleware/validateRequest");
const controller = new GroupController_1.default();
const router = (0, express_promise_router_1.default)();
(0, BaseRouter_1.default)(router, controller);
router.get("/users/:userId", controller.findAllByAdminIdAsync);
router.get("/detail/:id", controller.findByIdPopulateAsync);
router.put("/:id/users", (0, validateRequest_1.validateParam)(validateRequest_1.schemas.id, "id"), controller.addUserIdsAsync);
router.delete("/:id/users", (0, validateRequest_1.validateParam)(validateRequest_1.schemas.id, "id"), controller.removeUserIdsAsync);
exports.default = router;
//# sourceMappingURL=GroupRouter.js.map