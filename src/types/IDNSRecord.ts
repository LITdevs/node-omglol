export default interface IDNSRecord {
    id: number;
    type: string;
    name: string;
    data: string;
    priority: number|null;
    ttl: number;
    created_at: string;
    updated_at: string;
}