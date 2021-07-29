import axios from "axios"
import { BASE_API_URL } from "../settings"

export const GET = "GET"
export const POST = "POST"
export const PATCH = "PATCH"
export const DELETE = "DELETE"
export const PUT = "PUT"

export const headers = {
    "content-Type":"application/json",
    'Accept': 'application/json, text/plain' 
}


// 'Access-Control-Allow-Origin': '*',
// 'Access-Control-Allow-Headers': '*',
// 'Accept': 'application/json, text/plain'

export const fetchApi = (type = null, path, data = null) => {
    switch (type) {
        case GET:
            return axios.get(BASE_API_URL + path, data, headers)
        case PUT:
            return axios.put(BASE_API_URL + path, data, headers)
        case POST:
            return axios.post(BASE_API_URL + path, data, headers)
        case PATCH:
            return axios.patch(BASE_API_URL + path, data, headers)
        case DELETE:
            return axios.delete(BASE_API_URL + path, data, headers)
        default:
            return axios.get(BASE_API_URL + path, data, headers)
    }
}