import Account from "./classes/api/Account";
import Authenticated from "./util/Authenticated";
import IBaseAddress from "./types/IBaseAddress";
import OmgError from "./classes/wrapper/OmgError";
import apiCall from "./util/apiCall";
import Address from "./classes/api/Address";
import IAvailability from "./types/IAvailability";

export default class OmgClient {
    readonly #token: string;
    readonly #email: string;
    readonly authenticated: boolean;
    constructor(token?, email?) {
        this.#token = token;
        this.#email = email;
        this.authenticated = !!token;
    }

    /**
     * Returns the current account
     * @returns {Promise<Account>}
     */
    @Authenticated()
    async getAccount() {
        return (new Account(this.#token, this.#email)).get();
    }

    /**
     * Get public information about an address
     * @param address the address to get information about
     * @returns {Promise<IBaseAddress>}
     */
    async getAddress(address: string) : Promise<IBaseAddress> {
        try {
            return new Address(address, undefined).get(false);
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw e;
            throw new OmgError("API_ERROR", `An error occurred while fetching the address: ${e?.message}`);
        }
    }

    /**
     * Get address availability
     * @param address the address to check
     * @returns {Promise<IAvailability>}
     */
    async getAddressAvailability(address: string) : Promise<IAvailability> {
        try {
            let res = await apiCall(undefined, `/address/${address}/availability`, 'GET', undefined, false);
            return res.response;
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw e;
            throw new OmgError("API_ERROR", `An error occurred while fetching the address availability for ${address}: ${e?.message}`);
        }
    }

    /**
     * Get address expiration
     * @param address the address to check
     * @returns {Promise<{expired: boolean, expiresInSixMonths: boolean}>}
     */
    async getAddressExpiration(address: string) : Promise<{expired: boolean, expiresInSixMonths: boolean}> {
        try {
            let res = await apiCall(undefined, `/address/${address}/expiration`, 'GET', undefined, false);
            return {
                expired: res.response.expired,
                expiresInSixMonths: res.response.message.includes("expires within the next six months")
            };
        } catch (e) {
            if (e.code === "OMG_API_UNAUTHORIZED") throw e;
            throw new OmgError("API_ERROR", `An error occurred while fetching the address expiration for ${address}: ${e?.message}`);
        }
    }
}

export { OmgClient }
