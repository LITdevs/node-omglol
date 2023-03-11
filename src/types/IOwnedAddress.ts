import IBaseAddress from "./IBaseAddress";

export default interface IOwnedAddress extends IBaseAddress {
    /**
     * The exact expiry time can only be accessed with authenticated requests to owned addresses.
     */
    expiration: {
        message: string; // This address expires in 1 year, 4 months and 3 weeks.
        expired: boolean; // false
        will_expire: boolean; // true
        unix_epoch_time?: number; // 1722444945
        iso_8601_time?: string; // 2024-07-31T16:55:45+00:00
        rfc_2822_time?: string; // Wed, 31 Jul 2024 16:55:45 +0000
        relative_time?: string; // 1 year, 4 months and 3 weeks
    }
    preferences: {
        include_in_directory?: '1'|''|undefined|null|boolean;
        show_on_dashboard?: '1'|''|undefined|null|boolean;
        statuslog?: {
            mastodon_posting?: '1'|''|undefined|null|boolean;
        }
    }

    owner: string; // 63fc692e95dbc
}