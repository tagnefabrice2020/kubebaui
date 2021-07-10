import React from 'react'

const EditShipment = () => {
    return(
        <div className="container card-container shippement-container">
            <div className="tile is-ancestor is-horizontal">
                <div className="tile m-t-20 is-6 is-flex-direction-column">
                    {/* <!-- Heading --> */}
                    <h2 className="title is-12" style={{fontSize: '30px'}}>Edit Shippments</h2>
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
                        <button className="button is-small is-primary" >All shippments &nbsp; <i className="fas fa-list"></i></button>
                    </div>
                </div>
                <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                    
                    <div className="panel-block is-active is-flex-direction-column">
                        <form style={{width: '100%'}}>
                            <div className="field">
                                <label className="label">Old password</label>
                                <div className="control">
                                    <input className="input is-small is-fullwidth" type="password" placeholder="" />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">New password</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input is-success is-small is-fullwidth" type="password" placeholder="" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                    <span className="icon is-small is-right">
                                        <i className="fas fa-check"></i>
                                    </span>
                                </div>
                                <p className="help is-success">This required</p>
                            </div>

                            <div className="field">
                                <label className="label">Confirm new password</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input is-success is-small is-fullwidth" type="password" placeholder="" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                    <span className="icon is-small is-right">
                                        <i className="fas fa-check"></i>
                                    </span>
                                </div>
                                <p className="help is-danger">This password is invalid</p>
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
    ) 
}

export default EditShipment