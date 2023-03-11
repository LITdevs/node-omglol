export default interface IAvailability {
    message: string; // This address is available.
    available: boolean; // true
    address: string; // vukky
    availability: "available"|"unavailable";
    invalid?: boolean; // true
    /**
     * Contains links to additional documentation if your address does not meet the requirements or requires encoding.
     * @see https://home.omg.lol/info/address-requirements
     */
    "see-also"?: string[];
    punycode?: string; // xn--js9h
}