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
const ExerciseService_1 = __importDefault(require("../../application/services/ExerciseService"));
const Exercise_1 = require("../../application/dtos/Exercise");
const FileInfoService_1 = __importDefault(require("../../application/services/FileInfoService"));
const GroupService_1 = __importDefault(require("../../application/services/GroupService"));
const cloud_1 = __importDefault(require("../../infrastructure/configs/cloud"));
class ExerciseController extends BaseCrudController_1.default {
    constructor() {
        super(new ExerciseService_1.default(), Exercise_1.ExerciseDto, Exercise_1.ExerciseCreateDto, Exercise_1.ExerciseUpdateDto);
        this.exerciseService = new ExerciseService_1.default();
        this.fileInfoService = new FileInfoService_1.default();
        this.groupService = new GroupService_1.default();
        this.findByIdAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const entityDto = yield this.exerciseService.findByIdPopulateAsync(id);
            return res.status(200).json(entityDto);
        });
        this.findByGroupIdAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { groupId, userId } = req.params;
            const exercises = yield this.exerciseService.findByGroupIdAsync(groupId);
            const exerciseDtos = exercises === null || exercises === void 0 ? void 0 : exercises.map((exercise) => {
                const exerciseDto = new Exercise_1.ExerciseDto(exercise);
                if (userId.toString() === exercise.adminId.toString()) {
                    return Object.assign(Object.assign({}, exerciseDto), { isAdmin: true, isSubmitted: false });
                }
                const isSubmitted = exerciseDto.submittedIds.some((submited) => {
                    return submited.userId._id.toString() === userId.toString();
                });
                const newSubmittedIds = exercise.submittedIds.filter((submitted) => submitted.userId._id.toString() === userId.toString());
                return Object.assign(Object.assign({}, exerciseDto), { submittedIds: newSubmittedIds, isSubmitted: isSubmitted, isAdmin: false });
            });
            return res.status(200).json(exerciseDtos);
        });
        this.createAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const rawDto = req.body;
            const exerciseDto = yield this.exerciseService.createAsync(rawDto);
            if (req.files && req.files.fileUpload) {
                const fileUpload = req.files.fileUpload;
                const fileRes = yield cloud_1.default.uploadFile(fileUpload);
                const fileInfo = yield this.fileInfoService.createAsync({
                    fileId: fileRes.id,
                    fileName: fileRes.name,
                    webContentLink: fileRes.webContentLink,
                    webViewLink: fileRes.webViewLink,
                    type: "description",
                    userId: rawDto.userId,
                    groupId: exerciseDto.groupId,
                    exerciseId: exerciseDto._id,
                });
                yield this.exerciseService.updateAsync(exerciseDto._id, {
                    fileInfoId: fileInfo._id,
                });
            }
            return res.status(201).json(exerciseDto);
        });
        this.updateAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rawDto = req.body;
            const exerciseDto = yield this.exerciseService.getByIdPopulateAsync(id);
            if (!req.files || !req.files.fileUpload) {
                const updateExercise = yield this.exerciseService.updateAsync(exerciseDto._id, new Exercise_1.ExerciseUpdateDto(rawDto));
                return res.status(200).json(updateExercise);
            }
            const fileUpload = req.files.fileUpload;
            if (exerciseDto.fileInfoId) {
                Promise.all([
                    cloud_1.default.deleteFile(exerciseDto.fileInfoId.fileId),
                    this.fileInfoService.deleteOneByIdAsync(exerciseDto.fileInfoId._id),
                ]);
            }
            const fileRes = yield cloud_1.default.uploadFile(fileUpload);
            const fileInfo = yield this.fileInfoService.createAsync({
                fileId: fileRes.id,
                fileName: fileRes.name,
                webContentLink: fileRes.webContentLink,
                webViewLink: fileRes.webViewLink,
                type: "description",
                userId: rawDto.userId,
                groupId: exerciseDto.groupId,
                exerciseId: exerciseDto._id,
            });
            const updateExercise = yield this.exerciseService.updateAsync(exerciseDto._id, Object.assign(Object.assign({}, new Exercise_1.ExerciseUpdateDto(rawDto)), { fileInfoId: fileInfo._id }));
            return res.status(200).json(updateExercise);
        });
        this.submittedAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, groupId } = req.body;
            const { exerciseId } = req.params;
            if (req.files && req.files.fileUpload) {
                const fileUpload = req.files.fileUpload;
                const fileRes = yield cloud_1.default.uploadFile(fileUpload);
                const fileInfo = yield this.fileInfoService.createAsync({
                    fileId: fileRes.id,
                    fileName: fileRes.name,
                    webContentLink: fileRes.webContentLink,
                    webViewLink: fileRes.webViewLink,
                    type: "submitted",
                    userId: userId,
                    groupId: groupId,
                    exerciseId: exerciseId,
                });
                const exercise = yield this.exerciseService.updateSubmittedIdsAsync(exerciseId, userId, fileInfo._id);
                return res.status(200).json({ fileInfo, exercise });
            }
            return res.status(404).json({
                erorr: {
                    message: "File upload failed!",
                    code: "FILE_UPLOAD_FAILED",
                },
            });
        });
        this.unsubmittedAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { exerciseId } = req.params;
            const { userId, groupId } = req.body;
            const fileInfo = yield this.fileInfoService.findSubmittedRoleMemberAsync(groupId, exerciseId, userId);
            if (fileInfo && fileInfo.length > 0) {
                yield Promise.all([
                    this.fileInfoService.deleteOneByIdAsync(fileInfo[0]._id),
                    this.exerciseService.updateSubmittedIdsAsync(exerciseId, userId, fileInfo[0]._id, false),
                    cloud_1.default.deleteFile(fileInfo[0].fileId),
                ]);
            }
            return res.status(200).json({ success: true });
        });
    }
}
exports.default = ExerciseController;
//# sourceMappingURL=ExerciseController.js.map