"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiCall_1 = __importDefault(require("../../util/apiCall"));
const OmgError_1 = __importDefault(require("../wrapper/OmgError"));
class Address {
    #token;
    address;
    expiration;
    message;
    preferences;
    registration;
    owner;
    verification;
    constructor(token, address) {
        this.address = address;
        this.#token = token;
    }
    async get() {
        try {
            let res = await (0, apiCall_1.default)(this.#token, 'GET', `/address/${this.address}/info`);
            this.address = res.response.address;
            this.message = res.response.message;
            this.registration = res.response.registration;
            this.expiration = res.response.expiration;
            this.preferences = res.response.preferences;
            this.verification = res.response.verification;
            this.owner = res.response.owner;
            return this;
        }
        catch (e) {
            throw new OmgError_1.default("API_ERROR", `An error occurred while fetching address info for ${this.address}: ${e?.message}`);
        }
    }
}
exports.default = Address;
//# sourceMappingURL=Address.js.map