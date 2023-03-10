export interface IAccountSettings {
    communication: string,
    owner: string
    date_format: string
    web_editor: string
}

export default interface IAccount {
    email: string;
    name: string;
    created: {
        unix_epoch_time: string,
        iso_8601_time: string,
        rfc_2822_time: string,
        relative_time: string
    },
    settings: IAccountSettings
}