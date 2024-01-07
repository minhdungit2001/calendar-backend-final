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
const BaseReadOnlyService_1 = __importDefault(require("./BaseReadOnlyService"));
const exceptions_1 = require("../../exceptions");
/**
 * Create base create read update delete service for entities.
 *
 * Input: entity
 *
 * Output: data transfer object
 *
 * @template TDocument document of the model, it maybe entity object
 * @template TEntityDto data transfer object to show client side
 * @template TEntityCreateDto data transfer object accept filed create entity
 * @template TEntityUpdateDto data transfer object accept filed update entity
 */
class BaseCrudService extends BaseReadOnlyService_1.default {
    constructor(crudRepository, entityDto) {
        super(crudRepository, entityDto);
        this.crudRepository = crudRepository;
    }
    /**
     * Creeate new entity
     * @param entityCreateDto data transfer object with accept filed create entity
     * @returns entityDto if successful
     */
    createAsync(entityCreateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.crudRepository.createAsync(entityCreateDto);
            if (entity === null) {
                throw new exceptions_1.BaseException(400, "CREATE_FAILED", `Create ${this.modleName} failed!`);
            }
            // Convert to dto object
            return new this.EntityDto(entity);
        });
    }
    /**
     * @param id entity id
     * @param entityUpdateDto data transfer object with accept filed update entity
     */
    updateAsync(id, entityUpdateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.crudRepository.findByIdAsync(id);
            if (!entity) {
                throw new exceptions_1.NotFoundException(404, "NOT_FOUND", `Enity '${this.modleName}' with id = ${id} is not exist!`);
            }
            const updateEntityRes = yield this.crudRepository.updateAsync(id, entityUpdateDto);
            return new this.EntityDto(updateEntityRes);
        });
    }
    // /**
    //  *
    //  * @param updateConditon Object to serarch entity to be updated
    //  * @param updateFields Object updated fields
    //  * @returns status of update
    //  */
    // async updateManyAsync(updateConditon: Object, updateFields: Object) {
    //   const response = await this.crudRepository.updateManyAsync(
    //     updateConditon,
    //     updateFields
    //   );
    //   if (!response.acknowledged) {
    //     throw new BaseException(
    //       400,
    //       "UPDATE_FAILED",
    //       `Update ${this.modleName} failed!`
    //     );
    //   }
    //   return response;
    // }
    // async updateOneAsync(updateConditon: Object, updateFields: Object) {
    //   const response = await this.crudRepository.updateOneAsync(
    //     updateConditon,
    //     updateFields
    //   );
    //   if (!response.acknowledged) {
    //     throw new BaseException(
    //       400,
    //       "UPDATE_FAILED",
    //       `Update ${this.modleName} failed!`
    //     );
    //   }
    //   return response;
    // }
    deleteOneByIdAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.crudRepository.deleteOneByIdAsync(id);
            if (!response.deletedCount) {
                throw new exceptions_1.BaseException(400, "DELETE_FAILED", `Delete ${this.modleName} with id = ${id} failed!`);
            }
            return response;
        });
    }
    deleteManyByFieldAsync(fieldName, fieldValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.crudRepository.deleteManyByFieldAsync(fieldName, fieldValue);
        });
    }
    //! For development
    deleteAllAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.crudRepository.deleteAllAsync();
        });
    }
    updateOneAddItemsByIdAsync(id, fieldName, addItems) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.crudRepository.updateOneAddItemsByIdAsync(id, fieldName, addItems);
        });
    }
    updateOneRemoveItemsByIdAsync(id, fieldName, removeItems) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.crudRepository.updateOneRemoveItemsByIdAsync(id, fieldName, removeItems);
        });
    }
    updateManyAddItemByIdsAsync(ids, fieldName, addItem) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.crudRepository.updateManyAddItemByIdsAsync(ids, fieldName, addItem);
        });
    }
    updateManyRemoveItemByIdsAsync(ids, fieldName, removeItem) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.crudRepository.updateManyRemoveItemByIdsAsync(ids, fieldName, removeItem);
        });
    }
}
exports.default = BaseCrudService;
//# sourceMappingURL=BaseCrudService.js.map