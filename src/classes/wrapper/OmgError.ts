export default class OmgError extends Error {
    code: string;

    /**
     * Creates a new OmgError
     * @param code The error code, gets prefixed with OMG_ automatically (e.g. NO_TOKEN -> OMG_NO_TOKEN)
     * @param message The error message to display (e.g. No token provided)
     */
    constructor(code: string, message: string) {
        super(message);
        this.code = `OMG_${code}`;
    }
}