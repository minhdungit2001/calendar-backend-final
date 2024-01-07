"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./infrastructure/configs/database"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const _index_1 = __importDefault(require("./presentation/routers/_index"));
const handleException_1 = __importDefault(require("./presentation/middleware/handleException"));
dotenv_1.default.config();
// Connect to mongodb
(0, database_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Cors for accept request from frontend url
const corsOptions = {
    exposedHeaders: "Authorization",
};
app.use((0, cors_1.default)(corsOptions));
// Looger request from user
app.use((0, morgan_1.default)("dev"));
// Accept and build file upload
app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
// Use router
(0, _index_1.default)(app);
// Middleware Handle exceptions
(0, handleException_1.default)(app);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map