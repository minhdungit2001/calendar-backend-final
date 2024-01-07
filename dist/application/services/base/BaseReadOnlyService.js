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
const exceptions_1 = require("../../exceptions");
/**
 * Create base read only service for entities.
 *
 * Input: entity
 *
 * Output: data transfer object
 *
 * @template TDocument document of the model, it maybe entity object
 * @template TEntityDto data transfer object to show client side
 */
class BaseReadOnlyService {
    // Constructor two value: new Repository() and Class Entity
    constructor(readOnlyRepository, EntityDto) {
        this.readOnlyRepository = readOnlyRepository;
        this.EntityDto = EntityDto;
        this.modleName = readOnlyRepository.getModelName();
    }
    /**
     * Maping from entity to entityDto
     * @param entity entity of repository returning
     * @returns entityDto
     */
    entityToEntityDto(entity) {
        return new this.EntityDto(entity);
    }
    /**
     * Check null and mapping entities to entityDtos
     * @param entities
     * @returns
     */
    mapEntitiesToEntityDtos(entities) {
        if (entities === null || entities.length === 0) {
            return null;
        }
        const entityDtos = entities === null || entities === void 0 ? void 0 : entities.map((entity) => new this.EntityDto(entity));
        return entityDtos;
    }
    mapEntityToEntityDto(entity) {
        if (entity === null) {
            return null;
        }
        const entityDto = new this.EntityDto(entity);
        return entityDto;
    }
    /**
     * Get all value.
     * It will be deleted or replaced by ofset and limited
     * @returns entityDtos or null
     */
    getAllAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.readOnlyRepository.getAllAsync();
            const entityDtos = this === null || this === void 0 ? void 0 : this.mapEntitiesToEntityDtos(entities);
            return entityDtos;
        });
    }
    /**
     * Find by id, it will be return null or EntityDto
     * @param id
     * @returns EntityDto or null
     */
    findByIdAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.readOnlyRepository.findByIdAsync(id);
            const entityDto = this === null || this === void 0 ? void 0 : this.mapEntityToEntityDto(entity);
            return entityDto;
        });
    }
    /**
     * Find many by list id
     * @param ids list id
     * @returns EntityDtos or null
     */
    findManyByIdsAsync(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.readOnlyRepository.findManyByIdsAsync(ids);
            const entityDtos = this === null || this === void 0 ? void 0 : this.mapEntitiesToEntityDtos(entities);
            return entityDtos;
        });
    }
    /**
     * Find by another collection id save in fieldId
     *
     * @param fieldName
     * @param id
     */
    findByCollectionIdAsync(fieldName, id, poputlate) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.readOnlyRepository.findByCollectionIdAsync(fieldName, id, poputlate);
            const entityDtos = this === null || this === void 0 ? void 0 : this.mapEntitiesToEntityDtos(entities);
            return entityDtos;
        });
    }
    /**
     * Find by id, it will be return null or EntityDto
     * @param id
     * @returns EntityDto or null
     */
    findByIdPopulateAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.readOnlyRepository.findByIdPopulateAsync(id);
            const entityDto = this === null || this === void 0 ? void 0 : this.mapEntityToEntityDto(entity);
            return entityDto;
        });
    }
    /**
     * Get entityDto by id, ensuring that id exist instance.
     * Throw error if id not correctly
     * @param id string
     * @returns entityDtos
     */
    getByIdPopulateAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get entityDto from id
            const entityDto = yield this.findByIdPopulateAsync(id);
            // If not exist, throw an error
            if (entityDto === null) {
                throw new exceptions_1.NotFoundException(404, "NOT_FOUND", `Not found '${this.modleName}' in Ids: ${id}`);
            }
            // Return Dto
            return entityDto;
        });
    }
    /**
     * Get entityDto by id, ensuring that id exist instance.
     * Throw error if id not correctly
     * @param id string
     * @returns entityDtos
     */
    getByIdAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get entityDto from id
            const entityDto = yield this.findByIdAsync(id);
            // If not exist, throw an error
            if (entityDto === null) {
                throw new exceptions_1.NotFoundException(404, "NOT_FOUND", `Not found '${this.modleName}' in Ids: ${id}`);
            }
            // Return Dto
            return entityDto;
        });
    }
    /**
     * Get many by ids
     * @param ids
     * @returns
     */
    getManyByIdsAsync(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ids.length === 0) {
                throw new exceptions_1.BaseException(400, "ERROR", "Ids must be not empty");
            }
            // Get many entityDtos from ids
            const entityDtos = yield this.findManyByIdsAsync(ids);
            // If not exist, throw an error
            if ((entityDtos === null || entityDtos === void 0 ? void 0 : entityDtos.length) === 0 || entityDtos === null) {
                throw new exceptions_1.NotFoundException(404, "NOT_FOUND", `Not found '${this.modleName}' in Ids: [${JSON.stringify(ids)}]`);
            }
            return entityDtos;
        });
    }
}
exports.default = BaseReadOnlyService;
//# sourceMappingURL=BaseReadOnlyService.js.map