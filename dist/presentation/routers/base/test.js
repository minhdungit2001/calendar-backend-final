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
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const router = (0, express_promise_router_1.default)();
const cloud_1 = __importDefault(require("../../../infrastructure/configs/cloud"));
router
    .route("/raw")
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.fileUpload;
    if (!file) {
        res.json({ error: { message: "File upload failed" } });
        return;
    }
    // const linkFile = await uploader.uploadFile(file);
    const linkFile = yield cloud_1.default.uploadFile(file);
    res.status(200).json({ data: linkFile });
}));
router
    .route("/raw/:fileId")
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileId = req.params.fileId;
    if (!fileId) {
        res.json({ error: { message: "FileId not correct" } });
        return;
    }
    const status = yield cloud_1.default.deleteFile(fileId);
    res.status(200).json({ status: status });
}));
router
    .route("/img")
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const image = (_b = req.files) === null || _b === void 0 ? void 0 : _b.fileUpload;
    if (!image) {
        res.json({ error: { message: "Image not found" } });
        return;
    }
    const result = yield cloud_1.default.uploadImage(image);
    res.json(result);
}));
router
    .route("/img/:imageId")
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const imageId = req.params.imageId;
    if (!imageId) {
        res.json({ error: { message: "imageId not found" } });
        return;
    }
    // const result = await uploader.deletImage(imageId);
    const result = yield cloud_1.default.deleteImage(imageId);
    // const success = { deleted: "" };
    // success.deleted[imageId] = "deleted";
    res.json(result);
}));
const MeetingModel_1 = __importDefault(require("../../../infrastructure/models/MeetingModel"));
const mongoose_1 = require("mongoose");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const ress = yield MeetingModel_1.default.aggregate([
            {
                $match: {
                    userId: new mongoose_1.Types.ObjectId("655dc0438a0fb32f2cbbf5b0"),
                },
            },
            {
                $group: {
                    _id: {
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$startDatetime",
                            },
                        },
                    },
                    documents: { $push: "$$ROOT" },
                },
            },
            {
                $sort: { "_id.date": 1 },
            },
        ]);
        return ress;
    });
}
router
    .route("/meeting")
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield main();
    res.json(result);
}));
exports.default = router;
//# sourceMappingURL=test.js.map