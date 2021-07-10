import React,  { Fragment } from 'react'
import {Link, NavLink, withRouter} from 'react-router-dom'

const buttonBageStyle =  {
    left: '50%',
    transform: 'translateX(8px)',
    backgroundColor:' hsl(10deg 100% 60%)',
    fontSize: 11 + 'px',
    lineHeight: '0',
    fontWeight: '500',
    color: '#fff',
    padding: '1em 0.7 em',
    borderRadius: '50px',
    padding: '5px'
}

const menuListStyle = {
    padding: '1 rem 0 0 1 rem'
}


const logoStyle = {
    width: '50%', marginLeft: '50%', transform: 'translate(-55%)'
}

const Navbar = (props) => {
   
    const dashboardActive = props.location.pathname.match(/^\/dashboard/) ? "active" : ""
    const notificationsActive = props.location.pathname.match(/^\/notifications/) ? "active" : ""
    const shippmentActive = props.location.pathname.match(/^\/shippments/) ? "active" : ""
    const profileActive = props.location.pathname.match(/^\/profile/) ? "active" : ""
    const parcelActive = props.location.pathname.match(/^\/parcels/) ? "active" : ""
    const documentActive = props.location.pathname.match(/^\/documents/) ? "active" : ""
    
    return ( 
        <>
            <div className="side-menu" id="side-menu">
	            <aside className="menu m-l-10 m-t-30">
                    <div className="menu-label"> {/* paragraph tag */}
                        <ul className="menu-list">
                            <li>
                                <Link to="/">
                                    <img  alt="jsx-a11y/alt-text"  src={props.logo} style={logoStyle} />
                                </Link>
                            </li>
                        </ul>
                    </div>
		
                    <ul className="menu-list" style={menuListStyle}>
                        <li><Link
                         to={{
                            pathname: 'dashboard'
                        }} className={dashboardActive}><i className="fas fa-columns"></i> Dashboard</Link></li>
                        <li><Link
                         to={{
                            pathname: 'documents'
                        }} className={documentActive}><i className="fas fa-file"></i> Documents</Link></li>
                        <li><NavLink to={{
                                        pathname:'shippments',
                                    }}
                                    className={shippmentActive}
                                    ><i className="fas fa-shipping-fast"></i> Shippments </NavLink></li>
                        <li><NavLink to={{
                                        pathname:'parcels',
                                    }}
                                    className={parcelActive}
                                    ><i className="fas fa-box"></i> Parcels </NavLink></li>
                        <li style={{position: 'relative'}}>
                            <NavLink to={{
                            pathname: 'notifications'
                        }} className={notificationsActive}>
                                <i className="fas fa-bell"></i> Notifications 
                                <span className="Button-badge" style={buttonBageStyle}
                                >100</span> 
                            </NavLink>
                        </li>
                        <li><NavLink to={{
                            pathname: 'profile'
                            }}
                            className={profileActive}
                        ><i className="fas fa-user-cog"></i> Settings </NavLink></li>
                        <li><Link to={{
                            pathname: 'logout'
                        }} className="navbar-item">
                                <i className="fas fa-sign-out-alt m-r-5"></i> Logout
                            </Link>
                        </li>
                    </ul>
                </aside>				
            </div>	
        </>
    )
}

export default withRouter(Navbar)