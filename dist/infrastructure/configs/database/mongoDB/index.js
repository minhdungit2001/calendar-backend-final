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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const connectMongoDB = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const moongoseUrl = process.env.MONGODB_URL;
        try {
            mongoose_1.default.set("strictQuery", false);
            yield mongoose_1.default.connect(moongoseUrl);
            console.log(`Connected to MongoDb successfuly: ${moongoseUrl}`);
        }
        catch (error) {
            console.log("Cannot connect to MongoDb");
            console.log(error);
        }
    });
};
exports.default = connectMongoDB;
//# sourceMappingURL=index.js.map