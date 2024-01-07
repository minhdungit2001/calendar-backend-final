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
const BaseReadOnlyController_1 = __importDefault(require("./BaseReadOnlyController"));
class BaseCrudController extends BaseReadOnlyController_1.default {
    constructor(crudService, EntityDto, EntityCreateDto, EntityUpdateDto) {
        super(crudService);
        this.updateAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Id get from route params "/user/:id"
            const { id } = req.params;
            // Raw entity dto from frontend in request body
            const rawEntityDto = req.body;
            // Create EntityUpdateDto
            // Ensure EntityUpdateDto have _id
            const entityUpdateDto = new this.EntityUpdateDto(Object.assign({ _id: id }, rawEntityDto));
            // Call Application service for validate business and get result
            const newEntityDto = yield this.crudService.updateAsync(id, entityUpdateDto);
            // Return role and user data transfer object
            return res.status(200).json(newEntityDto);
        });
        this.createAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const entityCreateDto = new this.EntityCreateDto(req.body);
            const newEntityDto = yield this.crudService.createAsync(entityCreateDto);
            return res.status(201).json(newEntityDto);
        });
        this.deleteOneAsync = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield this.crudService.deleteOneByIdAsync(id);
            return res.status(200).json(response);
        });
        //! For development
        this.deleteAllAsync = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.crudService.deleteAllAsync();
            return res.status(200).json(response);
        });
        this.crudService = crudService;
        this.EntityDto = EntityDto;
        this.EntityCreateDto = EntityCreateDto;
        this.EntityUpdateDto = EntityUpdateDto;
    }
}
exports.default = BaseCrudController;
//# sourceMappingURL=BaseCrudController.js.map