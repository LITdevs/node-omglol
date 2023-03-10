import apiCall from "../../util/apiCall";
import IAccount, {IAccountSettings} from "../../types/IAccount";
import Address from "./Address";
import OmgError from "../wrapper/OmgError";
import ApiResponse from "../../types/ApiResponse";
import Session from "./Session";
import AccountSettings from "./AccountSettings";

export default class Account implements IAccount {

    readonly #token: string;
    email: string;
    created: { unix_epoch_time: number; iso_8601_time: string; rfc_2822_time: string; relative_time: string };
    name: string;
    settings: IAccountSettings;


    constructor(token: string, email: string) {
        this.#token = token;
        this.email = email;
        this.get();
    }

    // Please don't use this, use OmgClient.getAccount() instead
    async get() : Promise<Account> {
        try {
            let res : ApiResponse = await apiCall(this.#token, 'GET', `/account/${this.email}/info`);
            this.name = res.response.name;
            this.created = res.response.created;
            this.settings = res.response.settings;
            return this;
        } catch (e) {
            throw new OmgError("API_ERROR", "An error occurred while fetching the account: " + e?.message);
        }
    }

    /**
     * Gets the addresses of the account
     * @returns {Promise<Address[]>} the addresses of the account
     */
    async getAddresses() : Promise<Address[]> {
        try {
            let res : ApiResponse = await apiCall(this.#token, 'GET', `/account/${this.email}/addresses`);
            let addresses = [];
            for (let address of res.response) {
                addresses.push(new Address(this.#token, address.address).get());
            }
            return await Promise.all(addresses);
        } catch (e) {
            throw new OmgError("API_ERROR", "An error occurred while fetching addresses: " + e?.message);
        }
    }

    /**
     * Gets the name of the account
     * @returns {Promise<string>} the name of the account
     */
    async getName() : Promise<string> {
        try {
            let res : ApiResponse = await apiCall(this.#token, 'GET', `/account/${this.email}/name`);
            return res.response.name;
        } catch (e) {
            throw new OmgError("API_ERROR", "An error occurred while fetching the account name: " + e?.message);
        }
    }

    /**
     * Sets the name of the account
     * @param {string} name
     * @returns {Promise<boolean>} true if successful
     */
    async setName(name) : Promise<boolean> {
        try {
            let res : ApiResponse = await apiCall(this.#token, 'POST', `/account/${this.email}/name`, {name: name});
            return res.response.success;
        } catch (e) {
            throw new OmgError("API_ERROR", "An error occurred while setting the account name: " + e?.message);
        }
    }

    /**
     * Gets the active sessions of the account
     * @returns {Promise<Session[]>}
     */
    async getActiveSessions() : Promise<Session[]> {
        try {
            let res : ApiResponse = await apiCall(this.#token, 'GET', `/account/${this.email}/sessions`);
            let sessions : Session[] = [];
            for (let session of res.response) {
                sessions.push(new Session(this.#token, this.email, session));
            }
            return sessions;
        } catch (e) {
            throw new OmgError("API_ERROR", "An error occurred while fetching active sessions: " + e?.message);
        }
    }

    /**
     * Gets the account settings
     * @returns {Promise<AccountSettings>}
     */
    async getSettings() : Promise<AccountSettings> {
        try {
            let res : ApiResponse = await apiCall(this.#token, 'GET', `/account/${this.email}/settings`);
            return new AccountSettings(this.#token, this.email, res.response.settings);
        } catch (e) {
            throw new OmgError("API_ERROR", "An error occurred while fetching account settings: " + e?.message);
        }
    }

}