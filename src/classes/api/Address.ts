import IAddress from "../../types/IAddress";
import apiCall from "../../util/apiCall";
import OmgError from "../wrapper/OmgError";

export default class Address implements IAddress {

    readonly #token: string;
    address: string;
    expiration: { expired: boolean; will_expire: boolean; unix_epoch_time?: string; iso_8601_time?: string; rfc_2822_time?: string; relative_time?: string };
    message: string;
    preferences: { include_in_directory: boolean; show_on_dashboard: boolean; statuslog: { mastodon_posting: boolean } };
    registration: { message: string; unix_epoch_time: string; iso_8601_time: string; rfc_2822_time: string; relative_time: string };
    owner: string;
    verification: { verified: boolean; message: string };

    constructor(token, address: string) {
        this.address = address;
        this.#token = token;
    }

    async get() : Promise<Address> {
        try {
            let res = await apiCall(this.#token, 'GET', `/address/${this.address}/info`);

            this.address = res.response.address;
            this.message = res.response.message;
            this.registration = res.response.registration;
            this.expiration = res.response.expiration;
            this.preferences = res.response.preferences;
            this.verification = res.response.verification;
            this.owner = res.response.owner;

            return this;
        } catch (e) {
            throw new OmgError("API_ERROR", `An error occurred while fetching address info for ${this.address}: ${e?.message}`);
        }
    }

}