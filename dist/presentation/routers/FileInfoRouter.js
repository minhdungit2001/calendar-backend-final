"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
const FileInfoController_1 = __importDefault(require("../../controller/controllers/FileInfoController"));
const controller = new FileInfoController_1.default();
const router = (0, express_promise_router_1.default)();
(0, BaseRouter_1.default)(router, controller);
exports.default = router;
//# sourceMappingURL=FileInfoRouter.js.map