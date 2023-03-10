export default interface IAddress {
    address: string;
    message: string;
    registration: {
        message: string;
        unix_epoch_time: string;
        iso_8601_time: string;
        rfc_2822_time: string;
        relative_time: string;
    }
    expiration: {
        expired: boolean;
        will_expire: boolean;
        unix_epoch_time?: string;
        iso_8601_time?: string;
        rfc_2822_time?: string;
        relative_time?: string;
    }
    preferences: {
        include_in_directory: boolean;
        show_on_dashboard: boolean;
        statuslog: {
            mastodon_posting: boolean;
        }
    }

    verification: {
        verified: boolean;
        message: string;
    }

    owner: string
}