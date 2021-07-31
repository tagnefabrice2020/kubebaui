import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { openOrCloseAccordions } from '../../Actions/openOrCloseAccordions'
import BurgerBar from '../../components/Navbar/BurgerBar'
import Navbar from '../../components/Navbar/Navbar'
import { fetchApi, GET, POST } from "../../requests" 
import TableLoader from "../../Loaders/TableLoader"
import Pagination from '../../components/Pagination/Pagination'


const Employees = (props) => {

    const [countries, setCountries] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedBranch, setSelectedBranch] = useState(null)
    const [branches, setBranches] = useState([])
    const [inititialBranches, setInitialBranches] = useState([])
    const [initialTotalItems, setInitialTotalItems] = useState(0)
    const [employees, setEmployees] = useState([])
    const [totalItems, setTotalItems] = useState()
    const [initialEmployees, setInitialEmployees] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [searchLoading, setLoadingSearch] = useState(false)

    useEffect(() => {
        async function fetchEmployees () {
            setLoading(true)
            try {
                const results = await fetchApi(GET, "/employees")
                console.log(results)
                setEmployees(results.data.data.data)
                setTotalItems(results.data.data.total)
                setInitialEmployees(results.data.data.data)
                setInitialTotalItems(results.data.data.total)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchEmployees()
    }, [])

    useEffect(() => {
        async function fetchCountries () {
            try {
                const fetchCountries = await fetchApi(GET, "/getCountries")
                setCountries(fetchCountries.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCountries()
    }, [])

    useEffect(() => {
        async function fetchBranches () {
            try {
                const fetchBranches= await fetchApi(GET, "/getBranches")
                //setBranches(fetchBranches.data.data)
                setInitialBranches(fetchBranches.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBranches()
    }, [])

    const handlePageChange = (page) => {
        setEmployees([])
        setLoading(true)
        setCurrentPage(page)
    }

    const {register, formState, handleSubmit} = useForm({
        mode: "onTouched"
    })

    const {errors, isSubmitting} = formState

    const onSubmit = async (formData) => {
        formData.country = parseInt(selectedCountry)
        formData.branch = selectedBranch.id
        console.log(formData)
        try {
           const results = await fetchApi(POST, "/employees/store", formData) 
           toast.success("Sucessfull added a new employee")
           console.log(results)
        } catch (error) {
            console.log(error.response.data.message.email)
            if (error.response.status === 422) {
                if(error.response.data.message.email)
                toast.error(error.response.data.message.email[0])    
            }
        }
    }

    const handleSearch = async (event) => {
        const value = event.target.value
        setSearch(value)
        if (value.length >= 2) { 
            setLoading(true)
            setLoadingSearch(true)
            try {
                const searchEmployees = await fetchApi(GET, `/employees/${value}`)
                setTotalItems(searchEmployees.data.data.total)
                setEmployees(searchEmployees.data.data.data)
                setLoading(false)
                setLoadingSearch(false)
            } catch (error) {
                setLoading(false)
                setLoadingSearch(false)
                console.log(error.response)
            }
        } else if (value.length === 0) {
            setEmployees(initialEmployees)
            setTotalItems(initialTotalItems)
        }
    }

    const handleItemsPerPage = (itemPerPage) => {
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
                            <h2 className="title is-12" style={{fontSize: '30px'}}>Employees</h2>
                        </div>
                    </div>
                    <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                        <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                            {/* <form> */}
                                <div className=""> {/* className = container */}
                                    <button className="accordion" onClick={(event) => openOrCloseAccordions(event)}>Add a new Employee</button>
                                    <div className="accordion-content m-b-10">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="columns is-multiline">
                                                <div className="column">
                                                    <div className="field">
                                                        <label className="label">First name</label>
                                                        <div className="control has-icons-right">
                                                            <input 
                                                                {...register("first_name", {
                                                                    required: "First name is required"
                                                                })}
                                                                className={`input ${!errors.first_name && "is-success"} ${errors.first_name && "is-danger"} is-small is-fullwidth`} type="text" placeholder="" />
                                                            <span className="icon is-small is-right">
                                                            {errors.first_name && <i className="fas fa-exclamation is-red"></i>}
                                                            </span>
                                                        </div>
                                                        {errors.first_name && <p className="help is-danger">{errors.first_name.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="column">
                                                    <div className="field">
                                                        <label className="label">Last name</label>
                                                        <div className="control has-icons-right">
                                                            <input 
                                                                {...register("last_name", {
                                                                    required: "Last name is required"
                                                                })}
                                                                className={`input ${!errors.last_name && "is-success"} ${errors.last_name && "is-danger"} is-small is-fullwidth`} type="text" placeholder="" />
                                                            <span className="icon is-small is-right">
                                                                {errors.last_name && <i className="fas fa-exclamation is-red"></i>}
                                                            </span>
                                                        </div>
                                                        {errors.last_name && <p className="help is-danger">{errors.last_name.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="columns is-multiline">
                                                <div className="column">
                                                    <div className="field">
                                                        <label className="label">Country</label>
                                                        <div className="control has-icons-right">
                                                            <div className="select is-fullwidth is-small">
                                                                <select name="country" onChange={(event) => { 
                                                                    setSelectedCountry(event.target.value)
                                                                    const newSelectedBranches = [...inititialBranches]
                                                                    const selected = newSelectedBranches.filter(branch => {
                                                                        return parseInt(branch.country_id) === parseInt(event.target.value)
                                                                    })
                                                                    setBranches(selected)
                                                                    setSelectedBranch(branches[0])
                                                                }}
                                                                    >
                                                                        {countries.map(country => {
                                                                            return (
                                                                                <option key={country.id} value={country.id}>{country.name}</option>
                                                                            )
                                                                        })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {errors.country && <p className="help is-danger">{errors.country.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="column">
                                                    <div className="field">
                                                        <label className="label">Branch</label>
                                                        <div className="control has-icons-right">
                                                            <div className="select is-fullwidth is-small">
                                                                <select name="branch" disabled={selectedCountry === null ? true : false}
                                                                      onChange={(event) => {setSelectedBranch(event.target.value)}}
                                                                        {...register("branch", {
                                                                            required: "Branch is required"
                                                                        })}
                                                                    >
                                                                        {branches.map(branch => {
                                                                        return (
                                                                            <option key={branch.id} value={branch.id}>{branch.city_branch_name}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {errors.branch && <p className="help is-danger">{errors.branch.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="columns is-multiline">
                                                <div className="column">
                                                    <div className="field">
                                                        <label className="label">Email</label>
                                                        <div className="control has-icons-right">
                                                            <input 
                                                                {...register("email", {
                                                                    required: "Email is required",
                                                                    pattern: {
                                                                        value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                                        message: "Please enter a valid email."
                                                                    }
                                                                })}
                                                                className={`input ${!errors.email && "is-success"} ${errors.email && "is-danger"} is-small is-fullwidth`} type="text" placeholder="" />
                                                            <span className="icon is-small is-right">
                                                                {errors.email && <i className="fas fa-exclamation is-red"></i>}
                                                            </span>
                                                        </div>
                                                        {errors.email && <p className="help is-danger">{errors.email.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="column">
                                                    <div className="field">
                                                        <label className="label">Date of birth</label>
                                                        <div className="control has-icons-right">
                                                            <input 
                                                                {...register("date_of_birth", {
                                                                    required: "Date of birth is required"
                                                                })}
                                                                className="input is-small" type="date" />
                                                        </div>
                                                        {errors.date_of_birth && <p className="help is-danger">{errors.date_of_birth.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="columns is-multiline">
                                                <div className="column">
                                                    <div className="field">
                                                        <label className="label">Phone number</label>
                                                        <div className="control has-icons-right">
                                                            <input 
                                                                {...register("phone_number", {
                                                                    required: "Phone number is required",
                                                                    pattern: {
                                                                        value: /^\d+$/,
                                                                        message: "Please enter a valid phone number." 
                                                                    }
                                                                })}
                                                                className={`input ${!errors.phone_number && "is-success"} ${errors.phone_number && "is-danger"} is-small`} type="text" />
                                                            <span className="icon is-small is-right">
                                                                {errors.phone_number && <i className="fas fa-exclamation is-red"></i>}
                                                            </span>
                                                        </div>
                                                        {errors.phone_number && <p className="help is-danger">{errors.phone_number.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="column">
                                                    <div className="field">
                                                        <label className="label">Status</label>
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
                                                        {errors.status && <p className="help is-danger">{errors.status.message}</p>}
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
                                    <button className="accordion"> All Employees</button>
                                    <div className="accordion-conten m-b-10 is-open">
                                        <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                                            <div className="tile is-parent is-flex-direction-row is-justify-content-space-between">
                                                <div className="control">
                                                    <div className="select is-small">
                                                        <select onChange={(event) => handleItemsPerPage(event.target.value)} defaultValue={5}>
                                                            <option selected value={5}>5</option>
                                                            <option value={10}>10</option>
                                                            <option value={15}>15</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={`control has-icons-right ${searchLoading === true && 'is-loading'}`}>
                                                    <input className="input is-success is-rounded is-small is-fullwidth" type="text" value={search} onChange={(event) => handleSearch(event)} />
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
                                                            <th>Branch</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Status</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tfoot>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Country</th>
                                                            <th>Branch</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Status</th>
                                                            <th></th>
                                                        </tr>
                                                    </tfoot>
                                                    <tbody>
                                                        {employees.map(employee => 
                                                            <tr key={employee.id}>
                                                                <th>{employee.id}</th>
                                                                <td>{employee.name} </td>
                                                                <td>{employee.city_branch_name}</td>
                                                                <td>{employee.first_name} {employee.last_name}</td>
                                                                <td>{employee.email}</td>
                                                                <td><span className={`${employee.status === "active" ? "active-status" : "inactive-status"}`}>{employee.status}</span></td>
                                                                <td><Link to={"/show_employee/" + employee.id} style={{color: "#004a88", cursor: "pointer"}}><i className="fas fa-eye"></i></Link> </td>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Employees