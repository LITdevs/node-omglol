import axios from "axios";
import ApiResponse from "../types/ApiResponse";

/**
 * Makes an API call to the OMG.LOL API
 * @param token
 * @param method
 * @param path
 * @param body?
 * @param additionalHeaders?
 * @returns {Promise<ApiResponse>}
 */
export default async function (token: string, method: string = 'GET', path: string, body : any = undefined, additionalHeaders : any = {}) : Promise<ApiResponse> {
    const apiUri = `https://api.omg.lol${path}`
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...additionalHeaders
    }

    const response : ApiResponse = (await axios({
        method,
        url: apiUri,
        headers,
        data: body
    })).data;

    return response;
}