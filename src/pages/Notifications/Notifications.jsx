import React, { Component } from 'react'

class Notifications extends Component {
   
    render(){
        return (
            <div className="container card-container">
                <div className="tile is-ancestor is-horizontal">
                    <div className="tile m-t-20 is-6 is-flex-direction-column">
                        {/* <!-- Heading --> */}
                        <h2 className="title is-12" style={{fontSize: '30px'}}>Notifications</h2>
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
                <div className="tile is-ancestor is-vertical c-t-20 box">
                    <div className="tile is-parent">
                        <div className="tile is-child">
                            <button className="button is-small is-primary" >Clear &nbsp;<i className="fas fa-eraser"></i></button>
                        </div>
                    </div>
                    < hr />
                    <div className="tile is-parent is-flex-direction-column">
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
                                <th>3</th>
                                <td><a href="https://en.wikipedia.org/wiki/Tottenham_Hotspur_F.C." title="Tottenham Hotspur F.C.">Tottenham Hotspur</a></td>
                                <td>38</td>
                                <td>19</td>
                                <td>13</td>
                                <td>6</td>
                                <td>69</td>
                                <td>35</td>
                                <td>+34</td>
                                <td>70</td>
                                <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
                                </tr>
                                <tr className="is-selected">
                                <th>4</th>
                                <td><a href="https://en.wikipedia.org/wiki/Manchester_City_F.C." title="Manchester City F.C.">Manchester City</a></td>
                                <td>38</td>
                                <td>19</td>
                                <td>9</td>
                                <td>10</td>
                                <td>71</td>
                                <td>41</td>
                                <td>+30</td>
                                <td>66</td>
                                <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Play-off_round" title="2016–17 UEFA Champions League">Champions League play-off round</a></td>
                                </tr>
                                <tr>
                                <th>5</th>
                                <td><a href="https://en.wikipedia.org/wiki/Manchester_United_F.C." title="Manchester United F.C.">Manchester United</a></td>
                                <td>38</td>
                                <td>19</td>
                                <td>9</td>
                                <td>10</td>
                                <td>49</td>
                                <td>35</td>
                                <td>+14</td>
                                <td>66</td>
                                <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Group_stage" title="2016–17 UEFA Europa League">Europa League group stage</a></td>
                                </tr>
                                <tr>
                                <th>6</th>
                                <td><a href="https://en.wikipedia.org/wiki/Southampton_F.C." title="Southampton F.C.">Southampton</a></td>
                                <td>38</td>
                                <td>18</td>
                                <td>9</td>
                                <td>11</td>
                                <td>59</td>
                                <td>41</td>
                                <td>+18</td>
                                <td>63</td>
                                <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Group_stage" title="2016–17 UEFA Europa League">Europa League group stage</a></td>
                                </tr>
                                <tr>
                                <th>7</th>
                                <td><a href="https://en.wikipedia.org/wiki/West_Ham_United_F.C." title="West Ham United F.C.">West Ham United</a></td>
                                <td>38</td>
                                <td>16</td>
                                <td>14</td>
                                <td>8</td>
                                <td>65</td>
                                <td>51</td>
                                <td>+14</td>
                                <td>62</td>
                                <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Third_qualifying_round" title="2016–17 UEFA Europa League">Europa League third qualifying round</a></td>
                                </tr>
                            </tbody>
                        </table>                       
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}

export default Notifications