import React, {useState, useEffect} from 'react'
import BurgerBar from '../../../components/Navbar/BurgerBar'
import Navbar from '../../../components/Navbar/Navbar'
import {useForm} from 'react-hook-form'
import { fetchApi, GET, PATCH } from '../../../requests'
import { toast } from 'react-toastify'


const EditPermission = (props) => {
    const [permission, setPermission] = useState({})
    const [loading, setLoading] = useState(false)

    const {register, handleSubmit, setError, formState} = useForm({
        mode: "unTouched" 
    })

    const {isSubmitting} = formState

    useEffect(() => {
        async function getPermission() {
            if (props.match.params) { 
                setLoading(true)
                try {
                    const results = await fetchApi(GET, `/permissions/${props.match.params.id}/show`)
                    setPermission(results.data.data)
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
        getPermission()
    })

    const onSubmit = async (formData) => {
        try {
            // setPostLoading(true)
            await fetchApi(PATCH, `/permissions/update/${props.match.params.id}`, formData)
            toast.success('Succesfully updated')
        } catch (error) {
            if (!error.response) {
                toast.error('Ooops, check your internet connection!')
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
    <div style={{display: 'flex'}}>	
        <Navbar logo={ props.logo } onLogout={props.onLogout} isAuthenticated={props.isAuthenticated} />
        <div className="main-content" id="main-content">
            <BurgerBar logo={props.logo}/>
            <div className="container card-container shippement-container">
                <div className="tile is-ancestor is-horizontal">
                    <div className="tile m-t-20 is-6 is-flex-direction-column">
                        {/* <!-- Heading --> */}
                        <h2 className="title is-12" style={{fontSize: '30px'}}>Edit Permission</h2>
                    </div>  
                </div>
                <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                    <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                        {/* <form> */}
                            <div className=""> {/* className = container */}
                                <button className="accordion">Edit Permission</button>

                                <div className="accordion-box m-b-10" style={{padding: "10px 10px 0px "}}>
                                    
                                    { <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="columns is-multiline">
                                            <div className="column">
                                                <div className="field">
                                                    <label className="label">Name</label>
                                                    <div className="control has-icons-right">
                                                        <input className="input is-success is-small is-fullwidth" type="text" defaultValue={permission.name} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="field">
                                                    <label className="label">Display Name</label>
                                                    <div className="control has-icons-right">
                                                        <input 
                                                            {...register("display_name")}
                                                            className="input is-success is-small is-fullwidth" 
                                                            type="text" defaultValue={permission.display_name}
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
                                                            defaultValue={permission.description}
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
                                    </form>}
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

export default EditPermission