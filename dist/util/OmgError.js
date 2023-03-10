"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OmgError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = `OMG_${code}`;
    }
}
exports.default = OmgError;
//# sourceMappingURL=OmgError.js.map