"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileInfoDto {
    constructor({ _id, fileId, fileName, webContentLink, webViewLink, type, userId, groupId, exerciseId, createdAt, }) {
        this._id = _id;
        this.fileId = fileId;
        this.fileName = fileName;
        this.webContentLink = webContentLink;
        this.webViewLink = webViewLink;
        this.type = type;
        this.userId = userId;
        this.groupId = groupId;
        this.exerciseId = exerciseId;
        this.createdAt = createdAt;
    }
}
exports.default = FileInfoDto;
//# sourceMappingURL=FileInfoDto.js.map