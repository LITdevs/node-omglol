import apiCall from "../../util/apiCall";
import ApiResponse from "../../types/ApiResponse";
import OmgError from "../wrapper/OmgError";
import {IAccountSettings} from "../../types/IAccount";

export default class AccountSettings implements IAccountSettings {
    readonly #token: string;
    readonly #email: string;
    communication: "email_ok"|"email_not_ok"|null;
    readonly owner: string;
    date_format: "iso_8601"|"dmy"|"mdy"|null;
    web_editor: "advanced"|"classic";

    constructor(token: string, email: string, settings: IAccountSettings) {
        this.#token = token;
        this.#email = email;
        this.communication = settings.communication;
        this.owner = settings.owner;
        this.date_format = settings.date_format;
        this.web_editor = settings.web_editor;

    }

    /**
     * Sets the account settings
     * @returns {Promise<boolean>} true if successful
     */
    async set() : Promise<boolean> {
        try {
            let res : ApiResponse = await apiCall(this.#token, 'PUT', `/account/${this.#email}/settings`, {
                communication: this.communication,
                date_format: this.date_format,
                web_editor: this.web_editor
            });
            return res.response.success;
        } catch (e) {
            throw new OmgError("API_ERROR", `An error occurred while setting account settings: ${e?.message}`);
        }
    }
}