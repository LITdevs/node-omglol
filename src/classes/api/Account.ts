import apiCall from "../../util/apiCall";
import IAccount, {IAccountSettings} from "../../types/IAccount";
import Address from "./Address";
import OmgError from "../wrapper/OmgError";
import ApiResponse from "../../types/ApiResponse";
import Session from "./Session";
import AccountSettings from "./AccountSettings";
import Authenticated from "../../util/Authenticated";

export default class Account implements IAccount {

    readonly #token: string;
    readonly authenticated: boolean;
    email: string;
    created: { unix_epoch_time: number; iso_8601_time: string; rfc_2822_time: string; relative_time: string };
    name: string;
    settings: IAccountSettings;


    constructor(token: string, email: string) {
        this.#token = token;
        this.email = email;
        this.authenticated = !!token;
        this.get();
    }

    // Please don't use this, use OmgClient.getAccount() instead
    @Authenticated()
    async get() : Promise<Account> {
        try {
            let res : ApiResponse = await apiCall(this.#token, `/account/${this.email}/info`, 'GET');
            this.name = res.response.name;
            this.created = res.response.created;
            this.settings = res.response.settings;
            return this;
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw e;
            throw new OmgError("API_ERROR", "An error occurred while fetching the account: " + e?.message);
        }
    }

    /**
     * Gets the addresses of the account
     * @returns {Promise<Address[]>} the addresses of the account
     */
    @Authenticated()
    async getAddresses() : Promise<Address[]> {
        try {
            let res : ApiResponse = await apiCall(this.#token, `/account/${this.email}/addresses`, 'GET');
            let addresses = [];
            for (let address of res.response) {
                addresses.push(new Address(address.address, this.#token).get());
            }
            return await Promise.all(addresses);
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw e;
            throw new OmgError("API_ERROR", "An error occurred while fetching addresses: " + e?.message);
        }
    }

    /**
     * Get a specific address of the account
     * @param {string} address
     */
    @Authenticated()
    async getAddress(address: string) : Promise<Address> {
        try {
            return new Address(address, this.#token).get();
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw new OmgError("API_UNAUTHORIZED", "You are not allowed to get this address, it is probably not linked to this account. Use OmgClient.getAddress() to get public data.");
            throw new OmgError("API_ERROR", "An error occurred while fetching the address: " + e?.message);
        }
    }

    /**
     * Gets the name of the account
     * @returns {Promise<string>} the name of the account
     */
    @Authenticated()
    async getName() : Promise<string> {
        try {
            let res : ApiResponse = await apiCall(this.#token, `/account/${this.email}/name`, 'GET');
            return res.response.name;
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw e;
            throw new OmgError("API_ERROR", "An error occurred while fetching the account name: " + e?.message);
        }
    }

    /**
     * Sets the name of the account
     * @param {string} name
     * @returns {Promise<boolean>} true if successful
     */
    @Authenticated()
    async setName(name) : Promise<boolean> {
        try {
            let res : ApiResponse = await apiCall(this.#token, `/account/${this.email}/name`, 'POST', {name: name});
            return res.response.success;
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw e;
            throw new OmgError("API_ERROR", "An error occurred while setting the account name: " + e?.message);
        }
    }

    /**
     * Gets the active sessions of the account
     * @returns {Promise<Session[]>}
     */
    @Authenticated()
    async getActiveSessions() : Promise<Session[]> {
        try {
            let res : ApiResponse = await apiCall(this.#token, `/account/${this.email}/sessions`, 'GET');
            let sessions : Session[] = [];
            for (let session of res.response) {
                sessions.push(new Session(this.#token, this.email, session));
            }
            return sessions;
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw e;
            throw new OmgError("API_ERROR", "An error occurred while fetching active sessions: " + e?.message);
        }
    }

    /**
     * Gets the account settings
     * @returns {Promise<AccountSettings>}
     */
    @Authenticated()
    async getSettings() : Promise<AccountSettings> {
        try {
            let res : ApiResponse = await apiCall(this.#token, `/account/${this.email}/settings`, 'GET');
            return new AccountSettings(this.#token, this.email, res.response.settings);
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw e;
            throw new OmgError("API_ERROR", "An error occurred while fetching account settings: " + e?.message);
        }
    }
}