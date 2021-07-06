import React, {useState} from 'react'

const DocumentsTab = (props) => {

    return (  
        <div className="tile is-parent is-flex-grow-2 is-vertical custom-box">
            <div className="tile is-horizontal is-flex-direction-row is-justify-content-space-between">
                <div className=''>
                    Upload your Identifications documents here
                </div>
                <div className=''>
                    {props.steps} steps left
                    <form>
                        <div className="control">
                            <label className="radio">
                                <input type="radio" name="choose" id="passportSelect" onClick={(event) => props.click(event)} />
                                Passport
                            </label>
                            <label className="radio">
                                <input type="radio" name="choose" id="idSelected" onClick={(event) => props.click(event)} />
                                National ID
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
 
export default DocumentsTab;