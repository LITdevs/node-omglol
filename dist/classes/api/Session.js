"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiCall_1 = __importDefault(require("../../util/apiCall"));
const OmgError_1 = __importDefault(require("../wrapper/OmgError"));
class Session {
    #token;
    #email;
    created_ip;
    created_on;
    expires_on;
    session_id;
    user_agent;
    constructor(token, email, session) {
        this.#token = token;
        this.#email = email;
        this.created_ip = session.created_ip;
        this.created_on = session.created_on;
        this.expires_on = session.expires_on;
        this.session_id = session.session_id;
        this.user_agent = session.user_agent;
    }
    async remove() {
        try {
            let res = await (0, apiCall_1.default)(this.#token, 'DELETE', `/account/${this.#email}/sessions/${this.session_id}`);
            return res.response.success;
        }
        catch (e) {
            throw new OmgError_1.default("API_ERROR", `An error occurred while removing session ${this.session_id}: ${e?.message}`);
        }
    }
}
exports.default = Session;
//# sourceMappingURL=Session.js.map