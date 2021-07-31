import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BurgerBar from '../../components/Navbar/BurgerBar'
import { fetchApi, GET, PATCH} from '../../requests'
import TableLoader from '../../Loaders/TableLoader'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

const ShowIncomingShippements = (props) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [parcels, setParcels] = useState([])
    const [shipment_name, setShipmentName] = useState()
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
                    const results = await fetchApi(GET, `/shipment/${props.match.params.id}/showIncomingShipment`)
                    //setShipment(results.data.data)
                    setParcels(results.data.data)
                    setShipmentName(results.data.data[0].shipment_name)
                    //setInitialParcels(results.data.data)
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

    // const checkBoxStatus = (parcel_id) => {
    //     return parcels.some(p => 
    //         p.id === parcel_id
    //     )
    // }

    const onSubmitNotifyOwner = handleSubmit(async(data) => {
        try {
            setLoading(true)
            await fetchApi(PATCH, ``, data)
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

    return (
        <div style={{display: 'flex'}}>	
            <Navbar logo={ props.logo } onLogout={props.onLogout} isAuthenticated={props.isAuthenticated} />
            <div className="main-content" id="main-content">
                <BurgerBar logo={props.logo}/>
                <div className="container card-container shippement-container">
                    <div className="tile is-ancestor is-horizontal">
                        <div className="tile m-t-20 is-6 is-flex-direction-column">
                            {/* <!-- Heading --> */}
                            <h2 className="title is-12" style={{fontSize: '20px'}}>Shipment <small>{shipment_name}</small></h2>
                        </div>
                    </div>
                    <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                        <form>
                        <div className="tile is-parent">
                            <div className="tile is-child">
                                <button onClick={onSubmitNotifyOwner} disabled={isSubmitting} className="button is-small is-warning" > notify owners &nbsp; </button>
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
                                    {parcels.map((parcel, index) => 
                                        <tr key={parcel.id}>
                                            <td><input type="checkbox" {...register('parcels')} defaultValue={parcel.id} /></td>
                                            <th>{index +1}</th>
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

export default ShowIncomingShippements