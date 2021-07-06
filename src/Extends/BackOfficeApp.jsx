import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Dashboard from '../pages/Dashboard/Dashboard'
import {Route} from 'react-router-dom'
import Shippements from '../pages/Shippments/Shippements'
import BurgerBar from '../components/Navbar/BurgerBar'
import Notifications from '../pages/Notifications/Notifications'
import Profile from '../pages/Profile/Profile'

const appStyle = {
   
}

const BackOfficeApp = (props) => {
  
    const imageUrl = props.logo
    return (
        <div style={{display: 'flex'}}>	
            <Navbar logo={ imageUrl }/>
                <div id="app" style={appStyle}>
                    <div className="main-content" id="main-content">
                        <BurgerBar logo={props.logo}/>
                        <Route path="/profile" component={Profile} />
                        <Route path="/shippments" component={Shippements} />
                        <Route path="/dashboard" render={(props) => (<Dashboard {...props} logo={imageUrl}></Dashboard>)}/>
                        <Route path="/" exact component={Dashboard}/>
                        <Route path="/notifications" exact component={Notifications} />
                    </div>
            </div>
        </div>
    )
}

export default BackOfficeApp;