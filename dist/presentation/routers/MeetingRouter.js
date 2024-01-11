"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
const MeetingController_1 = __importDefault(require("../../controller/controllers/MeetingController"));
const validateQuerySpecial_1 = require("../../controller/middleware/validateQuerySpecial");
const controller = new MeetingController_1.default();
const router = (0, express_promise_router_1.default)();
router.get("/freeTimes/:freeTimeId", controller.findByFreeTimeIdAsync);
router.get("/groups/:groupId/users/:userId", (0, validateQuerySpecial_1.validateQueryGetMeetingByFieldId)(), controller.findByGroupIdAsync);
router.get("/groups/:groupId/users/:userId/:userFilter", controller.filterMeetingsByUserIdAysnc);
router.get("/users/:userId/groups/:groupId", (0, validateQuerySpecial_1.validateQueryGetMeetingByFieldId)(), controller.findByUserIdWithStatusAsync);
router.get("/all/users/:userId", (0, validateQuerySpecial_1.validateQueryGetMeetingByFieldId)(), controller.findAllMeetingWithStatusAsync);
router.put("/:id/users", controller.addUserIdsAsync);
router.delete("/:id/users", controller.removeUserIdsAsync);
//TODO: ChƯa validate userId khi create
(0, BaseRouter_1.default)(router, controller);
exports.default = router;
//# sourceMappingURL=MeetingRouter.js.map