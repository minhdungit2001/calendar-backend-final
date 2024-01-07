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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @template TDocument  inteface of the model,   of mongoose
 *
 */
class BaseReadOnlyRepository {
    /**
     * @param model mongoose model
     */
    constructor(model) {
        this.moongoseModel = model;
    }
    getAllAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.moongoseModel.find({});
            return entities;
        });
    }
    // async countAsync(query: Object): Promise<number | null> {
    //   const count = await this.moongoseModel.countDocuments(query);
    //   return count;
    // }
    findByIdAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.moongoseModel.findById(id);
            return entity;
        });
    }
    findOneAsync(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.moongoseModel.findOne(query);
            return entity;
        });
    }
    findManyByIdsAsync(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.moongoseModel.find({ _id: { $in: ids } });
            return entities;
        });
    }
    findAsync(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.moongoseModel.find(query).limit(20);
            return entities;
        });
    }
    findByCollectionIdAsync(fieldName, id, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            query[fieldName] = id;
            const strPopulate = populate !== null && populate !== void 0 ? populate : "";
            const entities = yield this.moongoseModel
                .find(query)
                .populate(strPopulate)
                .limit(20);
            return entities;
        });
    }
    getModelName() {
        return this.moongoseModel.collection.collectionName;
    }
}
exports.default = BaseReadOnlyRepository;
//# sourceMappingURL=BaseReadOnlyRepository.js.map