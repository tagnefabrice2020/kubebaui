import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import Loader from "../../Loaders/FormLoader"
import { fetchApi, GET, POST } from "../../requests"
import { AddPassportTokenToLocaleStorage, setAxiosToken, setUserInfo } from "../../settings"
 
const Login = (props) => {
    console.log(props)
    const [isAuthChecking, setIsAuthChecking] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState("")

    const errorSpanStyle = {
        color: "rgb(216, 75, 75)",
        display: "block",
        textAlign: "center",
        background: "#ff000066",
        borderRadius: "4px",
        padding: "4px",
        boxshadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
    }
    const {register, handleSubmit, formState} = useForm({
        mode: "onTouched"
    })

    const {isSubmitting, errors} = formState
    
    const onSubmit = async(formData) => {
        setIsAuthChecking(true)
        try {
            const result = await fetchApi(POST, '/signin', formData)
            const token = result.data.data.accessToken
            const userInfo = result.data.data.user
            
            AddPassportTokenToLocaleStorage(token)
            setAxiosToken(token)
            setUserInfo(userInfo)
            setIsAuthChecking(false)
            setLoginErrorMessage("")
            props.onLogin(true)
            props.history.replace("/dashboard")

            const parcels = await fetchApi(GET, '/user/rates')
            console.log(parcels)
            
        } catch (error) {
            const statusCode = error.response ? error.response.status : null
            if (statusCode === 404) {
                console.log(error.response.status)
                setLoginErrorMessage(error.response.data.message)
            }else if(statusCode === 422){
                setLoginErrorMessage(error.message)
            } else {
                setLoginErrorMessage(error.message)
            }
            setIsAuthChecking(false)
        }
    }

    return (
        <div className="columns" style={{minHeight: "100vh"}}>
            <div className="column" style={{maxWidth: "400px", margin: "100px auto"}}>
                <div className="card">
                    <div className="card-header tile is-ancestor is-vertical">
                        <div className="tile is-parent">
                            <img src={props.logo} alt="logo-login" style={{    marginLeft: "50%", transform: "translate(-50%)"}}/>
                        </div>
                        <div className="tile is-parent" style={{display: "block", textAlign: "center"}}>
                            <h2 className="title" style={{fontSize: "16px"}}>Sign Up</h2>
                        </div>
                    </div>
                    <div className="card-body">
                        {/* {console.log(formik)} */}
                            {isAuthChecking === true && <Loader />}
                            {loginErrorMessage === "Network Error" && isAuthChecking === false &&
                                <span style={errorSpanStyle}>Please check your internet <span><i className="fas fa-times"></i></span></span>
                            }
                            {loginErrorMessage === "Invalid credentials" && isAuthChecking === false &&
                                <span style={errorSpanStyle}> {loginErrorMessage} </span>
                            }
                            <form onSubmit={handleSubmit(onSubmit)} style={{marginTop: "8px"}}>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input 
                                            className={`input is-small is-fullwidth`} 
                                            name="email" 
                                            type="email"
                                            {...register("email", {
                                                required: 'Email field is required to proceed',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                    message: "Please enter a valid email."
                                                }
                                            })}
                                        />
                                        {/* <input className="" name="email" type="text" /> */}
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                           {errors.email && <i className="fas fa-circle-exclamation" style={{color: "red"}}></i>}
                                        </span>
                                    </div>
                                    {errors.email && <p className="help is-danger">{errors.email.message}</p>}
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input 
                                            type="password" 
                                            name="password"
                                            className={`input is-small is-fullwidth`} 
                                            {...register("password", {required: 'Password field is required to proceed', minLength: {value: 6, message: "You must enter at least 6 characters"}})}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            
                                        </span>
                                    </div>
                                    {errors.password && <p className="help is-danger">{errors.password.message}</p>}
                                </div>
                                <br />
                                <div className="field">
                                    <div className="control">
                                        <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="button is-primary is-fullwidth"
                                        >Sign in
                                    </button>
                                    </div>
                                </div>
                            </form>
                        <div className="columms m-t-20">
                            <div className="column has-text-centered">
                                <p>Forgot your password? <Link to="/" style={{cursor: "pointer"}}>Recover</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>     
    )
}
export default Login