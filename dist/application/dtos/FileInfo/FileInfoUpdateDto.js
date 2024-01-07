"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileInfoUpdateDto {
    constructor({ fileId, fileName, webContentLink, webViewLink, userId, groupId, exerciseId, }) {
        if (fileId)
            this.fileId = fileId;
        if (fileName)
            this.fileName = fileName;
        if (webContentLink)
            this.webContentLink = webContentLink;
        if (webViewLink)
            this.webViewLink = webViewLink;
        if (userId)
            this.userId = userId;
        if (groupId)
            this.groupId = groupId;
        if (exerciseId)
            this.exerciseId = exerciseId;
    }
}
exports.default = FileInfoUpdateDto;
//# sourceMappingURL=FileInfoUpdateDto.js.map