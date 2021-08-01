import './index.css'
import Logo from './assets/logo/logo1.png'
import BackOfficeApp from './Extends/BackOfficeApp'
import { BrowserRouter } from 'react-router-dom'
import { setup, isAuthenticated, getAuthUserRole } from './settings'
import { useState } from 'react'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

setup()

const isAuth = isAuthenticated()
const getRole = getAuthUserRole()


const App = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(isAuth)
    const [authUserRole, setAuthUserRole] = useState() 
    const [appLoading, setAppLoading] = useState(false)
    //setAuthUserRole(role)
    // const [isOnline, setIsOnline] = useState(online)
    return ( 
        <BrowserRouter>
            <BackOfficeApp 
                logo = {Logo} 
                isAuthenticated={isAuthenticated} 
                onLogout={setIsAuthenticated} 
                onLogin={setIsAuthenticated} 
                isOnline={true}
                // ---
                myRole={authUserRole}
                setAuthUserRole={setAuthUserRole}
                fetchRole={getRole}
                setAppLoading={setAppLoading}
                appLoading={appLoading}
            />
            <ToastContainer />
        </BrowserRouter>     
    );
}

export default App;