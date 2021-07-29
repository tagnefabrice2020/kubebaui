import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'
import BurgerBar from '../../components/Navbar/BurgerBar'
import Navbar from '../../components/Navbar/Navbar'
import TableLoader from "../../Loaders/TableLoader"
import Pagination from '../../components/Pagination/Pagination'
import { fetchApi, GET, PATCH } from '../../requests'

const ShowEmployee = (props) => {

    const [activitiesCurrentPage, setActivitiesCurrentPage] = useState(1)
    const [activititesItemsPerPage, setActivitiesItemsPerPage] = useState(5)
    const [initialActivities, setInitialActivities] = useState([])
    const [activities, setActivities] = useState([])
    const [activityTotalItem, setActivityTotalItem] = useState()
    const [initialActivitiesTotalItems, setInitialActivityTotalItem] = useState(0)
    const [employee, setEmployee] = useState([])
    const [activitySearch, setActivitySearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [activityLoading, setActivitiesLoading] = useState(false)
    const [searchActivityLoading, setSearchActivityLoading] = useState(false)

    const { register, handleSubmit, formState} = useForm({
        mode : "unTouched"
    })

    const {errors, isSubmitting} = formState

    useEffect(() => {
        async function getEmployee() {
            if (props.match.params) { 
                try {
                    const results = await fetchApi(GET, `/employees/${props.match.params.id}/show`)
                    setEmployee(results.data.data)
                } catch (error) {
                    setLoading(false)
                    if (!error.response) {
                        toast.error('Ooops, check your internet connection!')
                    } else if(error.response.status === 404) {
                       props.history.push("/notFound")
                    }
                }
            }
        }
        getEmployee()
    }, [props.match.params, props.history])

    useEffect(() => {
        async function getUserActivities(){
            if (props.match.params) { 
                try {
                    setActivitiesLoading(true)
                    const results = activitySearch !== "" ? await fetchApi(GET, `/employees/${activitySearch}/activity`) : await fetchApi(GET, `/employees/${props.match.params.id}/activities?page=${activitiesCurrentPage}&per_page=${activititesItemsPerPage}`)
                   
                    setInitialActivities(results.data.data.data)
                    setActivities(results.data.data.data)
                    setActivityTotalItem(results.data.data.total)
                    setInitialActivityTotalItem(results.data.data.total)
                    setActivitiesLoading(false)
                } catch (error) {
                    setActivitiesLoading(true)
                    if (!error.response) {
                        toast.error('Ooops, check your internet connection or something else went wrong!')
                    } else if(error.response.status === 404) {
                       props.history.push("/notFound")
                    }
                }
            } 
        }
        getUserActivities()
    }, [activitiesCurrentPage, activititesItemsPerPage, activitySearch, props.history, props.match.params])

    const handleActivitiesPageChange = (page) => {
        setActivitiesLoading(true)
        setActivitiesCurrentPage(page)
    }

    const handleActivitiesItemsPerPage = (itemPerPage) => {
        setActivitiesItemsPerPage(itemPerPage)
    }
    

    const handleActivitySearch = async (event) => {
        const value = event.target.value
        setActivitySearch(value)
        if (value.length >= 2) { 
            setActivitiesLoading(true)
            setSearchActivityLoading(true)
            try {
                const searchEmployeeActivities = await fetchApi(GET, `/employees/${value}/activity/${props.match.params.id}`)
                setActivityTotalItem(searchEmployeeActivities.data.data.total)
                setActivities(searchEmployeeActivities.data.data.data)
                setActivitiesLoading(false)
                setSearchActivityLoading(false)
            } catch (error) {
                setActivitiesLoading(false)
                setSearchActivityLoading(false)
                console.log(error.response)
            }
        } else if (value.length === 0) {
            setActivities(initialActivities)
            setActivityTotalItem(initialActivitiesTotalItems)
        }
    }

    const onSubmitPersonalInformation = async (formData) => {
        try {
            // setPostLoading(true)
            await fetchApi(PATCH, `/employees/${props.match.params.id}/update`, formData)
            toast.success('Succesfully updated')
            setActivitiesItemsPerPage(0)
            setActivitiesItemsPerPage(1)
        } catch (error) {
            if (!error.response) {
                toast.error('Ooops, check your internet connection!')
            }
        }
    }


    return (
        <div style={{display: 'flex'}}>	
            <Navbar logo={ props.logo } onLogout={props.onLogout} isAuthenticated={props.isAuthenticated} />
            <div className="main-content" id="main-content">
                <BurgerBar logo={props.logo}/>
                <div className="container card-container shippement-container">
                    <div className="tile is-ancestor is-horizontal">
                        <div className="tile m-t-20 is-6 is-flex-direction-column">
                            <h2 className="title is-12" style={{fontSize: '30px'}}>Employee</h2>
                        </div>
                    </div>
                    <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                        <div className="tile is-ancestor is-horizontal m-t-10">
                            <div className="tile is-parent is-flex-grow-2 is-vertical custom-box">
                                <div className="tile is-child">
                                    <div className='profile-heading'>
                                        <div className='columns is-mobile is-multiline'>
                                            <div className='column is-4-tablet is-10-mobile name is-flex-grow-2'>
                                                <p>
                                                    <span className='title is-bold'>{employee.first_name ? employee.first_name.toLocaleUpperCase() : null} {employee.last_name ? employee.last_name.toLocaleUpperCase() : null}</span>
                                                    <br />
                                                    <button className='button is-primary is-small' id='edit-preferences' style={{margin: '5px 0'}}>
                                                    Edit Preferences
                                                    </button>
                                                    <br />
                                                </p>
                                            </div>
                                            <div className='column is-2-tablet is-4-mobile has-text-centered'>
                                                <p className='stat-val'>{employee.roles ? employee.roles.length : null}</p>
                                                <p className='stat-key'>Roles</p>
                                            </div>
                                            <div className='column is-2-tablet is-4-mobile has-text-centered'>
                                                <p className='stat-val'>{employee.permissions ? employee.permissions.length:null}</p>
                                                <p className='stat-key'>Permissions</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tile is-child">
                                    <form onSubmit={handleSubmit(onSubmitPersonalInformation)}>
                                        <div className="field">
                                            <h2 className="title">Personal Information</h2>
                                        </div>
                                        <div className="columns is-multiline">
                                            <div className="column">
                                                <div className="field">
                                                    <label className="label is-small">Legal Name</label>
                                                    <div className="control has-icons-left has-icons-right">
                                                        <input className="input is-small" type="text" defaultValue={employee.email ? employee.email : null} disabled/>
                                                        <span className="icon is-small is-left">
                                                            <i className="fas fa-user"></i>
                                                        </span>
                                                    </div>
                                                    {errors.email && <p className="help is-danger">{errors.email.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="columns is-multiline">
                                            <div className="column">
                                                <div className="field">
                                                    <label className="label is-small">Date of Birth</label>
                                                    <div className="control has-icons-left has-icons-right">
                                                        <input className="input is-small" type="date" {...register("date_of_birth", {
                                                            required: "Status is required"
                                                        })} defaultValue={employee.date_of_birth ? employee.date_of_birth : null} disabled={employee.identity_verified === 1 ? true:false}/>
                                                        <span className="icon is-small is-left">
                                                            <i className="fas fa-calendar-day"></i>
                                                        </span>
                                                    </div>
                                                    {errors.date_of_birth && <p className="help is-danger">{errors.date_of_birth.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="columns is-multiline">
                                            <div className="column">
                                                <div className="field">
                                                    <label className="label is-small">Adresse</label>
                                                    <div className="control has-icons-left has-icons-right">
                                                        <input className="input is-small" type="text" {...register("adresse")} defaultValue={employee.address ? employee.address : null}/>
                                                        <span className="icon is-small is-left">
                                                            <i className="fas fa-address-card"></i>
                                                        </span>
                                                    </div>
                                                    {errors.adresse && <p className="help is-danger">{errors.adresse.message}</p>}
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
                                        <div className="field">
                                            <button className="button is-primary is-small" disabled={isSubmitting}>Modify</button> 
                                        </div>
                                    </form>
                                </div>
                                <div className="tile is-child">
                                <button className="accordion"> Activities</button>
                                    <div className="accordion-conten m-b-10 is-open">
                                        <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                                            <div className="tile is-parent is-flex-direction-row is-justify-content-space-between">
                                                <div className="control">
                                                    <div className="select is-small">
                                                        <select onChange={(event) => handleActivitiesItemsPerPage(event.target.value)} defaultValue={5}>
                                                            <option value={5}>5</option>
                                                            <option value={10}>10</option>
                                                            <option value={15}>15</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={`control has-icons-right ${searchActivityLoading === true && 'is-loading'}`}>
                                                    <input className="input is-success is-rounded is-small is-fullwidth" type="text" defaultValue={activitySearch} onChange={(event) => handleActivitySearch(event)} />
                                                    <span className="icon is-small is-right">
                                                        {searchActivityLoading === false && <i className="fas fa-search"></i>}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                                                {activityLoading && <TableLoader />} 
                                                {!activityLoading && <table className="table" style={{width: "100%"}}>
                                                    <thead> 
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Auditable Type</th>
                                                            <th>Event</th>
                                                            <th>Old value</th>
                                                            <th>New value</th>
                                                            <th>IP</th>
                                                            <th>User agent</th>
                                                            <th>Created at</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {activities.map(activity => 
                                                            <tr key={activity.id}>
                                                                <th>{activity.id}</th>
                                                                <td>{activity.auditable_type}</td>
                                                                <td>{activity.event}</td>
                                                                <td><span title={activity.old_values}>{activity.old_values.length > 13 ? activity.old_values.substr(0, 12) + `...`:activity.old_values}</span></td>
                                                                <td><span title={activity.new_values}>{activity.new_values.length > 13 ? activity.new_values.substr(0, 12) + `...`:activity.new_values}</span></td>
                                                                <td>{activity.ip_address}</td>
                                                                <td><span title={activity.user_agent}>{activity.user_agent.length > 13 ? activity.user_agent.substr(0, 12) + `...`:activity.user_agent}</span></td>
                                                                <td>{new Date(activity.created_at).toDateString()}</td>
                                                                <td><Link to="" style={{color: "#004a88", cursor: "pointer"}}><i className="fas fa-eye"></i></Link> </td>
                                                            </tr>  
                                                        )}
                                                    </tbody>
                                                </table> }                     
                                            </div>
                                            <br />
                                            {!loading && <Pagination currentPage={activitiesCurrentPage} itemsPerPage={activititesItemsPerPage} length={activityTotalItem} onPageChange={handleActivitiesPageChange} />}
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <br/>
            </div>
        </div>
    )
}

export default ShowEmployee