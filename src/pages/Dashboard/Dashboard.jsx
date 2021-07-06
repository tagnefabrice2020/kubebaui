import React from 'react'
import {Line} from 'react-chartjs-2'



const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const Dashboard = (props) => {
    
    return (
            <div className="container card-container">
                <div className="container m-t-50">
                    <div className="tile is-ancestor">
                        <div className="tile is-parent columns contianer-height">

                            <div className="tile is-one-quarter column side-padding-0 ">
                                {/* <!-- <a> --> */}
                                <div className="box h-150 w-100 is-flex is-flex-direction-column" style={{height: '150px',position: 'relative',alignItems: 'flex-start',justifyContent: 'space-around'}}>
                                    <div className="c-header">
                                        <h2>Total Clients <span style={{fontSize: '10px'}}>+24%</span></h2>
                                    </div>
                                    <div><h1 className="title">5,124</h1></div>
                                    <div><small>50 avg new users / day</small></div>
                                </div>
                                {/* <!-- </a> --> */}
                            </div>
                        
                            <div className="tile is-one-quarter column side-padding-0 ">
                                {/* <!-- <a> --> */}
                                <div className="box h-150 w-100 is-flex is-flex-direction-column" style={{height: '150px',position: 'relative',alignItems: 'flex-start',justifyContent: 'space-around'}}>
                                    <div className="c-header">
                                        <h2>Total Activities <span style={{fontSize: '10px'}}>+24%</span></h2>
                                    </div>
                                    <div><h1 className="title">3,000</h1></div>
                                    <div><small>Activities / day</small></div>
                                </div>
                                {/* <!-- </a> --> */}
                            </div>
                            
                            <div className="tile is-one-quarter column side-padding-0 ">
                                {/* <!-- <a> --> */}
                                <div className="box h-150 w-100 is-flex is-flex-direction-column" style={{height: '150px',position: 'relative',alignItems: 'flex-start',justifyContent: 'space-around'}}>
                                    <div className="c-header">
                                        <h2>Total parcels <span style={{fontSize: '10px'}}>+10%</span></h2>
                                    </div>
                                    <div><h1 className="title">15,124</h1></div>
                                    <div><small>500 avg new parcels / day</small></div>
                                </div>
                                {/* <!-- </a> --> */}
                            </div>

                            
                            <div className="tile is-one-quarter column side-padding-0 ">
                                {/* <!-- <a> --> */}
                                <div className="box h-150 w-100 is-flex is-flex-direction-column" style={{height: '150px',position: 'relative',alignItems: 'flex-start',justifyContent: 'space-around'}}>
                                    <div className="c-header">
                                        <h2>Total Revenue <span style={{fontSize: '10px'}}>+24%</span></h2>
                                    </div>
                                    <div><h1 className="title">$2M</h1></div>
                                    <div><small>$5000 / day</small></div>
                                </div>
                                {/* <!-- </a> --> */}
                            </div>
                        </div>
                    </div>
                    <div className="tile is-ancestor">
                        <div className="tile is-parent columns contianer-height">
                            <div className="tile column side-padding-0 ">
                                <Line 
                                    data={{
                                            labels: labels,
                                            datasets: [{
                                            label: 'My First Dataset',
                                            data: [65, 59, 55, 55, 56, 55, 40],
                                            fill: false,
                                            borderColor: 'rgb(75, 192, 192)',
                                            tension: 0.1
                                            }],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            hover: {
                                            animationDuration: 0
                                            },
                                            scales: {
                                                y: {
                                                    ticks: {
                                                        stepSize: .5
                                                    }
                                                }
                                            }
                                        }}
                                height={400}
                                width={400}                                                
                                />
                            </div>                                                    
                        </div>                                    
                    </div>
                    <br />
                    <div className="tile is-parent is-horizontal mobile-padding" id="search">
                        <div className="tile">
                            <div className="container">
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
                    <div className="tile is-ancestor">
                        <div className="tile is-parent is-vertical contianer-height">
                            <br />
                            <div className="m-b-10 is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                                <h1 className="title" style={{display: 'contents'}}>Recent login users</h1>
                                <div className="buttons has-addons">
                                    <button className="button is-success is-selected">Yes</button>
                                    <button className="button">Maybe</button>
                                    <button className="button">No</button>
                                </div>
                            </div>
                            
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th><abbr title="Position">Pos</abbr></th>
                                        <th>Team</th>
                                        <th><abbr title="Played">Pld</abbr></th>
                                        <th><abbr title="Won">W</abbr></th>
                                        <th><abbr title="Drawn">D</abbr></th>
                                        <th><abbr title="Lost">L</abbr></th>
                                        <th><abbr title="Goals for">GF</abbr></th>
                                        <th><abbr title="Goals against">GA</abbr></th>
                                        <th><abbr title="Goal difference">GD</abbr></th>
                                        <th><abbr title="Points">Pts</abbr></th>
                                        <th>Qualification or relegation</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                    <th><abbr title="Position">Pos</abbr></th>
                                    <th>Team</th>
                                    <th><abbr title="Played">Pld</abbr></th>
                                    <th><abbr title="Won">W</abbr></th>
                                    <th><abbr title="Drawn">D</abbr></th>
                                    <th><abbr title="Lost">L</abbr></th>
                                    <th><abbr title="Goals for">GF</abbr></th>
                                    <th><abbr title="Goals against">GA</abbr></th>
                                    <th><abbr title="Goal difference">GD</abbr></th>
                                    <th><abbr title="Points">Pts</abbr></th>
                                    <th>Qualification or relegation</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr>
                                    <th>1</th>
                                    <td>Leicester City<strong>(C)</strong>
                                    </td>
                                    <td>38</td>
                                    <td>23</td>
                                    <td>12</td>
                                    <td>3</td>
                                    <td>68</td>
                                    <td>36</td>
                                    <td>+32</td>
                                    <td>81</td>
                                    <td>Qualification for the Champions League group stage</td>
                                    </tr>
                                    <tr>
                                    <th>2</th>
                                    <td>Arsenal</td>
                                    <td>38</td>
                                    <td>20</td>
                                    <td>11</td>
                                    <td>7</td>
                                    <td>65</td>
                                    <td>36</td>
                                    <td>+29</td>
                                    <td>71</td>
                                    <td>Qualification for the Champions League group stage</td>
                                    </tr>
                                    <tr>
                                    <th>3</th>
                                    <td>Tottenham Hotspur</td>
                                    <td>38</td>
                                    <td>19</td>
                                    <td>13</td>
                                    <td>6</td>
                                    <td>69</td>
                                    <td>35</td>
                                    <td>+34</td>
                                    <td>70</td>
                                    <td>Qualification for the Champions League group stage</td>
                                    </tr> 
                                </tbody>
                            </table>
                            <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                                <button className="pagination-previous">Previous</button>
                                <button className="pagination-next">Next page</button>
                                <ul className="pagination-list">
                                    <li><button className="pagination-link" aria-label="Goto page 1">1</button></li>
                                    <li><span className="pagination-ellipsis">&hellip;</span></li>
                                    <li><button className="pagination-link" aria-label="Goto page 45">45</button></li>
                                    <li><button className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</button></li>
                                    <li><button className="pagination-link" aria-label="Goto page 47">47</button></li>
                                    <li><span className="pagination-ellipsis">&hellip;</span></li>
                                    <li><button className="pagination-link" aria-label="Goto page 86">86</button></li>
                                </ul>
                                </nav>
                                <br/>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default Dashboard