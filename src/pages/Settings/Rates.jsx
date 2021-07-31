import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { DELETE, fetchApi, GET, POST} from '../../requests'
import { useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import TableLoader from '../../Loaders/TableLoader'
import { Link } from 'react-router-dom'  
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const Rates = () => {
    const [branches, setBranches] = useState([])

    const [selectedFromBranch, setSelectedFromBranch] = useState("")
    const [selectedToBranch, setSelectedToBranch] = useState("")

    const [branchErrorsFrom, setBranchErrorFrom] = useState(false)
    const [branchErrorsTo, setBranchErrorTo] = useState(false)

    const [rates, setRates] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const [totalItems, setTotalItems] = useState(0)
    const [searchLoading, setLoadingSearch] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [initialTotalItems, setInitialTotalItems] = useState(0)

    const [intitialRates, setInitialRates] = useState([])

    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    

    useEffect(() => {
        async function fetchBranches () {
            try {
                const results = await fetchApi(GET, "/getBranches")
                setBranches(results.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBranches()
    }, [])

    useEffect(() => {
        async function fetchRates () {
            setLoading(true)
            try {
                const results = await fetchApi(GET, "/rates")
                setRates(results.data.data.data)
                setTotalItems(results.data.data.total)
                setLoading(false)
                setInitialRates(results.data.data.data)
                setInitialTotalItems(results.data.data.total)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        fetchRates()
    }, [currentPage])

    const {register, handleSubmit, formState} = useForm({
        mode: "onTouched"
    })

    const handleItemsPerPage = (itemPerPage) => {
        setLoading(true)
        setCurrentPage(1)
        setItemsPerPage(itemPerPage)
    }

    const {errors, isSubmitting} = formState

    const onSubmit = async (formData) => {
        formData.branch_from_id = selectedFromBranch
        formData.branch_to_id = selectedToBranch

        if(formData.branch_from_id !== "" && formData.branch_to_id !== "") {
            try {
                await fetchApi(POST, "/rates/store", formData)
                setBranchErrorFrom(false)
                setBranchErrorTo(false) 
                // get items per page and totalItems and compate them
                setCurrentPage(0)
                setCurrentPage(1)
                // toast notification
                toast.success("Succesfully added a new rate")
            } catch (error) {
                setLoading(false)
                if(!error.response) {
                    toast.error('Ooops, check your internet connection!')
                } else if (error.response.status === 500) {
                    toast.error(error.response.message)
                } else if(error.response.status === 422) {
                     
                }
            }
        } else {
            console.log("error with the branches")
            if(formData.branch_from_id === "") {
                setBranchErrorFrom(true)
            }
            if(formData.branch_from_id === "") {
                setBranchErrorTo(true) 
            }
            toast.error("Please the branches for where not seleted")
        }
    }

    const handlePageChange = (page) => {
        setRates([])
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
                const results = await fetchApi(GET, `/searchRates/${value}`)
                setTotalItems(results.data.data.total)
                setRates(results.data.data.data)
                setLoading(false)
                setLoadingSearch(false)
            } catch (error) {
                setLoadingSearch(false)
            } 
        } else if (value.length === 0) {
            setRates(intitialRates)   
            setTotalItems(initialTotalItems) 
        }
    }

    const handleDelete = async (id) => {
        try {
            const results = await fetchApi(DELETE, `/rate/delete/${id}`)
            console.log(results.status)
            if (results.status === 200) {
                const newRates = rates.filter(rate => {
                    return rate.id !== id
                })
                setRates(newRates)
                const oldTotalItems = initialTotalItems
                setTotalItems(oldTotalItems - 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
            <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                {/* <form> */}
                    <div className=""> {/* className = container */}
                        <button className="accordion">Add a new Rate</button>
                        <div className="accordion-box m-b-10">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Branch From</label>
                                            <div className="control">
                                                <div className="select is-fullwidth is-small">
                                                    <select name="branch_from_id" defaultValue={selectedFromBranch}
                                                        onChange={(event) => setSelectedFromBranch(event.target.value)}
                                                      
                                                        >
                                                        <option value="">Select from branch</option>
                                                        {branches.map((branch) => {
                                                            return (
                                                                <option key={branch.id} value={branch.id} disabled={parseInt(selectedToBranch) === parseInt(branch.id) ? true : false}>{branch.city_branch_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            {branchErrorsFrom === true && <p className="help is-danger">Branch from is required</p>}
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Branch To</label>
                                            <div className="control has-icons-right">
                                                <div className="select is-fullwidth is-small">
                                                    <select name="branch_to_id" defaultValue={selectedToBranch}
                                                        onChange={(event) => setSelectedToBranch(event.target.value)}
                                                        >
                                                        <option value="">Select to branch</option>
                                                        {branches.map(branch => {
                                                            return (
                                                                <option key={branch.id} value={branch.id} disabled={parseInt(selectedFromBranch) === parseInt(branch.id) ? true:false}>{branch.city_branch_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {branchErrorsTo === true && <p className="help is-danger">Branch to is required</p>}
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Weight</label>
                                            <div className="control has-icons-right">
                                                <input 
                                                    className="input is-success is-small is-fullwidth" 
                                                    type="number" 
                                                    {...register("parcel_weight", {
                                                        required: "Parcel weight required"
                                                    })} 
                                                    min="1"
                                                />
                                                <span className="icon is-small is-right">
                                                </span>
                                            </div>
                                            {errors.parcel_weight && <p className="help is-danger">{errors.parcel_weight.message}</p>}
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Price</label>
                                            <div className="control has-icons-right">
                                                <input 
                                                    className="input is-success is-small is-fullwidth" 
                                                    type="number" 
                                                    {...register("price", {
                                                        required : "Rate price required"
                                                    })}
                                                    min="1"
                                                />
                                                <span className="icon is-small is-right">
                                                </span>
                                            </div>
                                            {errors.price && <p className="help is-danger">{errors.price.message}</p>}
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Type</label>
                                            <div className="select is-fullwidth is-small">
                                                <select name="type" 
                                                    onChange={(event) => setSelectedFromBranch(event.target.value)}
                                                    {...register("type", {
                                                        required : "Parcel type required"
                                                    })}
                                                >
                                                    <option value="documents">Documents</option>
                                                    <option value="products">Products</option>
                                                </select>
                                            </div>
                                            {errors.type && <p className="help is-danger">{errors.type.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Description</label>
                                            <div className="control">
                                                <textarea 
                                                    {...register("description", {
                                                        required: "Rate description is required"
                                                    })}
                                                    className="input is-success is-small is-fullwidth" 
                                                    type="text" placeholder="" />
                                            </div>
                                            {errors.description && <p className="help is-danger">{errors.description.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                <div className="column">
                                    <div className="field">
                                        <button className="button is-small is-primary" disabled={isSubmitting}>Save</button>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                        <button className="accordion"> All Rates</button>
                        <div className="accordion-conten m-b-10 is-open">
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
                                        <input className="input is-success is-rounded is-small is-fullwidth" type="text" onChange={handleSearch} value={search} />
                                        <span className="icon is-small is-right">
                                            {searchLoading === false && <i className="fas fa-search"></i>}
                                        </span>
                                    </div>
                                </div>
                                <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                                    {loading && <TableLoader />}
                                    {!loading && <table className="table" style={{width: "100%"}}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Branch from</th>
                                                <th>Branch to</th>
                                                <th>Description</th>
                                                <th>Parcel weight/(ibs)</th>
                                                <th>Parcel type</th>
                                                <th>Price/($)</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>#</th>
                                                <th>Branch from</th>
                                                <th>Branch to</th>
                                                <th>Description</th>
                                                <th>Parcel weight/(ibs)</th>
                                                <th>Parcel type</th>
                                                <th>Price/($)</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            {rates.map(rate => 
                                                <tr key={rate.id}>
                                                    <th>{rate.id}</th>
                                                    <td>{rate.branch_from}</td>
                                                    <td>{rate.branch_to}</td>
                                                    <td>{rate.zone_description}</td>
                                                    <td className="has-text-centered">{rate.parcel_weight}</td>
                                                    <td>{rate.type}</td>
                                                    <td className="has-text-centered">{rate.price}</td>
                                                    <td><Link to={"/edit_rates/" + rate.id}><i className="fas fa-pencil-alt" style={{color: "#004a88", cursor: "pointer"}}></i></Link></td>
                                                    <td><span><i className="fas fa-times" style={{color: "red", cursor: "pointer"}} onClick={() => handleDelete(rate.id)}></i></span></td>
                                                </tr>
                                            )}  
                                        </tbody>
                                    </table>  }                     
                                </div>
                                {!loading && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChange={handlePageChange} />}
                            </div>
                        </div>
                    </div>
                {/* </form>                   */}
            </div>
        </div>
    )
}

export default Rates