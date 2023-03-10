export default interface ApiResponse {
    request: {
        status_code: number;
        success: boolean;
    },
    response: any
}