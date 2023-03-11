import IDNSRecord from "../../types/IDNSRecord";

export default class DNSRecord implements IDNSRecord {
    readonly #token: string;
    readonly authenticated: boolean;
    address: string;
    created_at: string;
    data: string;
    id: number;
    name: string;
    priority: number | null;
    ttl: number;
    type: string;
    updated_at: string;

    constructor (token: string, address: string, record: IDNSRecord) {
        this.#token = token;
        this.address = address;
        this.created_at = record.created_at;
        this.data = record.data;
        this.id = record.id;
        this.name = record.name;
        this.priority = record.priority;
        this.ttl = record.ttl;
        this.type = record.type;
        this.updated_at = record.updated_at;
        this.authenticated = !!token;
    }



}