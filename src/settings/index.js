import jwtDecode from "jwt-decode"
import axios from "axios"
import { logoutAction } from "../Actions/Controllers/AuthContoller/AuthController"

export const BASE_API_URL = "https://mighty-stream-65178.herokuapp.com/api/v1"

export const setup = () => {
    const token = window.localStorage.getItem("authToken")

    if (token) {
        const jwtData = jwtDecode(token)
        // check if token is has not yet expired
        if (jwtData.exp * 1000 > new Date().getTime()) {
            console.log("Connexion etabli avec l'app")
            setAxiosToken(token)
        } else {
            console.log("Déconnexion")
            logoutAction()
        }
    } else {
        logoutAction()
        console.log("Déconnexion")
    }
}

export const isAuthenticated = () => {
    const token = window.localStorage.getItem("authToken")
    if (token) {
        const jwtData = jwtDecode(token)
        if (jwtData.exp * 1000 > new Date().getTime()) {
            return true
        } 
        return false
    }
    return false
}

export const setAxiosToken = (token) => {
    axios.defaults.headers["Authorization"] = "Bearer " + token
}

export const AddPassportTokenToLocaleStorage = (token) => {
    window.localStorage.setItem("authToken", token)
}

export const setUserInfo = (userInfo) => {
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo))
}

export const checkConnectionStatus = async () => {
    try {
        await axios.get("https://mighty-stream-65178.herokuapp.com/api/me")
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return true
                }
                return false
            })
    } catch (error) {
        return false
    }
}

export function slugify(str)
{
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '') 
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-') 
    // Collapse dashes
    .replace(/-+/g, '-'); 

    return str;
}

