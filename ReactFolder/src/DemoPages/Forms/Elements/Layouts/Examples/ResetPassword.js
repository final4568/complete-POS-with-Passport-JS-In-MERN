
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { CardBody, CardTitle, Alert } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom'
import { isEmail } from './validator/Validate';
import './Form.scss';

const initialState = {
    email: '',
    err: '',
    success: ''

}

function ResetPassword() {

    const [data, setData] = useState(initialState)
    const { email, err, success } = data;
    const history = useHistory()

    // function for getting data from input and save in variable/state 
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    //main function of submiting the email for forgot password
    const submitHandler = async (e) => {
        e.preventDefault()

        if (!isEmail(email)) {
            return setData({ ...data, err: 'Not A Valid Email', success: '' })
        }
        const res = await axios.post('/user/forgot', { email }).then((res) => {
            return setData({ ...data, err: '', success: res.data.msg })
        }).catch((err) => {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        });
    }

    return (
        <Fragment>
            <div className="main-card mb-3 login_container">
                <div className='form_main_container'>

                    <CardBody>
                        <div className="login_page">
                            <CardTitle>Enter Your Details Below </CardTitle>
                            <h1 style={{ marginBottom: "50px" }}>Forget Your Password</h1>


                            {/* this componenets for showing err and success notification */}
                            <div style={{ width: "95%" }}>
                                {data.err && <Alert color="danger">{data.err}</Alert>}
                                {data.success && <Alert color="dark"> {data.success}
                                    <a href="/" className="alert-link"> Go Back</a>.
                                </Alert>}
                            </div>


                            <form onSubmit={submitHandler}>
                                <div>
                                    <label htmlFor="email" >Email Address</label>
                                    <input type="text" required placeholder="Enter email address" id="email"
                                        value={email} onChange={handleChangeInput} name="email"
                                    />
                                </div>

                                <div className="row">
                                    <button type="submit" className='submit_btn'>Send Email</button>
                                </div>
                                <div className='row'>
                                    <Link className='forgetpass' to="/">Go Back</Link>
                                </div>
                            </form>

                        </div>
                    </CardBody>
                </div>

            </div>
        </Fragment >
    );

}

export default ResetPassword;