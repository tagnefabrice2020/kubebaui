import React, {useState} from 'react'
import Uploader from '../../components/Uploader/Uploader'
import Activities from '../Settings/Activities'
import DocumentsTab from '../Settings/DocumentsTab'
import ProfileTab from '../Settings/ProfileTab'
import Roles from '../UserManagement/Roles/Roles'
import Permissions from '../UserManagement/Permissions/Permissions'
import Rates from '../Settings/Rates'
import Branches from '../Branches/Branches'

const Profile = () => {
    // test versioning
    const [tab, setTab] = useState('profile')
    const [docType, setDoctype] = useState("passport")
    let [steps, setSteps] = useState()
    let [PassportSrc, setPassportSrc] = useState('')
    let [frontNationalIdImageUrl, setFrontNationalIdImageUrl] = useState('')
    let [backNationalIdImageUrl, setBackNationalIdImageUrl] = useState('')
    let [nationalIdRequirements, setNationalIdRequirements] = useState([
        {name: 'back'},
        {name: 'front'}
    ])
    let [imagePassportTypeNotSupported, setPassportImageTypeNotSupported] = useState(false)
    let [frontNationalIdImageTypeNotSupported, setFrontNationalIdImageTypeNotSupported] = useState(false)
    let [backNationalIdImageTypeNotSupported, setBackNationalIdImageTypeNotSupported] = useState(false)
    const [webCamOn, switchWebCam] = useState(false)
    
    const [webCamPhotosUrl, setWebCamPhotosUrl] = useState('')
    /**
     * set tab to view.
     * @param {*} selectedTab 
     * @return void
     */
    const switchTab = (selectedTab) => {
        setTab(selectedTab) 
    } 

    /**
     * gets the file extension
     * @param {*} fileName 
     * @returns string
     */
    const getFileExtension = (fileName) => {
        var parts = fileName.split('.')
        return parts[parts.length - 1]
    }

    /**
     * checks if file is an image and returns true or false
     * @param fileName
     * @return boolean
     */
    const isImage = (fileName) => {
        //console.log(getFileExtension(fileName) + ' is image function')
        var extension = getFileExtension(fileName)
        switch (extension.toLowerCase()) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
                return true
        }
        return false
    }

    /**
     * set which type of document to upload for identification
     * @param {*} event 
     * @return void
     */
    const selectDocType = async (event) => {
        if(event.target.id === 'passportSelect'){
            setDoctype('passport')
            setSteps(2)
        } else if (event.target.id === 'idSelected') {
            setDoctype('id')
            setSteps(3)
        }
    }
    /**
     * set passport image for display
     * @param {*} event 
     * @return void
     */
    const onSelectPassport = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener(
                'load',
                () => {
                    setPassportSrc(reader.result)
                }, 
                false
            )
            if(isImage(event.target.files[0].name) === true) {
                reader.readAsDataURL(event.target.files[0])
            } else {
                setPassportSrc('')
                setPassportImageTypeNotSupported(true)
            }
        }
    }
    /**
     * set front ID image for display
     * @param {*} event 
     * @return void
     */
    const onSelectFrontId = event => {
        if(event.target.files && event.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener(
                'load',
                () => setFrontNationalIdImageUrl(reader.result)
            )
            if(isImage(event.target.files[0].name) === true){
                reader.readAsDataURL(event.target.files[0])
            } else {
                setFrontNationalIdImageUrl('')
                setFrontNationalIdImageTypeNotSupported(true)
            }            
        }  
    }
    /**
     * set back ID image for display
     * @param {*} event 
     * @return void
     */
    const onSelectbackId = event  => {
        if(event.target.files && event.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener(
                'load',
                () => setBackNationalIdImageUrl(reader.result)
            )
            if(isImage(event.target.files[0].name) === true){
                reader.readAsDataURL(event.target.files[0])
            } else {
                setBackNationalIdImageUrl('')
                setBackNationalIdImageTypeNotSupported(true) 
            }
        }
    }
    /**
     * switch webcam state to true
     * @param {*}  
     * @return void
     */
    const switchWebcamStateToTrue = async () => {
        switchWebCam(true)
        try {
            let videoSrc = await navigator.mediaDevices.getUserMedia({video: true})
            //console.log(videoSrc)
            document.getElementById('webcam__video').srcObject = videoSrc
        } catch (e) {
            console.log(e)
        }
    }
    /**
     * switch webcam state to false
     * @param {*}  
     * @return void
     */
    const switchWebcamStateToFalse = async () => {
        switchWebCam(false)
    }

    return (
        <div className="container card-container profile-container">
            <div className="tile is-ancestor is-vertical">
                <div className="tile m-t-20 is-6 is-flex-direction-column">
                    {/* <!-- Heading --> */}
                    <h2 className="title is-12" style={{fontSize: '30px'}}>Param??tres</h2>
                </div>
                <div className="tile m-t-10 is-flex-direction-column">
                    <div className="tabs" style={{border: '1px solid #eee'}}>
                        <ul>
                            <li className={tab === 'profile' ? ' is-active' : ''} onClick={() => switchTab('profile')}><a>Profile</a></li>
                            <li className={tab === 'security' ? ' is-active' : ''} onClick={() => switchTab('security')}><a>Security</a></li>
                            <li className={tab === 'activities' ? ' is-active' : ''} onClick={() => switchTab('activities')}><a>Activities</a></li>
                            <li className={tab === 'branches' ? ' is-active' : ''} onClick={() => switchTab('branches')}><a>Branches</a></li>
                            <li className={tab === 'documents' ? ' is-active' : ''} onClick={() => switchTab('documents')}><a>Documents</a></li>
                            <li className={tab === 'roles' ? ' is-active' : ''} onClick={() => switchTab('roles')}><a>Roles</a></li>
                            <li className={tab === 'permissions' ? ' is-active' : ''} onClick={() => switchTab('permissions')}><a>Permissions</a></li>
                            <li className={tab === 'rates' ? ' is-active' : ''} onClick={() => switchTab('rates')}><a>Rates</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            { tab === 'profile' &&
                <ProfileTab />
            }

            { tab === 'activities' &&
                <Activities />
            }

            { tab === 'documents' &&
                <div className="tile is-ancestor is-vertical m-t-10">
                    <DocumentsTab steps={steps} click={selectDocType} />
                    { steps === 2 && 
                        <>
                            { webCamOn === false && <Uploader fileAction={ onSelectPassport} /> }
                            {webCamOn === false && PassportSrc !== '' &&
                                <img id="storage" alt="jsx-a11y/alt-text" className="identificationUploadImage" src={PassportSrc} />
                            }

                            {webCamOn === true && 
                                <>
                                    <div className="video__wrapper">
                                        <div className="video__container">
                                            <video autoPlay id="webcam__video" width="400" height="400"></video>
                                        </div>
                                    </div>
                                </>
                            }
                            <br />
                            { PassportSrc !== '' &&
                            <div className="tile is-horizontal" style={{width: 'max-content', marginLeft: '50%', transform: 'translate(-50%)'}}>
                                {webCamPhotosUrl !== '' && 
                                    <div>
                                        <button className="button is-small is-primary" style={{
                                            width: 'min-content', marginLeft: '-2px'
                                            }}>Save
                                        </button>
                                    </div>
                                }
                                &nbsp;
                                {webCamOn === false &&
                                    <div>
                                        <button className="button is-small is-primary" style={{
                                        width: 'min-content',
                                        }} onClick={() => switchWebcamStateToTrue()}>next</button>
                                    </div>
                                } 
                                {webCamOn === true &&
                                    <div>
                                        <button className="button is-small is-primary" style={{
                                        width: 'min-content',
                                        }} onClick={() => switchWebcamStateToFalse()}>Previous</button>
                                    </div>
                                }                              
                            </div>
                            }
            
                            <br />
                        </>  
                    }
                    { steps === 3 && webCamOn === false &&
                        <div className="tile is-horizontal" style={{width: 'fit-content',transform: 'translate(-50%)',marginLeft: '51%'}}>
                            {nationalIdRequirements.map(type => {
                                if(type.name === 'front') 
                                    return (
                                        <div>
                                            <Uploader id={type.name} fileAction={ onSelectFrontId } />
                                            {frontNationalIdImageUrl !== '' &&
                                                <img id="storage" alt="jsx-a11y/alt-text" className="identificationUploadImage" src={frontNationalIdImageUrl} />
                                            }
                                        </div>
                                    )
                                else {
                                    return (
                                        <div>
                                            <Uploader id={type.name} fileAction={ onSelectbackId } />
                                            {backNationalIdImageUrl !== '' &&
                                                <img id="storage" alt="jsx-a11y/alt-text" className="identificationUploadImage" src={backNationalIdImageUrl} />
                                            }
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    }
                </div>
            }

            { tab === 'roles' &&
                <Roles />
            }

            { tab === 'permissions' &&
                <Permissions />
            }

            { tab === 'rates' &&
                <Rates />
            }

            {   tab === 'branches' &&
                <Branches />
            }
        </div>
        
    )
}

export default Profile