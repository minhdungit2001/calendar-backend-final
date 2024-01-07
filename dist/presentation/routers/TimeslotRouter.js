"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
const TimeslotController_1 = __importDefault(require("../../controller/controllers/TimeslotController"));
const controller = new TimeslotController_1.default();
const router = (0, express_promise_router_1.default)();
router.get("/users/:id", controller.findByCollectionIdAsync("adminId"));
router.put("/users", controller.addUserRegistersAsnyc);
router.delete("/users", controller.removeUserRegistersAsnyc);
router.put("/:id/freeTimes", controller.addFreeTimeAsync);
router.delete("/:id/freeTimes/:freeTimeId", controller.removeFreeTimeAsync);
(0, BaseRouter_1.default)(router, controller);
exports.default = router;
//# sourceMappingURL=TimeslotRouter.js.map