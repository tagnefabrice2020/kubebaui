import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { fetchApi, GET, PATCH } from "../../requests"
import Navbar from "../../components/Navbar/Navbar"
import BurgerBar from "../../components/Navbar/BurgerBar"
import { toast } from 'react-toastify'

const EditRates = (props) => {

    const [branches, setBranches] = useState([])
    const [selectedFromBranch, setSelectedFromBranch] = useState()
    const [selectedToBranch, setSelectedToBranch] = useState()
    const [rate, setRate] = useState({
        price: "",
        description:"",
        parcel_weight: ""
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchRate () {
            if (props.match.params) {
                setLoading(true)
                try {
                    const results = await fetchApi(GET, `/rate/${props.match.params.id}/show`)
                    setSelectedFromBranch(results.data.data.branch_from_id)
                    setSelectedToBranch(results.data.data.branch_to_id)
                    setRate(results.data.data)
                } catch (error) {
                    if (!error.response) {
                        toast.error('Ooops, check your internet connection!')
                    } else if(error.response.status === 404) {
                       props.history.push("/notFound")
                    }
                }   
            } else {
                props.history.push("/notFound")
            }
        }
        fetchRate()
    }, [props.history, props.match.params])

    useEffect (() => {
        async function fetchRates () {
            setLoading(true)
            if (props.match.params) {
                try {
                    const results = await fetchApi(GET, `/getBranches`)
                    setBranches(results.data.data)
                    setLoading(false)
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }   
            } 
        }
        fetchRates()
    })

    const {register, handleSubmit, formState} = useForm({
        mode: "onTouched"
    })

    const {errors, isSubmitting} = formState

    const onSubmit = async (formData) => {
        console.log(formData)
        try {
            // setPostLoading(true)
            const results = await fetchApi(PATCH, `/rate/update/${props.match.params.id}`, formData)
            console.log(results)
            toast.success('Succesfully updated')
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
                        {/* <!-- Heading --> */}
                        <h2 className="title is-12" style={{fontSize: '30px'}}>Edit Rate</h2>
                    </div>  
                </div>
                <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                    <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                        {/* <form> */}
                            <div className=""> {/* className = container */}
                                <button className="accordion">Edit rate</button>
                                <div className="accordion-box m-b-10 is-open" style={{padding: "10px 10px 0px "}}>
                                    {loading && 'loading'}
                                    {!loading && <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="columns is-multiline">
                                            <div className="column">
                                                <div className="field">
                                                    <label className="label">Branch From</label>
                                                    <div className="control">
                                                        <div className="select is-fullwidth is-small">
                                                            <select name="branch_from_id" value={selectedFromBranch} disabled
                                                                onChange={(event) => setSelectedFromBranch(event.target.value)}
                                                                >
                                                                {branches.map((branch) => {
                                                                    return (
                                                                        <option key={branch.id} value={branch.id} disabled={parseInt(selectedToBranch) === parseInt(branch.id) ? true:false}>{branch.city_branch_name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {errors.branch_from_id && <p className="help is-danger">{errors.branch_from_id.message}</p>}
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="field">
                                                    <label className="label">Branch To</label>
                                                    <div className="control has-icons-right">
                                                        <div className="select is-fullwidth is-small">
                                                            <select name="branch_to_id" value={selectedToBranch} disabled
                                                                onChange={(event) => setSelectedToBranch(event.target.value)}
                                                                
                                                                >
                                                                {branches.map(branch => {
                                                                    return (
                                                                        <option key={branch.id} value={branch.id} disabled={parseInt(selectedFromBranch) === parseInt(branch.id) ? true:false}>{branch.city_branch_name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                {errors.branch_to_id && <p className="help is-danger">{errors.branch_to_id.message}</p>}
                                            </div>
                                        </div>
                                        <div className="columns is-multiline">
                                            <div className="column">
                                                <div className="field">
                                                    <label className="label">Weight</label>
                                                    <div className="control has-icons-right">
                                                        <input 
                                                            defaultValue={rate ? rate.parcel_weight : null}
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
                                                            defaultValue={rate ? rate.price : null}
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
                                                        <select name="type" disabled
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
                                                            defaultValue={rate ? rate.zone_description : null}
                                                            {...register("description", {
                                                                required: "Rate description is required"
                                                            })}
                                                            className="input is-success is-small is-fullwidth" 
                                                            type="text"  />
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

export default EditRates