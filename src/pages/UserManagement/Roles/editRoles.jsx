import React, {useState, useEffect} from 'react'
import BurgerBar from '../../../components/Navbar/BurgerBar'
import Navbar from '../../../components/Navbar/Navbar'
import {useForm} from 'react-hook-form'
import { fetchApi, GET, PATCH } from '../../../requests'
import { toast } from 'react-toastify'


const EditRole = (props) => {
    const [role, setRole] = useState({})
    const [permissions, setPermissions] = useState([])
    const [rolePermissions, setRolePermission] = useState([])
    const [loading, setLoading] = useState(false)

    const {register, handleSubmit, formState} = useForm({
        mode: "unTouched" 
    })

    const {register: register1, handleSubmit: handleSubmit1, formState: formState1} = useForm({
        mode: "unTouched" 
    })

    const {errors, isSubmitting} = formState

    const {isSubmitting1} = formState1

    useEffect(() => {
        async function getRole() {
            if (props.match.params) { 
                setLoading(true)
                try {
                    const results = await fetchApi(GET, `/roles/${props.match.params.id}/show`)
                    setRole(results.data.data[0])
                    setRolePermission(results.data.data[0].permissions)
                    setLoading(false)
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
        getRole()
    }, [props.history, props.match.params])

    useEffect(() => {
        async function getAllPermission () {
            if (props.match.params) { 
                try {
                    const results = await fetchApi(GET, `/getAllPermissions`)
                    setPermissions(results.data.data)
                } catch (error) {
                    if (!error.response) {
                        toast.error('Ooops, check your internet connection!')
                    }
                }
            } else {
                props.history.push("/notFound")
            }
        }
        getAllPermission()
    },[props.history, props.match.params])

    const onSubmit = async (formData) => {
        try {
            // setPostLoading(true)
            await fetchApi(PATCH, `/roles/update/${props.match.params.id}`, formData)
            toast.success('Succesfully updated')
        } catch (error) {
            if (!error.response) {
                toast.error('Ooops, check your internet connection!')
            }
        }
    }

    const onSubmitPermission = async (formData) => {
        try {
            await fetchApi(PATCH, `/roles/update/${props.match.params.id}`, formData)
            toast.success('Succesfully updated')
        } catch (error) {
            if (!error.response) {
                toast.error('Ooops, check your internet connection!')
            }
        }
    }

    const checkBoxStatus = (permission_id) => {
        return rolePermissions.some(rp => 
            rp.id === permission_id
        )
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
                        <h2 className="title is-12" style={{fontSize: '30px'}}>Edit Role</h2>
                    </div>  
                </div>
                <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                    <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                        {/* <form> */}
                            <div className=""> {/* className = container */}
                                <button className="accordion">Edit Role</button>
                                {
                                <div className="accordion-box m-b-10 is-open">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="columns is-multiline">
                                            <div className="column">
                                                <div className="field">
                                                    <label className="label">Name</label>
                                                    <div className="control has-icons-right">
                                                        <input className="input is-success is-small is-fullwidth" 
                                                            type="text" 
                                                            defaultValue={role.name} disabled 
                                                        />
                                                    </div>
                                                    {errors.name && <p className="help is-danger">{errors.name.message}</p>}
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="field">
                                                    <label className="label">Display Name</label>
                                                    <div className="control has-icons-right">
                                                        <input 
                                                            {...register("display_name")}
                                                            className="input is-success is-small is-fullwidth" 
                                                            type="text" defaultValue={role.display_name}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="columns is-multiline">
                                            <div className="column">
                                                <div className="field">
                                                    <label className="label">Description</label>
                                                    <div className="control">
                                                        <textarea 
                                                            {...register("description")}
                                                            className="input is-success is-small is-fullwidth" 
                                                            type="text" 
                                                            defaultValue={role.description}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                
                                        <div className="column">
                                            <div className="field">
                                                <button className="button is-small is-primary" disabled={isSubmitting}>Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                }
                                <button className="accordion">Permissions</button>
                                <div className="accordion-box m-b-10 is-open">
                                    <div className="columns">
                                        <div className="column">
                                            <div className="box">
                                                <article className="media">
                                                    <div className="media-content">
                                                        <div className="content">
                                                            <h2 className="title">Permissions</h2>
                                                            <form onSubmit={handleSubmit1(onSubmitPermission)}>
                                                                <div className="fields">
                                                                {permissions.map((permission)=> 
                                                                    <div key={permission.id}>
                                                                        <label className="checkbox">
                                                                        <input 
                                                                            type="checkbox" 
                                                                            name="permissions"
                                                                            {...register1("permissions")}
                                                                            id={`checkbox_`+ permission.id} 
                                                                            defaultChecked={checkBoxStatus(permission.id)}
                                                                            defaultValue={permission.id} 
                                                                        />
                                                                        &nbsp;{permission.name}
                                                                        </label>
                                                                    </div>
                                                                )}
                                                                <button className="button is-small is-primary" disabled={isSubmitting1}>Save</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/* </form>                   */}
                    </div>
                </div>
                <br/>
                </div>
            </div>
    </div>
    )
}

export default EditRole