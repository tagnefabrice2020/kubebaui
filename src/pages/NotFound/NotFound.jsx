import React from "react"
import{Link} from 'react-router-dom'

const NotFound = () => {
    return <div>
        not found <br />
        <Link to="/">home</Link>
    </div>
}

export default NotFound