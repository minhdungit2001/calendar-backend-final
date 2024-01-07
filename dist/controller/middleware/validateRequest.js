"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = exports.validateBody = exports.validateQuery = exports.validateParam = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * Middleware validate params
 * @param {schema} schema
 * @param {string} name property get from params
 * @returns
 */
const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validateResult = schema.validate(req.params[name]);
        if (validateResult.error) {
            return res.status(400).json(validateResult.error);
        }
        else {
            next();
        }
    };
};
exports.validateParam = validateParam;
const validateQuery = (schema) => {
    return (req, res, next) => {
        const validateQuery = schema.validate(req.query);
        if (validateQuery.error) {
            return res.status(400).json(validateQuery.error);
        }
        else {
            next();
        }
    };
};
exports.validateQuery = validateQuery;
const validateBody = (schema) => {
    return (req, res, next) => {
        const validateBody = schema.validate(req.body);
        if (validateBody.error) {
            return res.status(400).json(validateBody.error);
        }
        else {
            next();
        }
    };
};
exports.validateBody = validateBody;
exports.schemas = {
    id: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    ids: joi_1.default.array()
        .items(joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/))
        .unique()
        .required(),
    authSignup: joi_1.default.object().keys({
        fullName: joi_1.default.string().min(2).max(30).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
    }),
    authSignin: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
    }),
    updateUser: joi_1.default.object().keys({
        fullName: joi_1.default.string().min(2).max(30),
        password: joi_1.default.string().min(6),
        phoneNumber: joi_1.default.string(),
        position: joi_1.default.string(),
        department: joi_1.default.string(),
    }),
};
exports.default = {
    validateParam: exports.validateParam,
    validateBody: exports.validateBody,
    schemas: exports.schemas,
};
//# sourceMappingURL=validateRequest.js.map