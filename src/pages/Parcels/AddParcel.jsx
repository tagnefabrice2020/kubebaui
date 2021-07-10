import React from 'react'
import {Link} from 'react-router-dom'
import { openOrCloseAccordions } from '../../Actions/openOrCloseAccordions'


const AddParcels = () => {
    return (
        <div className="container card-container shippement-container">
            <div className="tile is-ancestor is-horizontal">
                <div className="tile m-t-20 is-6 is-flex-direction-column">
                    {/* <!-- Heading --> */}
                    <h2 className="title is-12" style={{fontSize: '30px'}}>Add Parcels</h2>
                </div>
                <div className="tile m-t-20 is-flex-direction-row-reverse">
                    {/* <!-- Form search --> */}
                    <div className="is-10">
                            <form method="get" action="">
                                <p className="control has-icons-right">
                                    <input type="text" name="search" className="input is-small is-rounded" />
                                    <span className="icon is-small is-right">
                                        <i className="fa fa-search"></i>
                                    </span>
                                </p>
                            </form>
                        </div>
                </div>
            </div>
            <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                <div className="tile is-parent">
                    <div className="tile is-child">
                        <Link to="parcels" className="button is-small is-primary" >All parcels &nbsp; <i className="fas fa-list"></i></Link>
                    </div>
                </div>
                <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                    {/* <form> */}
                        <div className=""> {/* className = container */}
                            <button className="accordion" onClick={(event) => openOrCloseAccordions(event)}>Recipient information</button>
                            <div className="accordion-content m-b-10">
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">First Name</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-user"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Last Name</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-user"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Email</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-envelope"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Phone number</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-phone"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Country Resident</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-globe"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Address</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-globe"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="accordion" onClick={(event) => openOrCloseAccordions(event)}>Parcel information</button>
                            <div className="accordion-content m-b-10">
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Deposit Branch</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-user"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Destination</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-user"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Parcel Type</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-envelope"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Weight type</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-phone"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label"> Shipping type</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-globe"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Address</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-globe"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">  Content description</label>
                                            <div className="control has-icons-left has-icons-right">
                                                <textarea className="input is-success is-small is-fullwidth" type="text" placeholder="" ></textarea>
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-globe"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
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
    )
}

export default AddParcels