"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmgClient = void 0;
const OmgError_1 = __importDefault(require("./classes/wrapper/OmgError"));
const Account_1 = __importDefault(require("./classes/api/Account"));
class OmgClient {
    #token;
    email;
    account;
    constructor(token, email) {
        if (!token) {
            throw new OmgError_1.default('NO_TOKEN', 'No token provided');
        }
        if (!email) {
            throw new OmgError_1.default('NO_EMAIL', 'No email provided');
        }
        this.#token = token;
        this.email = email;
        this.account = this.getAccount();
    }
    /**
     * Returns the current account
     * @returns {Promise<Account>}
     */
    async getAccount() {
        return (new Account_1.default(this.#token, this.email)).get();
    }
}
exports.default = OmgClient;
exports.OmgClient = OmgClient;
//# sourceMappingURL=index.js.map