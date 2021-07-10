import React from 'react'
import { openOrCloseAccordions } from '../../../Actions/openOrCloseAccordions'

const Roles = () => {
    return (
        <>
            <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                    {/* <form> */}
                        <div className=""> {/* className = container */}
                            <button className="accordion" onClick={(event) => openOrCloseAccordions(event)}>Add a new Role</button>
                            <div className="accordion-content m-b-10">
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Name</label>
                                            <div className="control has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Display Name</label>
                                            <div className="control has-icons-right">
                                                <input className="input is-success is-small is-fullwidth" type="text" placeholder="" />
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
                                            <label className="label">Description</label>
                                            <div className="control">
                                                <textarea className="input is-success is-small is-fullwidth" type="text" placeholder="" />
                                            </div>
                                            <p className="help is-danger"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <button className="button is-small is-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="accordion"> All Roles</button>
                            <div className="accordion-content m-b-10 is-open">
                                <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                                    <div className="tile is-parent is-flex-direction-row-reverse">
                                        <div className="control has-icons-right">
                                            <input className="input is-success is-rounded is-small is-fullwidth" type="text" placeholder="" />
                                            <span className="icon is-small is-right">
                                                <i className="fas fa-search"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                                        <table className="table" style={{width: "100%"}}>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Display name</th>
                                                    <th>Description</th>
                                                    <th># users</th>
                                                    <th># permisions</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Display name</th>
                                                    <th>Description</th>
                                                    <th># users</th>
                                                    <th># permisions</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr>
                                                    <th>1</th>
                                                    <td>Superadministrator </td>
                                                    <td>Super administrator</td>
                                                    <td>Super administrator. Has access to all functionalities in the system</td>
                                                    <td className="has-text-centered">1</td>
                                                    <td className="has-text-centered">159</td>
                                                    <td><span><i className="fas fa-pencil-alt"></i></span></td>
                                                    <td><span><i className="fas fa-eye"></i></span></td>
                                                    <td><span><i className="fas fa-times"></i></span> </td>
                                                </tr>
                                                <tr>
                                                    <th>2</th>
                                                    <td>Administrator </td>
                                                    <td>Administrator</td>
                                                    <td>Administrator. Has access to all functionalities in the system</td>
                                                    <td className="has-text-centered">3</td>
                                                    <td className="has-text-centered">130</td>
                                                    <td><span><i className="fas fa-pencil-alt"></i></span></td>
                                                    <td><span><i className="fas fa-eye"></i></span></td>
                                                    <td><span><i className="fas fa-times"></i></span> </td>
                                                </tr>
                                                <tr>
                                                    <th>3</th>
                                                    <td>Client </td>
                                                    <td>Client</td>
                                                    <td>Client. Has access to all functionalities in the system</td>
                                                    <td className="has-text-centered">1</td>
                                                    <td className="has-text-centered">159</td>
                                                    <td><span><i className="fas fa-pencil-alt"></i></span></td>
                                                    <td><span><i className="fas fa-eye"></i></span></td>
                                                    <td><span><i className="fas fa-times"></i></span> </td>
                                                </tr>
                                            </tbody>
                                        </table>                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* </form>                   */}
                </div>
            </div>
        </>
    )
}

export default Roles