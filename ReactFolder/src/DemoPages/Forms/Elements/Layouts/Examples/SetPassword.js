
// import { Container } from './styles';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { CardBody, CardTitle, Alert } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom'
import { isMatch, isLength } from './validator/Validate';
import './Form.scss';

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function SetPassword() {
    const history = useHistory()

    const [data, setData] = useState(initialState)
    const { token } = useParams()
    const { password, cf_password, err, success } = data

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }


    const passwordChangehandler = async (e) => {
        e.preventDefault();

        if (isLength(password)) return setData({ ...data, err: "Password must be at least 6 characters.", success: '' })
        if (!isMatch(password, cf_password)) return setData({ ...data, err: "Password did not match.", success: '' })

        const res = await axios.patch(token, { password }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
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
                            <h1 style={{ marginBottom: "50px" }}>Set New Password</h1>

                            {/* this componenets for showing err and success notification */}
                            <div style={{ width: "95%" }}>
                                {data.success && <Alert color="success">{data.success}</Alert>}
                                {data.err && <Alert color="danger">{data.err}</Alert>}
                            </div>

                            <form>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" required placeholder="Enter password" id="password" name="password"
                                        value={password} onChange={handleChangeInput}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cf_password">Retype Password</label>
                                    <input type="password" required placeholder="Enter password" id="cf_password" name="cf_password"
                                        value={cf_password} onChange={handleChangeInput}
                                    />
                                </div>
                                <div className="row">
                                    <button className='submit_btn' onClick={passwordChangehandler}>Changed Now</button>
                                </div>
                            </form>

                        </div>
                    </CardBody>
                </div>

            </div>
        </Fragment >
    )
}

export default SetPassword;