import React, {useState, useEffect} from 'react'
import { openOrCloseAccordions } from '../../../Actions/openOrCloseAccordions'
import {useForm} from 'react-hook-form'
import {fetchApi, POST, GET} from '../../../requests'
import { toast } from 'react-toastify'
import TableLoader from '../../../Loaders/TableLoader'
import Pagination from '../../../components/Pagination/Pagination'
import {Link} from 'react-router-dom'
import {slugify} from '../../../settings'

const Roles = () => {
    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState([])
    const [initialRoles, setInitialRoles] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState()
    const [initialTotalItems, setInitialTotalItems] = useState()
    const [searchLoading, setLoadingSearch] = useState(false)
  
    const {register, handleSubmit, formState, setError} = useForm({
        mode: "onTouched"
    })
    const {errors, isSubmitting} = formState
    useEffect(() => {
        async function fetchRoles () {
            setLoading(true)
            try {
                const results = await fetchApi(GET, `/roles?page=${currentPage}&per_page=${itemsPerPage}`)
                setTotalItems(results.data.data.total)
                setRoles(results.data.data.data)
                setInitialTotalItems(results.data.data.total)
                setInitialRoles(results.data.data.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                if(!error.response) {
                    toast.error('Ooops, check your internet connection!')
                } else if (error.response.status === 500) {
                    toast.error(error.response.message)
                }
                console.log(error)
            }
        }
        fetchRoles()
    }, [currentPage, itemsPerPage])

    const handlePageChange = (page) => {
        setRoles([])
        setLoading(true)
        setCurrentPage(page)
    }

    const handleItemsPerPage = (itemPerPage) => {
        setItemsPerPage(itemPerPage)
    }

    const onSubmit = async (formData) => {
        const name = slugify(formData.name)
        const newFormData = {...formData, name}
        try {
            await fetchApi(POST, "/roles/store", newFormData)
            toast.success('New role registered')
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

    const handleSearch = async (event) => {
        const value = event.target.value
        if (value.length >= 3) {
            setLoading(true)
            setLoadingSearch(true)
            try {
                const results = await fetchApi(GET, `/roles/${value}`)
                setTotalItems(results.data.data.total)
                setRoles(results.data.data.data)
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
            setRoles(initialRoles)
            setTotalItems(initialTotalItems)
        }
    }
  
    return (
        <>
            <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                    {/* <form> */}
                        <div className=""> {/* className = container */}
                            <button className="accordion" onClick={(event) => openOrCloseAccordions(event)}>Add a new Role</button>
                            <div className="accordion-box m-b-10">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="columns is-multiline">
                                        <div className="column">
                                            <div className="field">
                                                <label className="label">Name</label>
                                                <div className="control has-icons-right">
                                                    <input 
                                                        {...register("name", {
                                                            required: "Role name is required"
                                                        })}
                                                        className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                </div>
                                                {errors.name && <p className="help is-danger">{errors.name.message}</p>}
                                            </div>
                                        </div>
                                        <div className="column">
                                            <div className="field">
                                                <label className="label">Display Name</label>
                                                <div className="control has-icons-right">
                                                    <input 
                                                        {...register("display_name", {
                                                            required: "Role display name is required"
                                                        })}
                                                        className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                </div>
                                                {errors.display_name && <p className="help is-danger">{errors.display_name.message}</p>}
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
                                                            required: "Role description is required"
                                                        })}
                                                        className="input is-success is-small is-fullwidth" type="text"/>
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
                            
                            <button className="accordion"> All Roles</button>
                            <div className="accordion-box m-b-10 is-open">
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
                                            <input className="input is-success is-rounded is-small is-fullwidth" type="text" onChange={(event) => handleSearch(event)} />
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
                                                    <th># users</th>
                                                    <th># permisions</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Display name</th>
                                                    <th>Description</th>
                                                    <th># users</th>
                                                    <th># permisions</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                { roles.map( role =>
                                                    <tr key={role.id}>
                                                        <th>{role.id}</th>
                                                        <td>{role.name}</td>
                                                        <td>{role.display_name}</td>
                                                        <td>{role.description}</td>
                                                        <td className="has-text-centered">{role.users_count}</td>
                                                        <td className="has-text-centered">{role.permissions_count}</td>
                                                        <td><Link to={"/edit_roles/" + role.id} style={{color: "#004a88", cursor: "pointer"}}><i className="fas fa-pencil-alt"></i></Link></td>
                                                        <td><span><i className="fas fa-eye"></i></span></td>
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

export default Roles