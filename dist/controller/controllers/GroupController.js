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
const BaseCrudController_1 = __importDefault(require("./base/BaseCrudController"));
const GroupService_1 = __importDefault(require("../../application/services/GroupService"));
const Group_1 = require("../../application/dtos/Group");
class GroupController extends BaseCrudController_1.default {
    constructor() {
        super(new GroupService_1.default(), Group_1.GroupDto, Group_1.GroupCreateDto, Group_1.GroupUpdateDto);
        this.removeUserIdsAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userIds } = req.body;
            const result = yield this.groupService.removeUserIdsAsync(id, userIds);
            return res.status(200).json(result);
        });
        this.addUserIdsAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userIds, fieldName } = req.body;
            const result = yield this.groupService.addUserIdsAsync(id, userIds);
            return res.status(200).json(result);
        });
        this.findAllByAdminIdAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const result = yield this.groupService.findAllByAdminIdAsync(userId);
            return res.status(200).json(result);
        });
        this.findByIdPopulateAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Get id from route parameters
            const { id } = req.params;
            const entityDto = yield this.groupService.findByIdPopulateAsync(id);
            return res.status(200).json(entityDto);
        });
        this.groupService = new GroupService_1.default();
    }
}
exports.default = GroupController;
//# sourceMappingURL=GroupController.js.map