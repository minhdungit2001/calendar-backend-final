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
const TimeslotService_1 = __importDefault(require("../../application/services/TimeslotService"));
const Timeslot_1 = require("../../application/dtos/Timeslot");
class TimeslotController extends BaseCrudController_1.default {
    constructor() {
        super(new TimeslotService_1.default(), Timeslot_1.TimeslotDto, Timeslot_1.TimeslotCreateDto, Timeslot_1.TimeslotUpdateDto);
        this.addUserRegistersAsnyc = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userRegisterIds, freeTimeId } = req.body;
            const timeslotDto = yield this.timeslotService.addUserRegistersAsnyc(userRegisterIds, freeTimeId);
            res.status(200).json(timeslotDto);
        });
        this.removeUserRegistersAsnyc = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userRegisterIds, freeTimeId } = req.body;
            const timeslotDto = yield this.timeslotService.removeUserRegistersAsnyc(userRegisterIds, freeTimeId);
            res.status(200).json(timeslotDto);
        });
        this.removeFreeTimeAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, freeTimeId } = req.params;
            const timeslotDto = yield this.timeslotService.removeFreeTimeAsync(id, freeTimeId);
            res.status(200).json(timeslotDto);
        });
        this.addFreeTimeAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { freeTimes } = req.body;
            const timeslotDto = yield this.timeslotService.addFreeTimeAsync(id, freeTimes);
            res.status(200).json(timeslotDto);
        });
        this.timeslotService = new TimeslotService_1.default();
    }
}
exports.default = TimeslotController;
//# sourceMappingURL=TimeslotController.js.map