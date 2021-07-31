import React, {useState, useEffect} from 'react'
import { openOrCloseAccordions } from '../../../Actions/openOrCloseAccordions'
import TableLoader from '../../../Loaders/TableLoader'
import { fetchApi, GET, POST } from '../../../requests'
import Pagination from '../../../components/Pagination/Pagination'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {slugify} from '../../../settings'

const Permissions = () => {
    const [permissions, setPermissions] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [initialTotalItems, setInitialTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [initialPermissions, setInitialPermissions] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchLoading, setLoadingSearch] = useState(false)
    const [search, setSearch] = useState("")

    const { register, handleSubmit, setError, formState} = useForm({
        mode : "unTouched"
    })

    const {errors, isSubmitting} = formState

    useEffect(() => {
        async function fetchPermissions () {
            setLoading(true)
            try {
                const results = await fetchApi(GET, `/permissions?page=${currentPage}&per_page=${itemsPerPage}`)
                setPermissions(results.data.data.data)
                setTotalItems(results.data.data.total)
                setInitialPermissions(results.data.data.data)
                setInitialTotalItems(results.data.data.total)
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
        fetchPermissions() 
    }, [currentPage, itemsPerPage])

    const handlePageChange = (page) => {
        setPermissions([])
        setLoading(true)
        setCurrentPage(page)
    }

    const handleItemsPerPage = (itemPerPage) => {
        setLoading(true)
        setCurrentPage(1)
        setItemsPerPage(itemPerPage)
    }

    const handleSearch = async (event) => {
        const value = event.target.value
        setSearch(value)
        if (value.length >= 3) {
            setLoading(true)
            setLoadingSearch(true)
            try {
                const results = await fetchApi(GET, `/permissions/${value}`)
                setTotalItems(results.data.data.total)
                setPermissions(results.data.data.data)
                setLoading(false)
                setLoadingSearch(false)
            } catch (error) {
                setLoading(false)
                setLoadingSearch(false)
                if(!error.response) {
                    toast.error('Ooops, check your internet connection!')
                }
            }
        } else if (value.length === 0) {
            setPermissions(initialPermissions)
            setTotalItems(initialTotalItems)
        }
    }

    const onSubmit = async (formData) => {
        const name = slugify(formData.name)
        const newFormData = {...formData, name}
        try {
            await fetchApi(POST, "/permissions/store", newFormData)
            toast.success('New permission registered')
            setCurrentPage(0)
            setCurrentPage(1)
        } catch (error) {
            setLoading(false)
            if(!error.response) {
                toast.error('Ooops, check your internet connection!')
            } else if (error.response.status === 500) {
                toast.error(error.response.message)
            } else if(error.response.status === 422) {
                if (error.response.data.message.name) {
                    setError('name', {
                        message: error.response.data.message.name[0]
                    })
                }  
            }
        }
    }



    return (
        <>
            <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow" id="permissions">
                <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                    {/* <form> */}
                        <div className=""> {/* className = container */}
                            <button className="accordion" onClick={(event) => openOrCloseAccordions(event)}>Add a new Permission</button>
                            <div className="accordion-box m-b-10">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="columns is-multiline">
                                        <div className="column">
                                            <div className="field">
                                                <label className="label">Name</label>
                                                <div className="control ">
                                                    <input 
                                                        {...register("name", {
                                                            required: "Permission name is required"
                                                        })}
                                                        className="input is-success is-small is-fullwidth" 
                                                        type="text"/>
                                                </div>
                                                {errors.name && <p className="help is-danger">{errors.name.message}</p>}
                                            </div>
                                        </div>
                                        <div className="column">
                                            <div className="field">
                                                <label className="label">Display Name</label>
                                                <div className="control has-icons-right">
                                                    <input 
                                                        className="input is-success is-small is-fullwidth" 
                                                        type="text"
                                                        {...register("display_name", {
                                                            required: "Permission display name is required"
                                                        })}
                                                    />
                                                </div>
                                                { errors.display_name && <p className="help is-danger">{errors.display_name.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="columns is-multiline">
                                        <div className="column">
                                            <div className="field">
                                                <label className="label">Description</label>
                                                <div className="control">
                                                    <textarea 
                                                        className="input is-success is-small is-fullwidth" 
                                                        type="text"
                                                        {...register("description", {
                                                            required: "Permission description is required"
                                                        })}
                                                    />
                                                </div>
                                                { errors.description && <p className="help is-danger">{errors.description.message}</p>}
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
                            <button className="accordion"> All Permissions</button>
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
                                            <input className="input is-success is-rounded is-small is-fullwidth" defaultValue={search} onChange={(event) => handleSearch(event)} type="text" />
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
                                                    <th>Name</th>
                                                    <th>Display name</th>
                                                    <th>Description</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Display name</th>
                                                    <th>Description</th>
                                                    <th></th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                { permissions.map(permission => 
                                                    <tr key={permission.id}>
                                                        <th>{permission.id}</th>
                                                        <td>{permission.name} </td>
                                                        <td>{permission.display_name}</td>
                                                        <td>{permission.description}</td>
                                                        <td><Link to={"/edit_permissions/" + permission.id}><i className="fas fa-pencil-alt" style={{color: "#004a88", cursor: "pointer"}}></i></Link></td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>   }                    
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

export default Permissions