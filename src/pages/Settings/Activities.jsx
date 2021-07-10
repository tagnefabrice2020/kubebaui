import React from 'react'

const Activities = () => {
    return (
        <div className="container">
                <div className="tile is-ancestor is-horizontal">
                    <div className="tile m-t-20 is-6 is-flex-direction-column">
                        {/* <!-- Heading --> */}
                        <h2 className="sub-title is-12" style={{fontSize: '30px'}}>Activities</h2>
                    </div>
                </div>
                <div className="tile is-ancestor is-vertical c-t-20 box custom-container-overflow">
                    <div className="tile is-parent is-flex-direction-column overflow-x-sm">
                        <table className="table" style={{width: "100%"}}>
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
                                <th>Qualification </th>
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
                                <th>Qualification </th>
                                </tr>
                            </tfoot>
                            <tbody>
                            <tr>
                                <th>3</th>
                                <td>Tottenham </td>
                                <td>38</td>
                                <td>19</td>
                                <td>13</td>
                                <td>6</td>
                                <td>69</td>
                                <td>35</td>
                                <td>+34</td>
                                <td>70</td>
                                <td>Qualification </td>
                                </tr>
                                <tr className="is-selected">
                                <th>4</th>
                                <td>Manchester </td>
                                <td>38</td>
                                <td>19</td>
                                <td>9</td>
                                <td>10</td>
                                <td>71</td>
                                <td>41</td>
                                <td>+30</td>
                                <td>66</td>
                                <td>Qualification </td>
                                </tr>
                                <tr>
                                <th>5</th>
                                <td>Manchester</td>
                                <td>38</td>
                                <td>19</td>
                                <td>9</td>
                                <td>10</td>
                                <td>49</td>
                                <td>35</td>
                                <td>+14</td>
                                <td>66</td>
                                <td>Qualification </td>
                                </tr>
                                <tr>
                                <th>6</th>
                                <td>Southampton</td>
                                <td>38</td>
                                <td>18</td>
                                <td>9</td>
                                <td>11</td>
                                <td>59</td>
                                <td>41</td>
                                <td>+18</td>
                                <td>63</td>
                                <td>Qualification </td>
                                </tr>
                                <tr>
                                <th>7</th>
                                <td>West Ham </td>
                                <td>38</td>
                                <td>16</td>
                                <td>14</td>
                                <td>8</td>
                                <td>65</td>
                                <td>51</td>
                                <td>+14</td>
                                <td>62</td>
                                <td>Qualification</td>
                                </tr>
                            </tbody>
                        </table>                       
                    </div>
                </div>
                <br/>
            </div>
    )
}

export default Activities