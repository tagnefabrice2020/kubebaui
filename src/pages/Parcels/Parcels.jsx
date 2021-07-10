import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Parcels extends Component {

    render(){
        return (
            <div className="container card-container shippement-container">
                <div className="tile is-ancestor is-horizontal">
                    <div className="tile m-t-20 is-6 is-flex-direction-column">
                        {/* <!-- Heading --> */}
                        <h2 className="title is-12" style={{fontSize: '30px'}}>Parcels</h2>
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
                            <Link to="/add_parcels" className="button is-small is-primary" >New parcel &nbsp; <i className="fas fa-plus"></i></Link>
                        </div>
                    </div>
                    <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                        <table className="table" style={{width: '100%'}}>
                            <thead>
                                {/* shipping type && scheduled pickup will use color code for the row */}
                                <tr>
                                    <th>#</th>
                                    <th>Owner</th>
                                    <th>Branch from</th>
                                    <th>Destination</th>
                                    <th>Price/($)</th>
                                    <th>Pickup price</th>
                                    <th>Parcel type</th>
                                    <th>Weight/(ibs)</th>
                                    <th>Content description</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>#</th>
                                    <th>Owner</th>
                                    <th>Branch from</th>
                                    <th>Destination</th>
                                    <th>Price</th>
                                    <th>Pickup price</th>
                                    <th>Parcel type</th>
                                    <th>Weight</th>
                                    <th>Content description</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                            <tbody>
                            <tr>
                                <th>1</th>
                                <td>John Doe</td>
                                <td>Bonaberi, Douala</td>
                                <td>Maroua</td>
                                <td className="has-text-centered"><span>20</span></td>
                                <td className="has-text-centered">0$</td>
                                <td><span><i className="fas fa-file"></i></span></td>
                                <td className="has-text-centered">4.5</td>
                                <td>Lorem ipsum do...</td>
                                <td><span><i className="fas fa-eye"></i></span></td>
                                <td><span className="bg-red"><i className="fas fa-times"></i></span></td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td>John Doe</td>
                                <td>Bonaberi, Douala</td>
                                <td>Maroua</td>
                                <td className="has-text-centered"><span>20</span></td>
                                <td className="has-text-centered">0$</td>
                                <td><span><i className="fas fa-file"></i></span></td>
                                <td className="has-text-centered">4.5</td>
                                <td>Lorem ipsum do...</td>
                                <td><span><i className="fas fa-eye"></i></span></td>
                                <td><span className="bg-red"><i className="fas fa-times"></i></span></td>
                            </tr>
                            <tr className="is-selected">
                                <th>3</th>
                                <td>John Doe</td>
                                <td>Bonaberi, Douala</td>
                                <td>Maroua</td>
                                <td className="has-text-centered"><span>20</span></td>
                                <td className="has-text-centered">0$</td>
                                <td><span><i className="fas fa-file"></i></span></td>
                                <td className="has-text-centered">4.5</td>
                                <td>Lorem ipsum do...</td>
                                <td><span><i className="fas fa-eye"></i></span></td>
                                <td><span className="bg-red"><i className="fas fa-times"></i></span></td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td>John Doe</td>
                                <td>Bonaberi, Douala</td>
                                <td>Maroua</td>
                                <td className="has-text-centered"><span>20</span></td>
                                <td className="has-text-centered">0$</td>
                                <td><span><i className="fas fa-file"></i></span></td>
                                <td className="has-text-centered">4.5</td>
                                <td>Lorem ipsum do...</td>
                                <td><span><i className="fas fa-eye"></i></span></td>
                                <td><span className="bg-red"><i className="fas fa-times"></i></span></td>
                            </tr> 
                        </tbody>
                    </table>                       
                </div>
            </div>
            <br/>
        </div>
        )
    }
}

export default Parcels