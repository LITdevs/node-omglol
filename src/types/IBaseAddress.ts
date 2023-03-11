export default interface IAddress {
    address: string; // vukky
    message: string; // This address was registered 7 months and 1 week ago.
    keys?: {
        pgp: string[],
        age: string[],
        ssh: string[],
        minisign: string[],
        cosign: string[]
    }
    registration: {
        message: string; // This address was registered 7 months, 1 week and 2 days ago.
        unix_epoch_time: number; // 1659286545
        iso_8601_time: string; // 2022-07-31T16:55:45+00:00
        rfc_2822_time: string; // Sun, 31 Jul 2022 16:55:45 +0000
        relative_time: string; // 7 months, 1 week and 2 days ago
    }
    expiration: {
        message: string; // This address is not near expiration.
        expired: boolean; // false
    }

    verification: {
        verified: boolean; // true
        message: string; // This address has been verified.
    }
}