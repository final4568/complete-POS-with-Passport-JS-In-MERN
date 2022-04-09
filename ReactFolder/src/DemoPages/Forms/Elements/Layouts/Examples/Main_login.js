
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { CardBody, Alert, CardTitle } from 'reactstrap';
import { dispactchlogin } from '../../../../../Actions/index'
import './Form.scss';
import axios from 'axios';

const initialstate = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Main_login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [user, setUser] = useState(initialstate)
    const { email, password } = user


    //Handler function that halde the state of input field including email and password    
    const handlerChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    //Login Funcationality
    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post("user/login", { email, password }).then((res) => {
            setUser({ ...user, err: '', success: res.data.msg })
            localStorage.setItem('token', res.data.refresh_token)
            dispatch(dispactchlogin());

            history.push('/loading')

        }).catch((err) => {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        })
    }

    return (
        <Fragment>
            <div className="main-card mb-3 login_container">
                <div className='form_main_container'>

                    <CardBody>
                        <div className="login_page">
                            <CardTitle>Enter Your Details Below </CardTitle>
                            <h1 style={{ marginBottom: "50px" }}>Login To Admin Panel</h1>

                            {/* this componenets for showing err and success notification */}
                            <div style={{ width: "95%" }}>
                                {user.success && <Alert color="success">{user.success}</Alert>}
                                {user.err && <Alert color="danger">{user.err}</Alert>}
                            </div>

                            {/* form for login  */}
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" >Email Address</label>
                                    <input type="text" required placeholder="Enter email address" id="email"
                                        value={email} onChange={handlerChange} name="email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" required placeholder="Enter password" id="password" name="password"
                                        value={password}
                                        onChange={handlerChange}
                                    />
                                </div>

                                <div className="row">
                                    <button type="submit" className='submit_btn'>Login</button>
                                </div>
                                <div className='row'>
                                    <Link className='forgetpass' to="/resetPassword">Forgot your password?</Link>

                                </div>
                            </form>
                        </div>
                    </CardBody>
                </div>
            </div>
        </Fragment >
    )
}

export default Main_login;
