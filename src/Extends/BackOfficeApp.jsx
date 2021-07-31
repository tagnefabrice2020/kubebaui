import React from 'react'
import Dashboard from '../pages/Dashboard/Dashboard'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import Shippements from '../pages/Shippments/Shippements'
import ShowShipment from '../pages/Shippments/ShowShipment'
import IncomingShipment from '../pages/Shippments/IncommingShipments'
import ShowIncomingShipment from '../pages/Shippments/ShowIncomingShipments'
import Notifications from '../pages/Notifications/Notifications'
import Profile from '../pages/Profile/Profile'
import AddShipment from '../pages/Shippments/AddShipment'
import Parcels from '../pages/Parcels/Parcels'
import AddParcels from '../pages/Parcels/AddParcel'
import Documents from '../pages/Documents/Documents'
import Employees from '../pages/Employees/Employees'
import Login from '../pages/Login/Login'
import EditRates from '../pages/Settings/editRates'
import EditPermission from '../pages/UserManagement/Permissions/editPermissions'
import EditRole from '../pages/UserManagement/Roles/editRoles'
import NotFound from '../pages/NotFound/NotFound'
import LostInternetConnection from '../modal/lostInternetConnection'
import ShowEmployee from '../pages/Employees/showEmployees'
import EditShipment from '../pages/Shippments/EditShipment'

const BackOfficeApp = (props) => {
    
    const imageUrl = props.logo
    const isAuth = props.isAuthenticated
    const onLogout = props.onLogout
    const onLogin = props.onLogin

    return (
<>
        <LostInternetConnection />
       <Switch>
            <Route exact strict path="/show_incomming_shipments/:id" render={(props) => {
                return isAuth ? <ShowIncomingShipment 
                    {...props}
                    logo={imageUrl}
                    onLogout={onLogout} 
                    isAuthenticated={props.isAuthenticated}
                />: <Redirect to="/login" />
            }}/>

            <Route exact strict path="/incomming_shipments" render={(props) => {
                return isAuth ? <IncomingShipment 
                    {...props}
                    logo={imageUrl}
                    onLogout={onLogout} 
                    isAuthenticated={props.isAuthenticated}
                />: <Redirect to="/login" />
            }}/>

            <Route exact strict path="/edit_shipments/:id" render={(props) => {
                return isAuth ? <EditShipment 
                    {...props}
                    logo={imageUrl}
                    onLogout={onLogout} 
                    isAuthenticated={props.isAuthenticated}
                />: <Redirect to="/login" />
            }}/>

            <Route exact strict path="/show_shipments/:id" render={(props) => {
                return isAuth ? <ShowShipment 
                    {...props}
                    logo={imageUrl}
                    onLogout={onLogout} 
                    isAuthenticated={props.isAuthenticated}
                />: <Redirect to="/login" />
            }}/>

            <Route exact strict path="/show_employee/:id" render={(props) => {
                return isAuth ? <ShowEmployee 
                    {...props}
                    logo={imageUrl}
                    onLogout={onLogout} 
                    isAuthenticated={props.isAuthenticated}
                />: <Redirect to="/login" />
            }}/>

            <Route exact strict path="/edit_roles/:id" render={(props) => {
                return isAuth ? <EditRole 
                    {...props}
                    logo={imageUrl}
                    onLogout={onLogout} 
                    isAuthenticated={props.isAuthenticated}
                /> : <Redirect to="/login" />
            }}/>

            <Route exact strict path="/edit_permissions/:id" render={(props) => {
                return isAuth ? <EditPermission 
                    {...props}
                    logo={imageUrl}
                    onLogout={onLogout} 
                    isAuthenticated={props.isAuthenticated}
                /> : <Redirect to="/login" />
            }}/>

           <Route exact strict path="/edit_rates/:id" render={(props) => {
                return isAuth ? <EditRates 
                    {...props}
                    logo={imageUrl}
                    onLogout={onLogout} 
                    isAuthenticated={props.isAuthenticated}
                /> : <Redirect to="/login" />
            }}/>

            <Route exact path="/employees" render={(props) => { 
                return isAuth ? <Employees 
                    {...props} 
                    logo={ imageUrl } 
                    onLogout={onLogout} 
                    isAuthenticated={isAuth} /> : <Redirect to="/login" />
                    }}
                />
            <Route exact path="/documents" render={(props) => {
                return isAuth ? <Documents 
                    {...props} 
                    logo={ imageUrl } 
                    onLogout={onLogout} 
                    isAuthenticated={isAuth} /> : <Redirect to="/login" />
                }}
            /> 
            
            <Route exact path="/add_parcels" render={(props) => {
                return isAuth ? <AddParcels 
                    {...props} 
                    logo={ imageUrl } 
                    onLogout={onLogout} 
                    isAuthenticated={isAuth} /> : <Redirect to="/login" />
                }} />
            
            <Route exact path="/parcels" render={(props) => {
                return isAuth ? <Parcels 
                    {...props} 
                    logo={ imageUrl } 
                    onLogout={onLogout} 
                    isAuthenticated={isAuth} /> : <Redirect to="/login" />
                }} />
            
            <Route exact path="/add_shipment" render={(props) => {
                return isAuth ? <AddShipment
                    {...props} 
                    logo={ imageUrl } 
                    onLogout={onLogout} 
                    isAuthenticated={isAuth} /> : <Redirect to="/login" />
                }} />
            
            <Route exact path="/profile" render={(props) => {
                return isAuth ? <Profile
                    {...props} 
                    logo={ imageUrl } 
                    onLogout={onLogout} 
                    isAuthenticated={isAuth} /> : <Redirect to="/login" />
                }} />
            
            <Route exact path="/shippments" render={(props) => {
                return isAuth ? <Shippements
                    {...props} 
                    logo={ imageUrl } 
                    onLogout={onLogout} 
                    isAuthenticated={isAuth} /> : <Redirect to="/login" />
                }} />
            
            <Route exact path="/dashboard" render={(props) => {
                return isAuth ? <Dashboard 
                                    logo={imageUrl} 
                                    onLogout={onLogout} 
                                    isAuthenticated={isAuth}></Dashboard> : 
                                    <Redirect to="/login" />
            }}/>

            <Route exact path="/notifications" render={(props) => {
                return isAuth ? <Notifications
                    {...props}
                    logo={imageUrl}
                    onLogout={onLogout} 
                    isAuthenticated={props.isAuthenticated}
                /> : <Redirect to="/login" />
            }}/> 

            <Route path="/login" exact render={(props) => {return !isAuth ? <Login {...props} onLogin={onLogin} logo={imageUrl} /> : <Redirect to="/dashboard" />}} />

            <Route path="/" exact render={(props) => {
                return isAuth ? <Dashboard {...props} 
                                    logo={imageUrl} 
                                    onLogout={onLogout} 
                                    isAuthenticated={isAuth}></Dashboard> : 
                                    <Redirect to="/login" />
            }}/> 

            <Route path="/notFound" component={NotFound} />

        </Switch> </>
    )
}

export default withRouter(BackOfficeApp)