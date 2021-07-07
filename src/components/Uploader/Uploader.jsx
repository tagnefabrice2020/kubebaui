import React, { Component } from 'react'

class Uploader extends Component {
    render () {
        return (
            <div className="tile is-parent is-flex-direction-column is-justify-content-center">
                <div className="tile is-justify-content-center">
                    <input type="file" name="" id={this.props.id} onChange={this.props.fileAction} className="identificationInput"/>
                </div>
            </div>
        )
    }
}

export default Uploader