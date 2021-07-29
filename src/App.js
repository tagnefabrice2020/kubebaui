import './index.css'
import Logo from './assets/logo/logo1.png'
import BackOfficeApp from './Extends/BackOfficeApp'
import { BrowserRouter } from 'react-router-dom'
import { setup, isAuthenticated } from './settings'
import { useState } from 'react'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

setup()

const isAuth = isAuthenticated()

const App = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(isAuth)
    // const [isOnline, setIsOnline] = useState(online)
    return ( 
        <BrowserRouter>
            <BackOfficeApp 
                logo = {Logo} 
                isAuthenticated={isAuthenticated} 
                onLogout={setIsAuthenticated} 
                onLogin={setIsAuthenticated} 
                isOnline={true}
            />
            <ToastContainer />
        </BrowserRouter>     
    );
}

export default App;