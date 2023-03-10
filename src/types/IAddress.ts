export default interface IAddress {
    address: string; // vukky
    message: string; // This address was registered 7 months and 1 week ago.
    registration: {
        message: string; // This address was registered 7 months, 1 week and 2 days ago.
        unix_epoch_time: number; // 1659286545
        iso_8601_time: string; // 2022-07-31T16:55:45+00:00
        rfc_2822_time: string; // Sun, 31 Jul 2022 16:55:45 +0000
        relative_time: string; // 7 months, 1 week and 2 days ago
    }
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
        // TODO: i dont know what the fuck is going on here but they are not booleans
        include_in_directory?: boolean;
        show_on_dashboard?: boolean;
        statuslog?: {
            mastodon_posting?: boolean;
        }
    }

    verification: {
        verified: boolean; // true
        message: string; // This address has been verified.
    }

    owner: string
}