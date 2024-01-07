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
const BaseReadOnlyRepository_1 = __importDefault(require("./BaseReadOnlyRepository"));
/**
 * @template TDocument  inteface of the model,   of mongoose
 */
class BaseCrudRepository extends BaseReadOnlyRepository_1.default {
    /**
     * @param model mongoose model
     */
    constructor(model) {
        super(model);
    }
    /**
     * Create a new entity
     *
     * @param {EntityCreateDto} entityCreateDto
     * @returns new entity
     */
    createAsync(entityCreateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield new this.moongoseModel(entityCreateDto).save();
            console.log(entity.createdAt);
            return entity;
        });
    }
    /**
     * Update entity with id
     *
     * @param {string} id
     * @param {EntityUpdateDto} entityUpdateDto
     * @returns new value of doucument with id = parameter id
     */
    updateAsync(id, entityUpdateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.moongoseModel.findOneAndUpdate({ _id: id }, entityUpdateDto, { new: true });
            return entity;
        });
    }
    updateManyAsync(updateCondition, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel.updateMany(updateCondition, updates);
        });
    }
    updateOneAsync(updateCondition, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel.updateOne(updateCondition, updates);
        });
    }
    deleteOneByIdAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel.deleteOne({ _id: id });
        });
    }
    deleteManyByFieldAsync(fieldName, fieldValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            filter[fieldName] = fieldValue;
            return yield this.moongoseModel.deleteMany(filter);
        });
    }
    //! Dev
    deleteAllAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moongoseModel.deleteMany({});
        });
    }
    updateOneAddItemsByIdAsync(id, fieldName, addItems) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = {};
            update[fieldName] = { $each: addItems };
            return yield this.moongoseModel.updateOne({ _id: id }, { $addToSet: update });
        });
    }
    updateOneRemoveItemsByIdAsync(id, fieldName, removeItems) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = {};
            update[fieldName] = removeItems;
            return yield this.moongoseModel.updateOne({ _id: id }, { $pullAll: update });
        });
    }
    updateManyAddItemByIdsAsync(ids, fieldName, addItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = {};
            update[fieldName] = addItem;
            return yield this.moongoseModel.updateMany({ _id: { $in: ids } }, { $addToSet: update });
        });
    }
    updateManyRemoveItemByIdsAsync(ids, fieldName, removeItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = {};
            update[fieldName] = removeItem;
            return yield this.moongoseModel.updateMany({ _id: { $in: ids } }, { $pull: update });
        });
    }
}
exports.default = BaseCrudRepository;
//# sourceMappingURL=BaseCrudRepository.js.map