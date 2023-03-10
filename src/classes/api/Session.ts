import ISession from "../../types/ISession";
import apiCall from "../../util/apiCall";
import ApiResponse from "../../types/ApiResponse";
import OmgError from "../wrapper/OmgError";

export default class Session implements ISession {
    readonly #token: string;
    readonly #email: string;
    created_ip: string;
    created_on: string;
    expires_on: string;
    session_id: string;
    user_agent: string;

    constructor(token: string, email: string, session: ISession) {
        this.#token = token;
        this.#email = email;
        this.created_ip = session.created_ip;
        this.created_on = session.created_on;
        this.expires_on = session.expires_on;
        this.session_id = session.session_id;
        this.user_agent = session.user_agent;
    }

    async remove() : Promise<boolean> {
        try {
            let res : ApiResponse = await apiCall(this.#token, 'DELETE', `/account/${this.#email}/sessions/${this.session_id}`);
            return res.response.success;
        } catch (e) {
            throw new OmgError("API_ERROR", `An error occurred while removing session ${this.session_id}: ${e?.message}`);
        }
    }
}