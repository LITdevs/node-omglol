"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OmgError extends Error {
    code;
    /**
     * Creates a new OmgError
     * @param code The error code, gets prefixed with OMG_ automatically (e.g. NO_TOKEN -> OMG_NO_TOKEN)
     * @param message The error message to display (e.g. No token provided)
     */
    constructor(code, message) {
        super(message);
        this.code = `OMG_${code}`;
    }
}
exports.default = OmgError;
//# sourceMappingURL=OmgError.js.map