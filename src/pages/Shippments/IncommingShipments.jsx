import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import BurgerBar from '../../components/Navbar/BurgerBar'
import { fetchApi, GET} from '../../requests'
import Pagination from '../../components/Pagination/Pagination'
import TableLoader from '../../Loaders/TableLoader'

const IncommingShippements = (props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [shipments, setShipments] = useState([])
    const [totalItems, setTotalItems] = useState()
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [loading, setLoading] = useState(false)
    const [initialShipments, setInitialShipments] = useState([])
    const [initialTotalItems, setInitialTotalItems] = useState()

    useEffect(() => {
        async function getShipments (){
            try {
                setLoading(true)
                const results = await fetchApi(GET, `/shipment/inComingShipment?page=${currentPage}&per_page=${itemsPerPage}`)
                setTotalItems(results.data.data.total)
                setShipments(results.data.data.data)
                setInitialShipments(results.data.data.data)
                setInitialTotalItems(results.data.data.total)
                setLoading(false)
            } catch (error){
                setLoading(false)
            }
        }
        getShipments()
    },[currentPage, itemsPerPage])

    const handleItemsPerPage = (itemPerPage) => {
        setLoading(true)
        setCurrentPage(1)
        setItemsPerPage(itemPerPage)
    }

    const handlePageChange = (page) => {
        setShipments([])
        setLoading(true)
        setCurrentPage(page)
    }

    return (
        <div style={{display: 'flex'}}>	
            <Navbar logo={ props.logo } onLogout={props.onLogout} isAuthenticated={props.isAuthenticated} />
            <div className="main-content" id="main-content">
                <BurgerBar logo={props.logo}/>
                <div className="container card-container shippement-container">
                    <div className="tile is-ancestor is-horizontal">
                        <div className="tile m-t-20 is-6 is-flex-direction-column">
                            {/* <!-- Heading --> */}
                            <h2 className="title is-12" style={{fontSize: '20px'}}>Incoming shippments</h2>
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
                            {loading && <TableLoader />}
                            {!loading && <table className="table" style={{width: '100%'}}>
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
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {shipments.map((shipment, index) => 
                                        <tr key={shipment.id}>
                                            <th>{index + 1}</th>
                                            <td>{shipment.from}</td>
                                            <td>{shipment.destination}</td>
                                            <td><span>{shipment.status}</span></td>
                                            <td>{new Date(shipment.created_at).toLocaleDateString("en-US")}</td>
                                            <td>{shipment.arrival_date !== null ? new Date(shipment.arrival_date).toLocaleDateString("en-US"): 'stll to update'}</td>
                                            <td className="has-text-centered">{shipment.total_parcels}</td>
                                            <td><Link to={`/edit_shipments/${shipment.id}`}><i className="fas fa-pencil-alt" style={{color: "#004a88", cursor: "pointer"}}></i></Link></td>
                                            <td><Link to={`/show_incomming_shipments/${shipment.id}`}><i className="fas fa-eye" style={{color: "#004a88", cursor: "pointer"}}></i></Link></td>
                                        </tr>
                                        )}
                                </tbody>
                            </table> }                  
                        </div>
                        <br />
                        {!loading && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChange={handlePageChange} />}
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default IncommingShippements