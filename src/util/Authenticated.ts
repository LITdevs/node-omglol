import OmgError from "../classes/wrapper/OmgError";

/**
 * Decorator to check if the user is authenticated
 * if not, it throws an error and prevents the method from being called
 */
export default function Authenticated() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (!this.authenticated) {
                throw new OmgError('NOT_AUTHENTICATED', 'You are not authenticated');
            }
            return originalMethod.apply(this, args);
        }
        return descriptor;
    }
}