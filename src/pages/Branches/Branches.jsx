import React from 'react'
import { openOrCloseAccordions } from '../../Actions/openOrCloseAccordions'

const Branches = () => {
    return (
        <>
            <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                    {/* <form> */}
                        <div className=""> {/* className = container */}
                            <button className="accordion" onClick={(event) => openOrCloseAccordions(event)}>Add a new Branch</button>
                            <div className="accordion-content m-b-10">
                                <div className="columns is-multiline">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label">Country</label>
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
                                            <label className="label">City branch name</label>
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
                                            <label className="label">Status</label>
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
                            <button className="accordion"> All Branches</button>
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
                                                    <th>Country</th>
                                                    <th>City</th>
                                                    <th>Status</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Country</th>
                                                    <th>City</th>
                                                    <th>Status</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr>
                                                    <th>1</th>
                                                    <td>Cameroun </td>
                                                    <td>Buea</td>
                                                    <td><span>active</span></td>
                                                    <td><span><i className="fas fa-pencil-alt"></i></span></td>
                                                    <td><span><i className="fas fa-times"></i></span> </td>
                                                </tr>
                                                <tr>
                                                    <th>2</th>
                                                    <td>Cameroun </td>
                                                    <td>Buea</td>
                                                    <td><span>active</span></td>
                                                    <td><span><i className="fas fa-pencil-alt"></i></span></td>
                                                    <td><span><i className="fas fa-times"></i></span> </td>
                                                </tr>
                                                <tr>
                                                    <th>3</th>
                                                    <td>Cameroun </td>
                                                    <td>Buea</td>
                                                    <td><span>active</span></td>
                                                    <td><span><i className="fas fa-pencil-alt"></i></span></td>
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

export default Branches