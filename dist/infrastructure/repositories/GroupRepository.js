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
const GroupModel_1 = require("../models/GroupModel");
const BaseCrudRepository_1 = __importDefault(require("./base/BaseCrudRepository"));
/**
 * Example of implementation abstract class base
 */
class GroupRepository extends BaseCrudRepository_1.default {
    constructor() {
        super(GroupModel_1.GroupModel);
    }
    findByIdPopulateAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel.findById(id).populate("adminId userIds");
        });
    }
    findAllByIdsOrAdminIdAsync(ids, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel.find({
                $or: [{ adminId: adminId }, { _id: { $in: ids } }],
            });
        });
    }
}
exports.default = GroupRepository;
//# sourceMappingURL=GroupRepository.js.map