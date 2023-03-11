import axios from "axios";
import ApiResponse from "../types/ApiResponse";
import OmgError from "../classes/wrapper/OmgError";

/**
 * Makes an API call to the OMG.LOL API
 * @param token
 * @param path
 * @param method
 * @param body?
 * @param additionalHeaders?
 * @returns {Promise<ApiResponse>}
 */
export default async function apiCall(token: string, path: string, method: string = 'GET', body: any = undefined, useAuthentication: boolean = true, additionalHeaders: any = {}) : Promise<ApiResponse> {
    try {
        const apiUri = `https://api.omg.lol${path}`
        const headers = useAuthentication ? {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...additionalHeaders
        } : {
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
    } catch (e) {
        if (e.response?.status !== 401) throw e;
        throw new OmgError("API_UNAUTHORIZED", `You are not permitted to make an API call to ${path}: ${e?.message}`)
    }
}