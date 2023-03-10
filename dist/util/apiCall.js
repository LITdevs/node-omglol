"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function default_1(token, method = 'GET', path, body = undefined, additionalHeaders = {}) {
    const apiUri = `https://api.omg.lol${path}`;
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...additionalHeaders
    };
    const response = (await (0, axios_1.default)({
        method,
        url: apiUri,
        headers,
        data: body
    })).data;
    return response;
}
exports.default = default_1;
//# sourceMappingURL=apiCall.js.map