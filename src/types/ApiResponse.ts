export default interface ApiResponse {
    request: {
        status_code: number; // 200, 404, 500, etc.
        success: boolean; // you know what a boolean is, right?
    },
    response: any // Usually an object containing at least a `message` field, but sometimes an array :>
}