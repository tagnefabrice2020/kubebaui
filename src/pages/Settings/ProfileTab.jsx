import React from 'react'

const ProfileTab = () => {
    return ( 
        <div className="tile is-ancestor is-horizontal m-t-10">
            <div className="tile is-parent is-flex-grow-2 is-vertical custom-box">
                <div className="tile is-child">
                    <div className='profile-heading'>
                        <div className='columns is-mobile is-multiline'>
                            
                            <div className='column is-4-tablet is-10-mobile name is-flex-grow-2'>
                                <p>
                                    <span className='title is-bold'>Paul Miller</span>
                                    <br />
                                    <button className='button is-primary is-small' id='edit-preferences' style={{margin: '5px 0'}}>
                                    Edit Preferences
                                    </button>
                                    <br />
                                </p>
                                <p className='tagline'>
                                    The users profile bio would go here, of course. It could be two lines or more or whatever. We should probably limit the amount of characters to ~500 at most though.
                                </p>
                            </div>
                            <div className='column is-2-tablet is-4-mobile has-text-centered'>
                                <p className='stat-val'>30</p>
                                <p className='stat-key'>searches</p>
                            </div>
                            <div className='column is-2-tablet is-4-mobile has-text-centered'>
                                <p className='stat-val'>10</p>
                                <p className='stat-key'>likes</p>
                            </div>
                            <div className='column is-2-tablet is-4-mobile has-text-centered'>
                                <p className='stat-val'>3</p>
                                <p className='stat-key'>lists</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tile is-child">
                    <form>
                        <div className="field">
                            <h2 className="title">Personal Information</h2>
                        </div>
                        <div className="field">
                            <label className="label is-small">Legal Name</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-small" type="email" />
                                <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label is-small">Date of Birth</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-small" type="date" />
                                <span className="icon is-small is-left">
                                <i className="fas fa-date"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label is-small">Adresse</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-small" type="text"/>
                                <span className="icon is-small is-left">
                                <i className="fas fa-address-card"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                                </span>
                            </div>
                        </div>
                        <div className="columns is-multiline">
                            <div className="column">
                                <div className="field">
                                    <label className="label is-small">Country</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input is-small" type="text" />
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-address-card"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                        <i className="fas fa-check"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label is-small">State</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input is-small" type="text" />
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-address-card"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                        <i className="fas fa-check"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns is-multiline">
                            <div className="column">
                                <div className="field">
                                    <label className="label is-small">Postal code</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input is-small" type="text" />
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-address-card"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                        <i className="fas fa-check"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <button className="button is-primary is-small">Modify</button> 
                        </div>
                    </form>
                </div>
            </div>
            <div className="tile is-parent custom-box">
                <div className="tile is-child">
                    <article className="panel is-info">
                        <p className="panel-heading">
                            Change Password
                        </p>
                        
                        <div className="panel-block is-active is-flex-direction-column">
                            <form>
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
                    </article>
                </div>
            </div>
        </div> 
     )
}
 
export default ProfileTab;