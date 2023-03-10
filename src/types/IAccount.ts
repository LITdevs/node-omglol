export interface IAccountSettings {
    communication: string,
    owner: string
    date_format: string
    web_editor: string
}

export default interface IAccount {
    email: string; // user@domain.invalid
    name: string; // Vukky
    created: {
        unix_epoch_time: number, // 1628888582
        iso_8601_time: string, // 2021-08-13T21:03:02+00:00
        rfc_2822_time: string, // Fri, 13 Aug 2021 21:03:02 +0000
        relative_time: string // 1 year and 6 months ago
    },
    settings: IAccountSettings
}