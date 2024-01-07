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
class BaseReadOnlyController {
    constructor(readOnlyService) {
        // Get all the entities controller
        // No parameters and no body parameters
        this.getAllAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const entityDtos = yield this.readOnlyService.getAllAsync();
            return res.status(200).json(entityDtos);
        });
        // Find by id controller
        this.findByIdAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Get id from route parameters
            const { id } = req.params;
            const entityDto = yield this.readOnlyService.findByIdAsync(id);
            return res.status(200).json(entityDto);
        });
        this.findByCollectionIdAsync = (fieldName, populate) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const entityDtos = yield this.readOnlyService.findByCollectionIdAsync(fieldName, id, populate);
                res.status(200).json(entityDtos);
            });
        };
        this.readOnlyService = readOnlyService;
        this.modelName = readOnlyService.modleName;
    }
}
exports.default = BaseReadOnlyController;
//# sourceMappingURL=BaseReadOnlyController.js.map