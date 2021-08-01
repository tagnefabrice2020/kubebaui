import React from 'react'
import Loader from '../Loaders/Loader'

const LostInternetConnection = () => {
    return (
        <div className="page-loader">
            <div className="page-loader-container">
                <Loader />
            </div>
        </div>
    )
}

export default LostInternetConnection 