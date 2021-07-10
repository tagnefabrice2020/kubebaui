import React from 'react'

const Documents = () => {
    return (
        <div className="container card-container shippement-container">
            <div className="tile is-ancestor is-horizontal">
                <div className="tile m-t-20 is-6 is-flex-direction-column">
                    {/* <!-- Heading --> */}
                    <h2 className="title is-12" style={{fontSize: '30px'}}>Documents</h2>
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
                <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                    <table className="table" style={{width: '100%'}}>
                        <thead>
                            <tr>
                                <th><abbr title="number">#</abbr></th>
                                <th>Type</th>
                                <th>Document owner</th>
                                <th>Status</th>
                                <th>Created at</th>
                                <th>Upadated at</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th><abbr title="number">#</abbr></th>
                                <th>Type</th>
                                <th>Document owner</th>
                                <th>Status</th>
                                <th>Created at</th>
                                <th>Upadated at</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td><span>passport</span></td>
                                <td>John Doe</td>
                                <td><span>validated</span></td>
                                <td>Saturday 09, Jul 2021</td>
                                <td>Saturday 09, Jul 2021</td>
                                <th><span><i className="fas fa-eye"></i></span></th>
                                <th><span><i className="fas fa-times"></i></span></th>
                            </tr>
                            <tr className="is-selected">
                                <th>2</th>
                                <td><span>passport</span></td>
                                <td>John Doe</td>
                                <td><span>validated</span></td>
                                <td>Saturday 09, Jul 2021</td>
                                <td>Saturday 09, Jul 2021</td>
                                <th><span><i className="fas fa-eye"></i></span></th>
                                <th><span><i className="fas fa-times"></i></span></th>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td><span>passport</span></td>
                                <td>John Doe</td>
                                <td><span>validated</span></td>
                                <td>Saturday 09, Jul 2021</td>
                                <td>Saturday 09, Jul 2021</td>
                                <th><span><i className="fas fa-eye"></i></span></th>
                                <th><span><i className="fas fa-times"></i></span></th>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td><span>passport</span></td>
                                <td>John Doe</td>
                                <td><span>validated</span></td>
                                <td>Saturday 09, Jul 2021</td>
                                <td>Saturday 09, Jul 2021</td>
                                <th><span><i className="fas fa-eye"></i></span></th>
                                <th><span><i className="fas fa-times"></i></span></th>
                            </tr>
                            <tr>
                                <th>5</th>
                                <td><span>passport</span></td>
                                <td>John Doe</td>
                                <td><span>validated</span></td>
                                <td>Saturday 09, Jul 2021</td>
                                <td>Saturday 09, Jul 2021</td>
                                <th><span><i className="fas fa-eye"></i></span></th>
                                <th><span><i className="fas fa-times"></i></span></th>
                            </tr>
                        </tbody>
                    </table>                       
                </div>
            </div>
            <br/>
        </div>
    )
}

export default Documents