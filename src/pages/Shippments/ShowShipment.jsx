import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BurgerBar from '../../components/Navbar/BurgerBar'
import { fetchApi, GET, PATCH} from '../../requests'
import TableLoader from '../../Loaders/TableLoader'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

const Shippements = (props) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [shipment, setShipment] = useState([])
    const [parcels, setParcels] = useState([])
    const [parcelsBranch, setParcelsBranches] = useState([])
    const [totalItems, setTotalItems] = useState()
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, formState} = useForm({
        mode: "onTouched"
    })

    const {isSubmitting} = formState

    useEffect(() => {
        async function getShipment () {
            if (props.match.params) {  
                setLoading(true)
                try {
                    const results = await fetchApi(GET, `/shipment/${props.match.params.id}/show`)
                    setShipment(results.data.data)
                    setParcels(results.data.data.parcels)
                    setTotalItems(results.data.data.parcels.length)
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
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
        getShipment()
    },[currentPage, props.match.params, props.history])

    useEffect(() => {
        async function getParcelsBranch () {
            if (props.match.params) { 
                try {
                    const results = await fetchApi(GET, `/shipment/${props.match.params.id}/getParcelsByBranchFrom`)
                    setParcelsBranches(results.data.data)
                } catch (error) {
                    if (!error.response) {
                        toast.error('Ooops, check your internet connection!')
                    }
                }
            } else {
                props.history.push("/notFound")
            }
        }
        getParcelsBranch()
    }, [props.match.params, props.history])

    const checkBoxStatus = (parcel_id) => {
        return parcels.some(p => 
            p.id === parcel_id
        )
    }

    const onSubmitAddParcels = handleSubmit(async(data) => {
        try {
            setLoading(true)
            await fetchApi(PATCH, `/shipment/${props.match.params.id}/add_parcel`, data)
            setCurrentPage(+1)
            setLoading(false)
            toast.success('Succesfully added parcel(s) to shipment')
        } catch (error) {
            setLoading(false)
            if(!error.response) {
                toast.error('Ooops, check your internet connection!')
            } else if (error.response.status === 500) {
                toast.error(error.response.message)
            }
        }
    })

    const onSubmitRemoveParcels = handleSubmit(async (data) => {
        try {
            setLoading(true)
            await fetchApi(PATCH, `/shipment/${props.match.params.id}/remove_parcel`, data)
            setCurrentPage(+1)
            setLoading(false)
            toast.success('Succesfully removed parcel(s) to shipment')
        } catch (error) {
            setLoading(false)
            if(!error.response) {
                toast.error('Ooops, check your internet connection!')
            } else if (error.response.status === 500) {
                toast.error(error.response.message)
            }
        }
    })

    return (
        <div style={{display: 'flex'}}>	
            <Navbar logo={ props.logo } onLogout={props.onLogout} isAuthenticated={props.isAuthenticated} />
            <div className="main-content" id="main-content">
                <BurgerBar logo={props.logo}/>
                <div className="container card-container shippement-container">
                    <div className="tile is-ancestor is-horizontal">
                        <div className="tile m-t-20 is-6 is-flex-direction-row is-justify-content-space-between">
                            {/* <!-- Heading --> */}
                            <h2 className="title is-12" style={{fontSize: '20px'}}>Shipment <small>{shipment.name}</small></h2>
                        </div>
                    </div>
                    <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                        <form>
                        <div className="tile is-parent is-horizontal">
                            <div className="tile is-child">
                                <button onClick={onSubmitAddParcels} disabled={isSubmitting} className="button is-small is-primary" > Add parcel(s)&nbsp; </button>
                                &nbsp;<button onClick={onSubmitRemoveParcels} disabled={isSubmitting} className="button is-small is-warning" > remove parcel(s)&nbsp; </button>
                            </div>
                            <div className="tile is-child">
                                <h4 className="" style={{fontSize: '20px', textAlign: 'right'}}>Total: {totalItems}</h4>
                            </div>
                        </div>
                        <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                            {loading && <TableLoader />}
                            {!loading && <table className="table" style={{width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>#</th>
                                        <th>Owner</th>
                                        <th>Branch from</th>
                                        <th>Destination</th>
                                        <th>Price</th>
                                        <th>Parcel type</th>
                                        <th>Weight</th>
                                        <th>Content description</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parcelsBranch.map((parcel, index) => 
                                        <tr key={parcel.id} className={checkBoxStatus(parcel.id) === true ? `is-selected` : null}>
                                            <td><input type="checkbox" {...register('parcels')} defaultValue={parcel.id} defaultChecked={checkBoxStatus(parcel.id)} /></td>
                                            <th>{parcel.id}</th>
                                            <td>{parcel.first_name} {parcel.last_name}</td>
                                            <td>{parcel.city_branch_name}</td>
                                            <td>{parcel.to_branch_name}</td>
                                            <td className="has-text-centered"><span>{parcel.price}</span></td>
                                            <td>{parcel.type}</td>
                                            <td className="has-text-centered">{parcel.weight}</td>
                                            <td title={parcel.content_description}>{parcel.content_description.length > 13 ? parcel.content_description.substr(0, 12) + `...`: parcel.content_description}</td>
                                        </tr>
                                        )}
                                </tbody>
                            </table> }                  
                        </div>
                        <br />
                        </form>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default Shippements