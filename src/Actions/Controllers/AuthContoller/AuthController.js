import axios from "axios"

export const logoutAction = () => {
    window.localStorage.removeItem("authToken")
    delete axios.defaults.headers["Authorization"]
    window.localStorage.removeItem("userInfo")
}