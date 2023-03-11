import IBaseAddress from "../../types/IBaseAddress";
import IOwnedAddress from "../../types/IOwnedAddress";
import apiCall from "../../util/apiCall";
import OmgError from "../wrapper/OmgError";
import DNSRecord from "./DNSRecord";
import Authenticated from "../../util/Authenticated";

export default class Address implements IBaseAddress, IOwnedAddress {

    readonly #token: string;
    readonly authenticated: boolean;
    address: string;
    keys: {
        pgp: string[],
        age: string[],
        ssh: string[],
        minisign: string[],
        cosign: string[]
    }
    expiration: { message: string, expired: boolean; will_expire: boolean; unix_epoch_time?: number; iso_8601_time?: string; rfc_2822_time?: string; relative_time?: string };
    message: string;
    preferences: { include_in_directory: boolean; show_on_dashboard: boolean; statuslog: { mastodon_posting: boolean } };
    registration: { message: string; unix_epoch_time: number; iso_8601_time: string; rfc_2822_time: string; relative_time: string };
    owner: string;
    verification: { verified: boolean; message: string };

    constructor(address: string, token) {
        this.address = address;
        this.#token = token;
        this.authenticated = !!token;
    }

    async get(authenticated: boolean = true) : Promise<Address> {
        try {
            let res = await apiCall(this.#token, `/address/${this.address}/info`, 'GET', undefined, authenticated);

            this.address = res.response.address;
            this.keys = res.response.keys;
            this.message = res.response.message;
            this.registration = res.response.registration;
            this.expiration = res.response.expiration;
            this.preferences = res.response.preferences;
            this.verification = res.response.verification;
            this.owner = res.response.owner;

            return this;
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw new OmgError("API_UNAUTHORIZED", "You are not allowed to get this address. If you are trying to use Account.getAddress() it is probably not linked to this account, use OmgClient.getAddress() instead to get public data.");
            throw new OmgError("API_ERROR", `An error occurred while fetching address info for ${this.address}: ${e?.message}`);
        }
    }

    /**
     * Retrieve DNS records for this address
     * @returns {Promise<DNSRecord[]>} the DNS records
     */
    @Authenticated()
    async getDNSRecords() : Promise<DNSRecord[]> {
        try {
            let res = await apiCall(this.#token, `/address/${this.address}/dns`, 'GET');
            let records = [];
            for (let record of res.response.dns) {
                records.push(new DNSRecord(this.#token, this.address, record));
            }
            return records;
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw new OmgError("API_UNAUTHORIZED", "You are not allowed to get this address. If you are trying to use Account.getAddress() it is probably not linked to this account, use OmgClient.getAddress() instead to get public data.");
            throw new OmgError("API_ERROR", `An error occurred while fetching DNS records for ${this.address}: ${e?.message}`);
        }
    }

}