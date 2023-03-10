"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiCall_1 = __importDefault(require("../../util/apiCall"));
const Address_1 = __importDefault(require("./Address"));
const OmgError_1 = __importDefault(require("../wrapper/OmgError"));
const Session_1 = __importDefault(require("./Session"));
const AccountSettings_1 = __importDefault(require("./AccountSettings"));
class Account {
    #token;
    email;
    created;
    name;
    settings;
    constructor(token, email) {
        this.#token = token;
        this.email = email;
        this.get();
    }
    async get() {
        try {
            let res = await (0, apiCall_1.default)(this.#token, 'GET', `/account/${this.email}/info`);
            this.name = res.response.name;
            this.created = res.response.created;
            this.settings = res.response.settings;
            return this;
        }
        catch (e) {
            throw new OmgError_1.default("API_ERROR", "An error occurred while fetching the account: " + e?.message);
        }
    }
    async getAddresses() {
        try {
            let res = await (0, apiCall_1.default)(this.#token, 'GET', `/account/${this.email}/addresses`);
            let addresses = [];
            for (let address of res.response) {
                addresses.push(new Address_1.default(this.#token, address.address).get());
            }
            return await Promise.all(addresses);
        }
        catch (e) {
            throw new OmgError_1.default("API_ERROR", "An error occurred while fetching addresses: " + e?.message);
        }
    }
    async getName() {
        try {
            let res = await (0, apiCall_1.default)(this.#token, 'GET', `/account/${this.email}/name`);
            return res.response.name;
        }
        catch (e) {
            throw new OmgError_1.default("API_ERROR", "An error occurred while fetching the account name: " + e?.message);
        }
    }
    /**
     * Sets the name of the account
     * @param {string} name
     * @returns {Promise<boolean>} true if successful
     */
    async setName(name) {
        try {
            let res = await (0, apiCall_1.default)(this.#token, 'POST', `/account/${this.email}/name`, { name: name });
            return res.response.success;
        }
        catch (e) {
            throw new OmgError_1.default("API_ERROR", "An error occurred while setting the account name: " + e?.message);
        }
    }
    async getActiveSessions() {
        try {
            let res = await (0, apiCall_1.default)(this.#token, 'GET', `/account/${this.email}/sessions`);
            let sessions = [];
            for (let session of res.response) {
                sessions.push(new Session_1.default(this.#token, this.email, session));
            }
            return sessions;
        }
        catch (e) {
            throw new OmgError_1.default("API_ERROR", "An error occurred while fetching active sessions: " + e?.message);
        }
    }
    async getSettings() {
        try {
            let res = await (0, apiCall_1.default)(this.#token, 'GET', `/account/${this.email}/settings`);
            return new AccountSettings_1.default(this.#token, this.email, res.response.settings);
        }
        catch (e) {
            throw new OmgError_1.default("API_ERROR", "An error occurred while fetching account settings: " + e?.message);
        }
    }
}
exports.default = Account;
//# sourceMappingURL=Account.js.map