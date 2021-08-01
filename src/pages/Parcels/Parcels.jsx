import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import BurgerBar from '../../components/Navbar/BurgerBar'
import { fetchApi, GET } from '../../requests'
import TableLoader from '../../Loaders/TableLoader'
import Pagination from '../../components/Pagination/Pagination'
import { toast } from 'react-toastify'

const Parcels = (props) => {
    const [parcels, setParcels] = useState([])
    const [initialParcels, setInititalParcels] = useState()
    const [totalItems, setTotalItems] = useState()
    const [initialTotalItems, setInitialTotalItems] = useState()
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [searchLoading, setLoadingSearch] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    useEffect(() => {
        async function getParcels () {
            try {
                setLoading(true)
                const results = search !== "" ? await fetchApi(GET, `/auth/admins/parcels/${search}/search?page=${currentPage}&per_page=${itemsPerPage}`) : await fetchApi(GET, `/auth/admins/parcels?page=${currentPage}&per_page=${itemsPerPage}`)
                setParcels(results.data.data.data)
                setInititalParcels(results.data.data.data)
                setTotalItems(results.data.data.total)
                setInitialTotalItems(results.data.data.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                if(!error.response) {
                    toast.error('Ooops, check your internet connection!')
                } else if (error.response.status === 500) {
                    toast.error(error.response.message)
                }
            }
        }
        getParcels()
    }, [currentPage, itemsPerPage, search])

    const handlePageChange = (page) => {
        setParcels([])
        setLoading(true)
        setCurrentPage(page)
    }

    const handleSearch = async (event) => {
        const value = event.currentTarget.value
        setSearch(value)
        if (value.length >= 2) { 
            setLoading(true)
            setLoadingSearch(true)
            try {
                const results = await fetchApi(GET, `/auth/admins/parcels/${value}/search?page=${currentPage}&per_page=${itemsPerPage}`)
                setTotalItems(results.data.data.total)
                setParcels(results.data.data.data)
                setLoading(false)
                setLoadingSearch(false)
            } catch (error) {
                setLoadingSearch(false)
            } 
        } else if (value.length === 0) {
            setParcels(initialParcels)   
            setTotalItems(initialTotalItems) 
        }
    }

    const handleItemsPerPage = (itemPerPage) => {
        setLoading(true)
        setCurrentPage(1)
        setItemsPerPage(itemPerPage)
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
                        <h2 className="title is-12 page-title" style={{fontSize: '30px'}}>Parcels</h2>
                    </div>
                    <div className="tile m-t-20 is-flex-direction-row-reverse">
                        {/* <!-- Form search --> */}
                        <div className="is-10">
                                <form method="get" action="">
                                    <p className={`control has-icons-right ${searchLoading === true && 'is-loading'}`}>
                                        <input type="text" name="search" value={search} onChange={(event) => handleSearch(event)} className="input is-small is-rounded" />
                                        <span className="icon is-small is-right">
                                            {!searchLoading && <i className="fa fa-search"></i>}
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
                        <div className="tile is-child is-flex-direction-row is-justify-content-space-between" style={{position: 'relative'}}>
                            <div className="control" style={{position: 'absolute', right: '0px'}}>
                                <div className="select is-small">
                                    <select onChange={(event) => handleItemsPerPage(event.target.value)} defaultValue={5}>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                        {loading && <TableLoader />}
                        {!loading && <table className="table" style={{width: '100%'}}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Owner</th>
                                    <th>Branch from</th>
                                    <th>Destination</th>
                                    <th>Price/($)</th>
                                    <th>Parcel type</th>
                                    <th>Weight/(ibs)</th>
                                    <th>Content description</th>
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
                                    <th>Parcel type</th>
                                    <th>Weight</th>
                                    <th>Content description</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {parcels.map(parcel => 
                                    <tr key={parcel.id}>
                                        <th>{parcel.id}</th>
                                        <td>{parcel.first_name} {parcel.last_name}</td>
                                        <td>{parcel.city_branch_name}</td>
                                        <td>{parcel.to_branch_name}</td>
                                        <td className="has-text-centered"><span>{parcel.price}</span></td>
                                        <td>{parcel.type}</td>
                                        <td className="has-text-centered">{parcel.weight}</td>
                                        <td title={parcel.content_description}>{parcel.content_description.length > 13 ? parcel.content_description.substr(0, 12) + `...`: parcel.content_description}</td>
                                        <td><Link to={`/show_parcel/` + parcel.id}><i className="fas fa-eye" style={{color: "#004a88", cursor: "pointer"}}></i></Link></td>
                                    </tr>
                                )}
                            </tbody>
                        </table> }                    
                    </div>
                </div>
                <br/>
                {!loading && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChange={handlePageChange} />}
            </div>
        </div>
    </div>   
    )
}

export default Parcels