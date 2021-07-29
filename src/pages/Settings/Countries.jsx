import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { fetchApi, PATCH } from "../../requests"
import { GET } from "../../requests"
import Pagination from "../../components/Pagination/Pagination"
import TableLoader from "../../Loaders/TableLoader"

const Countries = () => {
    const [countries, setCountries] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0) // total items per page
    const [initialTotalItems, setInitialTotalItems] = useState(0) // copy intial items per page
    const [loading, setLoading] = useState(true) // set table loading page 
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [search, setSearch] = useState("") // 
    const [searchLoading, setLoadingSearch] = useState(false)
    const [initialCountries, setInitialCountries] = useState([]) // copy initial countries

    useEffect(() => {
        async function fetchCountries () {
            try {
                const results = await fetchApi(GET, `/countries?page=${currentPage}&per_page=${itemsPerPage}`)
                setTotalItems(results.data.data.total)
                setCountries(results.data.data.data)
                setInitialCountries(results.data.data.data)
                setInitialTotalItems(results.data.data.total)
                setLoading(false)
            } catch(error) {
                setLoading(false)
            }
        }
        fetchCountries()
    }, [currentPage, itemsPerPage])

    const handleCountryStatus = async (id, type) => {
        const newCountries = [...countries]
        const data = {
            "id": id,
            "type": type  
        }
        try {
            //setLoadingSearch(true)
            const result =  await fetchApi(PATCH, `/countries/updateStatus`, data)
            if (result.status === 204 || result.status === 200) {
                newCountries.map((country) => {
                    if (type === "activate" && id === country.id) {
                        return country.status = "active"
                    } else if(type === "deactivate" && id === country.id) {
                        return country.status = "inactive"
                    }
                    return false
                })
                setCountries(newCountries)
            }
        } catch (error) {
            setCountries(newCountries)
            setLoadingSearch(false)
            console.log(error)
        }
    }

    const handlePageChange = (page) => {
        setCountries([])
        setLoading(true)
        setCurrentPage(page)
    }

    const handleSearch = async (event) => {
        const value = event.currentTarget.value
        setSearch(value)
        if (value.length >= 3) { 
            setLoading(true)
            setLoadingSearch(true)
            try {
                const results = await fetchApi(GET, `/countries/${value}`)
                setTotalItems(results.data.data.total)
                setCountries(results.data.data.data)
                setLoading(false)
                setLoadingSearch(false)
            } catch (error) {
                setLoadingSearch(false)
            } 
        } else if (value.length === 0) {
            setCountries(initialCountries)   
            setTotalItems(initialTotalItems) 
        }
    }

   // const paginatedCountries = Pagination.getData(countries, currentPage, itemsPerPage)

    const activeDesign = {
        color: "white",
        background: "#119032c9",
        padding: "2px 5px",
        fontSize: "x-small",
        borderRadius: "5px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
    }
    const inActiveDesign = {
        color: "white",
        background: "#ff0000c9",
        padding: "2px 5px",
        fontSize: "x-small",
        borderRadius: "5px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
    }

    const handleItemsPerPage = (itemPerPage) => {
        setLoading(true)
        setItemsPerPage(itemPerPage)
    }

    return (
        <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
            <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                {/* <form> */}
                    <div className=""> {/* className = container */}
                        <button className="accordion"> Countries</button>
                        <div className="m-b-10 is-open" style={{overflow: "none"}}>
                            <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                                <div className="tile is-parent is-flex-direction-row is-justify-content-space-between">
                                    <div className="control">
                                        <div className="select is-small">
                                            <select onChange={(event) => handleItemsPerPage(event.target.value)} defaultValue={5}>
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={15}>15</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={`control has-icons-right ${searchLoading === true && 'is-loading'}`}>
                                        <input className="input is-success is-rounded is-small is-fullwidth" onChange={handleSearch} value={search} type="text" />
                                        <span className="icon is-small is-right">
                                            {searchLoading === false && <i className="fas fa-search"></i>}
                                        </span>
                                    </div>
                                </div>
                                <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                                    {loading && <TableLoader />}
                                    {!loading && <table className="table" style={{width: "100%", overflow: "hidden"}}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>ISO</th>
                                                <th>ISO 3</th>
                                                <th>Name</th>
                                                <th>Phone code</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>#</th>
                                                <th>ISO</th>
                                                <th>ISO 3</th>
                                                <th>Name</th>
                                                <th>Phone code</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            {countries.map(country => 
                                                <tr key={country.id}>
                                                    <th>{country.id}</th>
                                                    <td>{country.iso}</td>
                                                    <td>{country.iso3}</td>
                                                    <td>{country.name}</td>
                                                    <td className="has-text-centered">{country.phonecode}</td>
                                                    <td><span style={country.status === "active" ? activeDesign : inActiveDesign}>{country.status}</span></td>
                                                    <td>{ country.status === "active" ? <span onClick={() => handleCountryStatus(country.id, 'deactivate')} style={{color: "red", cursor:"pointer"}}>deactivate</span> : <span onClick={() => handleCountryStatus(country.id, 'activate')} style={{color: "green", cursor:"pointer"}}>activate</span>}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>   }                   
                                </div>
                                <br />
                                {!loading && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChange={handlePageChange} />}
                                <br/>
                            </div>
                        </div>
                    </div>
                {/* </form>                   */}
            </div>
        </div>
    )
}

export default Countries