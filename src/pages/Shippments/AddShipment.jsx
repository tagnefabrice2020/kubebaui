import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import BurgerBar from '../../components/Navbar/BurgerBar'

const AddShipment = (props) => {
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
                                <form style={{width: '100%'}}>
                                    <div className="field">
                                        <label className="label">Name</label>
                                        <div className="control has-icons-right">
                                            <input 
                                                className={`input is-success is-small`} type="text" />
                                            
                                        </div>
                                        <p className="help is-danger"></p>
                                    </div>
                                    <div className="field">
                                        <label className="label">Destination</label>
                                        <div className="control">
                                            <div className="select is-fullwidth is-small">
                                                <select name="branch_id"
                                                    
                                                >
                                                    <option value="active">active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <p className="help is-danger">This required</p>
                                    </div>

                                    <div className="field">
                                        <label className="label">Status</label>
                                        <div className="control">
                                            <div className="select is-fullwidth is-small">
                                                <select name="branch_id"
                                                    
                                                >
                                                    <option value="parking">parking</option>
                                                    <option value="arrived">arrived</option>
                                                    <option value="inProgress">in progress</option>
                                                </select>
                                            </div>
                                        </div>
                                        <p className="help is-danger">This required</p>
                                    </div>
                                    <div className="field is-grouped">
                                        <div className="control">
                                            <button className="button is-primary is-small is-fullwidth"><i className="fas fa-save"></i></button>
                                        </div>
                                    </div>
                                    {/* https://codesandbox.io/s/vmvjl2q023 */}
                                </form>
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