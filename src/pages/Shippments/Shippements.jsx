import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import BurgerBar from '../../components/Navbar/BurgerBar'

const Shippements = (props) => {
    return (
        <div style={{display: 'flex'}}>	
            <Navbar logo={ props.logo } onLogout={props.onLogout} isAuthenticated={props.isAuthenticated} />
            <div className="main-content" id="main-content">
                <BurgerBar logo={props.logo}/>
                <div className="container card-container shippement-container">
                    <div className="tile is-ancestor is-horizontal">
                        <div className="tile m-t-20 is-6 is-flex-direction-column">
                            {/* <!-- Heading --> */}
                            <h2 className="title is-12" style={{fontSize: '30px'}}>Shippments</h2>
                        </div>
                        <div className="tile m-t-20 is-flex-direction-row-reverse">
                            {/* <!-- Form search --> */}
                            <div className="is-10">
                                <form method="get" action="">
                                    <p className="control has-icons-right custom-search-form-padding">
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
                                <Link to="/add_shipment" className="button is-small is-primary" >New shippment &nbsp; <i className="fas fa-plus"></i></Link>
                            </div>
                        </div>
                        <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                            <table className="table" style={{width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>From</th>
                                        <th>Destination</th>
                                        <th>Status</th>
                                        <th>Start Date</th>
                                        <th>Arrival date</th>
                                        <th>Quantity</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>From</th>
                                        <th>Destination</th>
                                        <th>Status</th>
                                        <th>Start Date</th>
                                        <th>Arrival date</th>
                                        <th>Quantity</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>New York, USA</td>
                                    <td>Bonaberi, Doauala</td>
                                    <td><span>in progress</span></td>
                                    <td>Friday 08, Jul 2021</td>
                                    <td>Saturday 09, Jul 2021</td>
                                    <td className="has-text-centered">24</td>
                                    <td><a href="button is-small">Senders</a></td>
                                    <td><a href="button is-small">Recipients</a></td>
                                    <td><span className="bg-red"><i className="fas fa-eye"></i></span></td>
                                    <td><span className="bg-red"><i className="fas fa-times"></i></span></td>
                                </tr>
                                <tr className="">
                                    <th>2</th>
                                    <td>New York, USA</td>
                                    <td>Bonaberi, Doauala</td>
                                    <td><span>in progress</span></td>
                                    <td>Friday 08, Jul 2021</td>
                                    <td>Saturday 09, Jul 2021</td>
                                    <td className="has-text-centered">24</td>
                                    <td><a href="button is-small">Senders</a></td>
                                    <td><a href="button is-small">Recipients</a></td>
                                    <td><span className="bg-red"><i className="fas fa-eye"></i></span></td>
                                    <td><span className="bg-red"><i className="fas fa-times"></i></span></td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>New York, USA</td>
                                    <td>Bonaberi, Doauala</td>
                                    <td><span>in progress</span></td>
                                    <td>Friday 08, Jul 2021</td>
                                    <td>Saturday 09, Jul 2021</td>
                                    <td className="has-text-centered">24</td>
                                    <td><a href="button is-small">Senders</a></td>
                                    <td><a href="button is-small">Recipients</a></td>
                                    <td><span className="bg-red"><i className="fas fa-eye"></i></span></td>
                                    <td><span className="bg-red"><i className="fas fa-times"></i></span></td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td>New York, USA</td>
                                    <td>Bonaberi, Doauala</td>
                                    <td><span>in progress</span></td>
                                    <td>Friday 08, Jul 2021</td>
                                    <td>Saturday 09, Jul 2021</td>
                                    <td className="has-text-centered">24</td>
                                    <td><a href="button is-small">Senders</a></td>
                                    <td><a href="button is-small">Recipients</a></td>
                                    <td><span className="bg-red"><i className="fas fa-eye"></i></span></td>
                                    <td><span className="bg-red"><i className="fas fa-times"></i></span></td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td>New York, USA</td>
                                    <td>Bonaberi, Doauala</td>
                                    <td><span>in progress</span></td>
                                    <td>Friday 08, Jul 2021</td>
                                    <td>Saturday 09, Jul 2021</td>
                                    <td className="has-text-centered">24</td>
                                    <td><a href="button is-small">Senders</a></td>
                                    <td><a href="button is-small">Recipients</a></td>
                                    <td><span className="bg-red"><i className="fas fa-eye"></i></span></td>
                                    <td><span className="bg-red"><i className="fas fa-times"></i></span></td>
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

export default Shippements