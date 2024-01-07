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
const BaseCrudService_1 = __importDefault(require("./base/BaseCrudService"));
const TimeslotRepository_1 = __importDefault(require("../../infrastructure/repositories/TimeslotRepository"));
const Timeslot_1 = require("../dtos/Timeslot");
const AuthUserService_1 = __importDefault(require("./AuthUserService"));
class TimeslotService extends BaseCrudService_1.default {
    constructor() {
        super(new TimeslotRepository_1.default(), Timeslot_1.TimeslotDto);
        this._authUserService = new AuthUserService_1.default();
        this.timeslotRepository = new TimeslotRepository_1.default();
    }
    addUserRegistersAsnyc(userRegisterIds, freeTimeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIdsExist = yield this._authUserService
                .getManyByIdsAsync(userRegisterIds)
                .then((res) => res === null || res === void 0 ? void 0 : res.map((dto) => dto._id.toString()));
            const result = yield this.timeslotRepository.addUserRegistersAsnyc(userIdsExist, freeTimeId);
            return result;
        });
    }
    removeUserRegistersAsnyc(userRegisterIds, freeTimeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.timeslotRepository.removeUserRegistersAsnyc(userRegisterIds, freeTimeId);
            return result;
        });
    }
    removeFreeTimeAsync(timeslotId, freeTimeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.timeslotRepository.removeFreeTimeAsync(timeslotId, freeTimeId);
        });
    }
    addFreeTimeAsync(timeslotId, freeTimes) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.timeslotRepository.addFreeTimeAsync(timeslotId, freeTimes);
        });
    }
}
exports.default = TimeslotService;
//# sourceMappingURL=TimeslotService.js.map