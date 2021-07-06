import React from 'react'
import {Link} from 'react-router-dom'


const toggleMenuBugger = (event) => {
    var burgerMenu = document.getElementById("burger_menu")
    var sideBar = document.getElementById("side-menu")
    var mainContent =  document.getElementById("main-content")

    if (!burgerMenu.classList.contains("opened-menu")) {
        burgerMenu.classList.add("opened-menu")
        sideBar.classList.toggle('menu-closed')
        mainContent.classList.toggle("add-main-content-width")
    } else {
        burgerMenu.classList.remove("opened-menu")
        sideBar.classList.toggle('menu-closed')
        mainContent.classList.toggle("add-main-content-width")
    }
}

const toggleMenuBuggerMobile = (event) => {
    var burgerMenu = document.getElementById("burger_menu1")
    var sideBar = document.getElementById("side-menu")
    var mainContent =  document.getElementById("main-content")

    if (!burgerMenu.classList.contains("opened-menu")) {
        burgerMenu.classList.add("opened-menu")
        sideBar.classList.toggle('menu-closed')
        mainContent.classList.toggle("add-main-content-width")
    } else {
        burgerMenu.classList.remove("opened-menu")
        sideBar.classList.toggle('menu-closed')
        mainContent.classList.toggle("add-main-content-width")
    }
}

const logoStyle = {
    marginLeft: '50%', transform: 'translate(-55%)', height: '35px'
}

const BurgerBar = (props) => {
   
    return (
        <div className="container p-3 search-bar-container is-flex  is-flex-direction-row">
            <Link to="/">
                <img alt="jsx-a11y/alt-text" src={props.logo} style={logoStyle} className="main-logo-container"/>
            </Link>
            <div className="burger_menu opened-menu mobile-off" id="burger_menu" onClick={(event) => toggleMenuBugger(event)}>	
                <div className="burger_menu_meat"></div>	
            </div>
            <div className="burger_menu mobile-on" id="burger_menu1" onClick={(event) => toggleMenuBuggerMobile(event)}>	
                <div className="burger_menu_meat"></div>	
            </div>
        </div>
    )
}

export default BurgerBar