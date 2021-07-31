import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { openOrCloseAccordions } from '../../Actions/openOrCloseAccordions'
import { fetchApi, GET, POST, PATCH } from '../../requests'
import { useForm } from 'react-hook-form'
import TableLoader from '../../Loaders/TableLoader'
import Pagination from '../../components/Pagination/Pagination'
import { toast } from 'react-toastify'

const Branches = () => {
    const [branches, setBranches] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [intitialBranches, setInitialBranches] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [initialTotalItems, setInitialTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [searchLoading, setLoadingSearch] = useState(false)
    const [countries, setCountries] = useState([])
    const [numberOfCountries, setNumberOfCountries] = useState(0)

    useEffect (() => {
        async function fetchCountries () {
            try {
                const fetchCountries = await fetchApi(GET, "/getCountries")

                setCountries(fetchCountries.data.data)
                setNumberOfCountries(fetchCountries.data.data.length)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCountries()
    })

    useEffect(() => {
        async function fetchBranches () {
            try {
                setLoading(true)
                const results = await fetchApi(GET, `/branches?page=${currentPage}&per_page=${itemsPerPage}`)
                // set Branches
                setBranches(results.data.data.data)
                setTotalItems(results.data.data.total)
                setInitialBranches(results.data.data.data)
                setInitialTotalItems(results.data.data.total)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchBranches()
    }, [currentPage, itemsPerPage])

    const { register, handleSubmit, formState} = useForm({
        mode : "unTouched"
    })

    const handlePageChange = (page) => {
        setCountries([])
        setLoading(true)
        setCurrentPage(page)
    }

    const handleItemsPerPage = (itemPerPage) => {
        setLoading(true)
        setCurrentPage(1)
        setItemsPerPage(itemPerPage)
    }

    const {errors, isSubmitting} = formState

    const onSubmit = async (formData) => {
        try {
            await fetchApi(POST, "/branches/store", formData)
            toast.success('New branch registered')
            setCurrentPage(0)
            setCurrentPage(1)
        } catch (error) {
            setLoading(false)
            if(!error.response) {
                toast.error('Ooops, check your internet connection!')
            } else if (error.response.status === 500) {
                toast.error(error.response.message)
            }
        }
    }

    const handleSearch = async (event) => {
        const value = event.currentTarget.value
        setSearch(value)
        if (value.length >= 3) { 
            setLoading(true)
            setLoadingSearch(true)
            try {
                const results = await fetchApi(GET, `/branches/${value}`)
                setTotalItems(results.data.data.total)
                setBranches(results.data.data.data)
                setLoading(false)
                setLoadingSearch(false)
            } catch (error) {
                setLoadingSearch(false)
            } 
        } else if (value.length === 0) {
            setBranches(intitialBranches)   
            setTotalItems(initialTotalItems) 
        }
    }

    const handleBranchStatus = async (id, type) => {
        const newBranches = [...branches]
        const data = {
            "id": id,
            "type": type 
        }
        try {
            const results = await fetchApi(PATCH, "/branches/update", data)
            if (results.status === 204 || results.status === 200) {
                newBranches.map(branch => {
                    if (id === branch.id && type === "activate") {
                        return branch.status = "active"
                    } else if(type === "deactivate" && id === branch.id) {
                        return branch.status = "inactive"
                    }
                    return false
                })
            }
            setBranches(newBranches)
        } catch (error) {
            setBranches(newBranches)
            console.log(error)
        }
    } 
    

    return (
        <>
            <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                    {/* <form> */}
                        <div className=""> {/* className = container */}
                            <button className="accordion" onClick={(event) => openOrCloseAccordions(event)}>Add a new Branch</button>
                            <div className="accordion-content m-b-10">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Country</label>
                                            <div className="control">
                                                <div className="select is-small is-fullwidth">
                                                    <select
                                                        name="country"
                                                        {...register("country", {
                                                            required: "Country is required",
                                                        })}
                                                    >
                                                        <option disabled>Country</option>
                                                        {  numberOfCountries > 0 ? countries.map(country => {
                                                            return (
                                                                <option key={country.id} value={country.id}>{country.name}</option>
                                                            ) 
                                                        }) : null}
                                                    </select>
                                                </div>
                                            </div>
                                            { errors.country && <p className="help is-danger">{errors.country.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">City branch name</label>
                                            <div className="control">
                                                <input 
                                                    {...register("branch_name", {
                                                        required: "Branch name is required"
                                                    })}
                                                    name="branch_name"
                                                    className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                            </div>
                                            {errors.branch_name && <p className="help is-danger">{errors.branch_name.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Status</label>
                                            <div className="control">
                                                <div className="select is-fullwidth is-small">
                                                    <select name="status"
                                                        {...register("status", {
                                                            required: "Status is required"
                                                        })}
                                                    >
                                                        <option value="active">active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {errors.status && <p className="help is-danger">{errors.status.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <button className="button is-small is-primary" 
                                        disabled={isSubmitting}>Save</button>
                                        </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                            <button className="accordion"> All Branches</button>
                            <div className="accordion-conten m-b-10 is-open">
                                <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                                    <div className="tile is-parent is-flex-direction-row-reverse is-justify-content-space-between">
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
                                            <input className="input is-success is-rounded is-small is-fullwidth" value={search} onChange={(event) => handleSearch(event)} type="text" />
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
                                                    <th>Country</th>
                                                    <th>City</th>
                                                    <th>Status</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Country</th>
                                                    <th>City</th>
                                                    <th>Status</th>
                                                    <th></th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                { branches.map(branch => 
                                                    <tr key={branch.id}>
                                                        <th>{branch.id}</th>
                                                        <td>{branch.name}</td>
                                                        <td>{branch.city_branch_name}</td>
                                                        <td><span className={`${branch.status === "active" ? "active-status" : "inactive-status"}`}>{branch.status}</span></td>
                                                        <td>{ branch.status === "active" ? <span onClick={() => handleBranchStatus(branch.id, 'deactivate')} style={{color: "red", cursor:"pointer"}}>deactivate</span> : <span onClick={() => handleBranchStatus(branch.id, 'activate')} style={{color: "green", cursor:"pointer"}}>activate</span>}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table> }                   
                                    </div>
                                    <br />
                                    {!loading && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChange={handlePageChange} />}
                                </div>
                            </div>
                        </div>
                    {/* </form>                   */}
                </div>
            </div>
        </>
    )
}

export default Branches