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
const GroupRepository_1 = __importDefault(require("../../infrastructure/repositories/GroupRepository"));
const exceptions_1 = require("../exceptions");
const Group_1 = require("../dtos/Group");
const AuthUserService_1 = __importDefault(require("./AuthUserService"));
const MeetingService_1 = __importDefault(require("./MeetingService"));
const ExerciseService_1 = __importDefault(require("./ExerciseService"));
/**
 * Service for delete group => delete in meeting, memeber, admin, exercise collection
 *
 * Service update filed => update in group and fields collection
 *
 * Service delete filed => update in group and fields collection
 */
class GroupService extends BaseCrudService_1.default {
    constructor() {
        super(new GroupRepository_1.default(), Group_1.GroupDto);
        this.groupRepository = new GroupRepository_1.default();
        this._authUserService = new AuthUserService_1.default();
        this._meetingService = new MeetingService_1.default();
        this._exerciseService = new ExerciseService_1.default();
    }
    findAllByAdminIdAsync(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminDto = yield this._authUserService.findByIdAsync(adminId);
            if (adminDto == null) {
                return null;
            }
            const groupIds = adminDto.groupIds;
            const groups = yield this.groupRepository.findAllByIdsOrAdminIdAsync(groupIds, adminId);
            const groupDtos = this.mapEntitiesToEntityDtos(groups);
            let myGroups = groupDtos === null || groupDtos === void 0 ? void 0 : groupDtos.filter((groupDto) => groupDto.adminId.toString() == adminId);
            let memberGroups = groupDtos === null || groupDtos === void 0 ? void 0 : groupDtos.filter((groupDto) => groupDto.adminId.toString() != adminId);
            return { myGroups, memberGroups };
        });
    }
    /**
     * @override
     * Check exist of user and user in new group
     *
     * AuthUserId is required
     *
     * Accept empty of member Ids
     * @returns groupDto
     */
    createAsync(groupCreateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            //! Dont need check validate input, it will be checked in controller
            // Is user exsisting? "Get" function is ensure that have least one user
            yield this._authUserService.getByIdAsync(groupCreateDto.adminId);
            // Are users existing? Accept [] of users
            const userIdsExist = yield this._authUserService
                .findManyByIdsAsync(groupCreateDto.userIds)
                .then((res) => res === null || res === void 0 ? void 0 : res.map((dto) => dto._id.toString()));
            // Create new
            groupCreateDto.userIds = userIdsExist === null || userIdsExist === void 0 ? void 0 : userIdsExist.filter((userId) => userId !== groupCreateDto.adminId);
            const groupEntity = yield this.groupRepository.createAsync(groupCreateDto);
            if (!groupEntity) {
                throw new exceptions_1.BaseException(400, "CREATE_FAILED", `Create ${this.modleName} failed!`);
            }
            // Add class in groupId of list users and user
            yield Promise.all([
                this._authUserService.updateManyAddItemByIdsAsync(userIdsExist, "groupIds", groupEntity._id),
            ]);
            return new Group_1.GroupDto(groupEntity);
        });
    }
    /**
     * @override
     * Delete one group and remove id in groupIds of list users, user, exercise, meeting
     */
    deleteOneByIdAsync(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Are class, user, users existing? It checking and returning populate of userId = IDto and userIds = IDto
            // If not we have error message
            const groupDto = yield this.getByIdPopulateAsync(id);
            // Get _id from populate of groupDto, because return userId = AuthUserDto, userIds = [UserDto]
            const userIds = (_a = groupDto.userIds) === null || _a === void 0 ? void 0 : _a.map((entity) => entity._id.toString());
            // Delete in classId of users
            // Delete relate meeting and exercise
            const [result] = yield Promise.all([
                this.groupRepository.deleteOneByIdAsync(id),
                this._authUserService.updateManyRemoveItemByIdsAsync(userIds, "groupIds", id),
                this._meetingService.deleteManyByFieldAsync("groupId", id),
                this._exerciseService.deleteManyByFieldAsync("groupId", id),
            ]);
            if (!result.deletedCount) {
                throw new exceptions_1.BaseException(400, "DELETE_FAILED", `Delete ${this.modleName} with id = ${id} failed!`);
            }
            return result;
        });
    }
    /**
     * Delete a user from the list of users.
     *
     * Check if existing in the list
     * @param groupId _id
     * @param userIds list userIds of fieldName
     *
     * It will be check validate require, unique, .... by controller validation
     *
     */
    removeUserIdsAsync(groupId, userIds) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Check exist and get real
            const groupDto = yield this.getByIdPopulateAsync(groupId);
            // Get _id from populate of groupDto, because return userIds = [UserDto]
            let userExistIds = [];
            if (groupDto.userIds) {
                userExistIds = (_a = groupDto.userIds) === null || _a === void 0 ? void 0 : _a.map((entity) => entity._id.toString());
            }
            // Get user has already existed in the class
            const removeUserIds = userIds.filter((id) => userExistIds.includes(id));
            if (removeUserIds.length == 0) {
                throw new exceptions_1.ConflictException(409, "EXIST", `User: [${JSON.stringify(userIds)}] are not existing in group.userIds`);
            }
            // Are s existing?
            // Satisfy s userIds: exist in s collection, and not existing in class - Ids
            const satisfyUserIds = yield this._authUserService
                .getManyByIdsAsync(removeUserIds)
                .then((res) => res === null || res === void 0 ? void 0 : res.map((dto) => dto._id.toString()));
            const result = yield Promise.all([
                // Delete Id in Ids with userExistIds
                this.groupRepository.updateOneRemoveItemsByIdAsync(groupId, "userIds", satisfyUserIds),
                // Update groupId with satisfyUserIds
                this._authUserService.updateManyRemoveItemByIdsAsync(satisfyUserIds, "groupIds", groupId),
            ]);
            return {
                id: groupId,
                delete: satisfyUserIds,
                result,
            };
        });
    }
    /**
     * Same with deleteFields
     */
    addUserIdsAsync(groupId, userIds) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const groupDto = yield this.getByIdPopulateAsync(groupId);
            // Get userExistIds _id from populate of groupDto, because return userIds = [UserDto]
            let userExistIds = [];
            if (groupDto.userIds) {
                userExistIds = (_a = groupDto.userIds) === null || _a === void 0 ? void 0 : _a.map((entity) => entity._id.toString());
            }
            // Remove if  has already existed in the class
            const addUserIds = userIds.filter((id) => !userExistIds.includes(id));
            // If not have any addUserIds not exist => throw error
            if ((addUserIds === null || addUserIds === void 0 ? void 0 : addUserIds.length) == 0) {
                throw new exceptions_1.ConflictException(409, "EXIST", `User: [${JSON.stringify(userIds)}] are existing in group.userIds`);
            }
            // Are s existing?
            // Satisfy s userIds: exist in s collection, and not existing in class - userIds
            const satisfyUserIds = yield this._authUserService
                .getManyByIdsAsync(addUserIds)
                .then((res) => res === null || res === void 0 ? void 0 : res.map((dto) => dto._id.toString()));
            // Update
            const result = yield Promise.all([
                this.groupRepository.updateOneAddItemsByIdAsync(groupId, "userIds", satisfyUserIds),
                this._authUserService.updateManyAddItemByIdsAsync(satisfyUserIds, "groupIds", groupId),
            ]);
            return {
                id: groupId,
                add: satisfyUserIds,
                result,
            };
        });
    }
    findByIdPopulateAsync(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.groupRepository.findByIdPopulateAsync(id);
            if (group === null) {
                return null;
            }
            const groupDto = new Group_1.GroupDto(group);
            groupDto.adminId = this._authUserService.entityToEntityDto(group.adminId);
            if (group.userIds.length > 0) {
                groupDto.userIds = (_a = group.userIds) === null || _a === void 0 ? void 0 : _a.map((user) => this._authUserService.entityToEntityDto(user));
            }
            return groupDto;
        });
    }
    getByIdPopulateAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupDto = yield this.findByIdPopulateAsync(id);
            if (groupDto === null) {
                throw new exceptions_1.NotFoundException(404, "NOT_FOUND", "Not found 'groups' with id = " + id);
            }
            return groupDto;
        });
    }
}
exports.default = GroupService;
//# sourceMappingURL=GroupService.js.map