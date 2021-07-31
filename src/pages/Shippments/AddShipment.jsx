import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Navbar from '../../components/Navbar/Navbar'
import BurgerBar from '../../components/Navbar/BurgerBar'
import { fetchApi, GET, POST} from '../../requests'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TableLoader from "../../Loaders/TableLoader"

const AddShipment = (props) => {

    const [branches, setBranches] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchBranches () {
            setLoading(true)
            try {
                const results = await fetchApi(GET, "/getBranches")
                setBranches(results.data.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchBranches()
    }, [])

    const {register, formState, handleSubmit} = useForm({
        mode: "unTouched"
    })

    const {errors, isSubmitting} = formState

    const onSubmit = async (formData) =>{
        try {
            const results = await fetchApi(POST, "/shipment/store", formData)
            toast.success("Succesfully added a new shipment")
        } catch (error) {
            if(!error.response) {
                toast.error('Ooops, check your internet connection!')
            } else if (error.response.status === 500) {
                toast.error(error.response.message)
            } else if(error.response.status === 422) {
                 
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
                            <h2 className="title is-12 page-title" style={{fontSize: '25px'}}>Add Shippments</h2>
                        </div>
                    </div>
                    <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                        <div className="tile is-parent">
                            <div className="tile is-child">
                                <Link to="/shippments" className="button is-small is-primary" >All shippments &nbsp; <i className="fas fa-list"></i></Link>
                            </div>
                        </div>
                        <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                            <div className="panel-block is-active is-flex-direction-column">
                                {loading && <TableLoader />}
                                {!loading && <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
                                    <div className="field">
                                        <label className="label">Destination</label>
                                        <div className="control">
                                            <div className={`select ${errors.to && "is-danger"} is-small is-fullwidth`}>
                                                <select name="to" defaultValue={branches > 0 ? branches[0].id : null}
                                                    {...register('to', {
                                                        required: "required"
                                                    })}
                                                >
                                                    <option disabled defaultValue>select your destination</option>
                                                    {branches.map((branch) => {
                                                        return (
                                                            <option key={branch.id} value={branch.id} >{branch.city_branch_name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Status</label>
                                        <div className="control">
                                            <div className="select is-fullwidth is-small">
                                                <select name="status"
                                                    {...register('status')}
                                                >
                                                    <option value="parking">parking</option>
                                                    <option value="arrived">arrived</option>
                                                    <option value="inProgress">in progress</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field is-grouped">
                                        <div className="control">
                                            <button className="button is-primary is-small is-fullwidth" disabled={isSubmitting}><i className="fas fa-save"></i></button>
                                        </div>
                                    </div>
                                    {/* https://codesandbox.io/s/vmvjl2q023 */}
                                </form> }
                            </div>
                        
                        </div>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default AddShipment