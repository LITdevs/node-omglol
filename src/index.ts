import OmgError from "./classes/wrapper/OmgError";
import Account from "./classes/api/Account";

export default class OmgClient {
    readonly #token: string;
    email: string;
    account: Promise<Account>;
    constructor(token, email) {
        if (!token) {
            throw new OmgError('NO_TOKEN', 'No token provided');
        }
        if (!email) {
            throw new OmgError('NO_EMAIL', 'No email provided');
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
        return (new Account(this.#token, this.email)).get();
    }
}

export { OmgClient }
