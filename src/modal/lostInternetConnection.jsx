import React from 'react'

const LostInternetConnection = () => {
    return (
        <div className="modal">
            <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Connection status</p>
                        <button className="delete" aria-label="close"></button>
                    </header>
                <section className="modal-card-body">
                    <p>Please check your internet connection. It seems you are disconnected!</p>
                </section>
        </div>
    </div>
    )
}

export default LostInternetConnection 