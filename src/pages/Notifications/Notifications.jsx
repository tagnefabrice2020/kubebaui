import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BurgerBar from '../../components/Navbar/BurgerBar'
const Notifications = (props) => {
    return (
        <div style={{display: 'flex'}}>	
            <Navbar logo={ props.logo } onLogout={props.onLogout} isAuthenticated={props.isAuthenticated} />
            <div className="main-content" id="main-content">
                <BurgerBar logo={props.logo}/>
                <div className="container card-container notification-container">
                <div className="tile is-ancestor is-horizontal">
                    <div className="tile m-t-20 is-6 is-flex-direction-column">
                        {/* <!-- Heading --> */}
                        <h2 className="title is-12 page-title" style={{fontSize: '30px'}}>Notifications</h2>
                    </div>
                    <div className="tile m-t-20 is-flex-direction-row-reverse">
                        {/* <!-- Form search --> */}
                        <div className="is-10">
                                <form method="get" action="">
                                    <p className="control has-icons-right">
                                        <input type="text" name="search" className="input is-small is-rounded" />
                                        <span className="icon is-small is-right">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </p>
                                </form>
                            </div>
                    </div>
                </div>
                <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                    <div className="tile is-parent">
                        <div className="tile is-child">
                            <button className="button is-small is-primary" >Clear &nbsp;<i className="fas fa-eraser"></i></button>
                        </div>
                    </div>
                    <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                        <table className="table" style={{width: '100%'}}>
                            <tbody>
                                <tr>
                                    <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium corporis 
                                        voluptatum quod ad reiciendis ab, eaque tempora deleniti architecto facere doloremque asperiores 
                                        veniam rem similique voluptatibus blanditiis minima saepe cum?</td>
                                    <td><span><i className="fas fa-eye"></i></span></td>
                                    <td><span><i className="fas fa-trash"></i></span></td>
                                </tr>
                                <tr>
                                    <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium corporis 
                                        voluptatum quod ad reiciendis ab, eaque tempora deleniti architecto facere doloremque asperiores 
                                        veniam rem similique voluptatibus blanditiis minima saepe cum?</td>
                                    <td><span><i className="fas fa-eye"></i></span></td>
                                    <td><span><i className="fas fa-trash"></i></span></td>
                                </tr>
                                <tr>
                                    <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium corporis 
                                        voluptatum quod ad reiciendis ab, eaque tempora deleniti architecto facere doloremque asperiores 
                                        veniam rem similique voluptatibus blanditiis minima saepe cum?</td>
                                    <td><span><i className="fas fa-eye"></i></span></td>
                                    <td><span><i className="fas fa-trash"></i></span></td>
                                </tr>
                                <tr>
                                    <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium corporis 
                                        voluptatum quod ad reiciendis ab, eaque tempora deleniti architecto facere doloremque asperiores 
                                        veniam rem similique voluptatibus blanditiis minima saepe cum?</td>
                                    <td><span><i className="fas fa-eye"></i></span></td>
                                    <td><span><i className="fas fa-trash"></i></span></td>
                                </tr>
                                <tr>
                                    <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium corporis 
                                        voluptatum quod ad reiciendis ab, eaque tempora deleniti architecto facere doloremque asperiores 
                                        veniam rem similique voluptatibus blanditiis minima saepe cum?</td>
                                    <td><span><i className="fas fa-eye"></i></span></td>
                                    <td><span><i className="fas fa-trash"></i></span></td>
                                </tr>  
                            </tbody>
                        </table>                       
                    </div>
                </div>
                <br/>
            </div>
            </div>
        </div>
    )
}

export default Notifications