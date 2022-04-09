
// import { Container } from './styles';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { CardTitle, Alert } from 'reactstrap'
import { useSelector } from 'react-redux';
import { isLength, isMatch } from '../Layouts/Examples/validator/Validate';

const initialState = {
    passwordpre: '',
    newpassword: '',
    cf_password: '',
    err: '',
    success: ''
}

function LoggedUserPass() {
    const [data, setData] = useState(initialState)
    const { passwordpre, newpassword, cf_password, err, success } = data
    const token = useSelector(state => state.tokenreducer)

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const passwordChangehandler = async (e) => {
        e.preventDefault();

        if (isLength(newpassword)) return setData({ ...data, err: "Password must be at least 6 characters.", success: '' })
        if (!isMatch(newpassword, cf_password)) return setData({ ...data, err: "Password did not match.", success: '' })

        const res = await axios.post('user/comparirepass', { passwordpre, newpassword }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            return setData({ ...data, err: '', success: res.data.msg })
        }).catch(err => {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        });
    }


    return (
        <Fragment>
            <div className="app-main__inner">
                <div className="login_page">
                    <CardTitle>Enter Your Details Below </CardTitle>
                    <h1 style={{ marginBottom: "50px" }}>Set Your New Password</h1>

                    {/* this componenets for showing err and success notification */}
                    <div style={{ width: "95%" }}>
                        {data.err && <Alert color="danger">{data.err}</Alert>}
                        {data.success && <Alert color="success"> {data.success}
                            <a href="/dashboard#/forms/UserProfile" className="alert-link"> Go Back</a>.

                        </Alert>}
                    </div>


                    <form onSubmit={passwordChangehandler}>
                        <div>
                            <label htmlFor="passwordpre">Previous password</label>
                            <input type="password" required placeholder="Enter Previous password" id="passwordpre" name="passwordpre"
                                value={passwordpre} onChange={handleChangeInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">New Password</label>
                            <input type="password" required placeholder="Enter your New password" id="newpassword" name="newpassword"
                                value={newpassword} onChange={handleChangeInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="cf_password">Retype Password</label>
                            <input type="password" required placeholder="Confirm password" id="cf_password" name="cf_password"
                                value={cf_password} onChange={handleChangeInput}
                            />
                        </div>
                        <div className="row">
                            <button type="submit" className='submit_btn'>Changed Now</button>
                        </div>
                        {/* <div className='row'>
                                    <Link className='forgetpass' to="/">Go Back</Link>

                                </div> */}
                    </form>

                </div>
            </div>
        </Fragment>


    )
}

export default LoggedUserPass;