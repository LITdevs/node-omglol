"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiCall_1 = __importDefault(require("../../util/apiCall"));
const OmgError_1 = __importDefault(require("../wrapper/OmgError"));
class AccountSettings {
    #token;
    #email;
    communication;
    owner;
    date_format;
    web_editor;
    constructor(token, email, settings) {
        this.#token = token;
        this.#email = email;
        this.communication = settings.communication;
        this.owner = settings.owner;
        this.date_format = settings.date_format;
        this.web_editor = settings.web_editor;
    }
    /**
     * Sets the account settings
     * UNTESTED
     * @returns {Promise<boolean>} true if successful
     */
    async set() {
        try {
            let res = await (0, apiCall_1.default)(this.#token, 'PUT', `/account/${this.#email}/settings`, {
                communication: this.communication,
                owner: this.owner,
                date_format: this.date_format,
                web_editor: this.web_editor
            });
            return res.response.success;
        }
        catch (e) {
            throw new OmgError_1.default("API_ERROR", `An error occurred while setting account settings: ${e?.message}`);
        }
    }
}
exports.default = AccountSettings;
//# sourceMappingURL=AccountSettings.js.map