import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Dashboard from '../pages/Dashboard/Dashboard'
import {Route} from 'react-router-dom'
import Shippements from '../pages/Shippments/Shippements'
import BurgerBar from '../components/Navbar/BurgerBar'
import Notifications from '../pages/Notifications/Notifications'
import Profile from '../pages/Profile/Profile'
import AddShipment from '../pages/Shippments/AddShipment'
import Parcels from '../pages/Parcels/Parcels'
import AddParcels from '../pages/Parcels/AddParcel'
import Documents from '../pages/Documents/Documents'
import Employees from '../pages/Employees/Employees'

const appStyle = {
   
}

const BackOfficeApp = (props) => {
  
    const imageUrl = props.logo
    return (
        <div style={{display: 'flex'}}>	
            <Navbar logo={ imageUrl }/>
            {/* <div id="app" style={appStyle}> */}
                <div className="main-content" id="main-content">
                    <BurgerBar logo={props.logo}/>
                    <Route path="/employees" component={Employees} />
                    <Route path="/documents" component={Documents} />
                    <Route path="/add_parcels" component={AddParcels} />
                    <Route path="/parcels" component={Parcels} />
                    <Route path="/add_shipment" component={AddShipment} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/shippments" component={Shippements} />
                    <Route path="/dashboard" render={(props) => (<Dashboard {...props} logo={imageUrl}></Dashboard>)}/>
                    <Route path="/" exact component={Dashboard}/>
                    <Route path="/notifications" exact component={Notifications} />
                </div>
            </div>
        // </div>
    )
}

export default BackOfficeApp