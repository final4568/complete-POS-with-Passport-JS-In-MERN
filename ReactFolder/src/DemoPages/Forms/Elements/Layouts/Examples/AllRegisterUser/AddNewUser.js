import React, { Fragment, useState } from 'react';
import {
    Col, Row, CardBody, CardTitle, Button, Form, FormGroup, Label, Input, Alert
} from 'reactstrap';
import { isEmail, isMatch, isLength, isEmpty } from '../validator/Validate'
import axios from 'axios';


const initialstate = {
    name: '',
    email: '',
    password: '',
    cfpassword: '',
    address: '',
    city: '',
    state: '',
    err: '',
    success: ''
}

function AddNewUser() {
    const [user, setUser] = useState(initialstate);
    const { name, email, password, cfpassword, address, city, state } = user
    const [ischecked, setChecked] = useState(false);
    const [role, setRole] = useState(0)

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '', })
    }
    const checkHandler = () => {
        setChecked(!ischecked)
        if (!ischecked) {
            setRole(1)
        } else {
            setRole(0)
        }
    }

    const registerUser = async (e) => {
        e.preventDefault()

        if (isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(cfpassword) || isEmpty(address) || isEmpty(city) || isEmpty(state)) {
            return setUser({ ...user, err: "All Field Must Required" })
        }
        if (!isEmail(email)) {
            return setUser({ ...user, err: "Not A Vaild Email", success: '' })
        }

        if (isLength(password)) {
            return setUser({ ...user, err: "Password must be at least 6 characters", success: '' })
        }
        if (!isMatch(password, cfpassword)) {
            return setUser({ ...user, err: "Password Not Matching", success: '' })
        }

        const res = await axios.post('/user/register', { name, email, password, address, city, state, role }).then((res) => {
            setUser({ ...user, err: '', success: res.data.msg })
        }).catch((err) => {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: '' })
        })

    }
    return (
        <Fragment>


            <div className="app-main__inner">
                <Fragment>
                    <div className="main-card mb-3 login_container">
                        <div className='form_main_container'>

                            <CardBody>
                                <div className="Register_page">
                                    <CardTitle>Enter User Details Below </CardTitle>
                                    <h1 style={{ marginBottom: "30px" }}>Register New User</h1>

                                    {/* this componenets for showing err and success notification */}
                                    <div style={{ width: "100%" }}>
                                        {user.err && <Alert color="danger">{user.err}</Alert>}
                                        {user.success && <Alert color="success"> {user.success}
                                            <a href="/forms/allResgiterusers" className="alert-link"> Go Back</a>.

                                        </Alert>}
                                    </div>

                                    <Form onSubmit={registerUser}>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleEmail11">name</Label>
                                                    <Input type="text" name="name" id="name"
                                                        placeholder="Enter name" value={name} onChange={changeHandler} />
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="exampleEmail11">Email</Label>
                                                    <Input type="email" name="email" id="exampleEmail11"
                                                        placeholder="Enter User Email Address" value={email} onChange={changeHandler} />
                                                </FormGroup>

                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="examplePassword11">Password</Label>
                                                    <Input type="password" name="password" id="examplePassword11"
                                                        placeholder="Enter User Password" value={password} onChange={changeHandler} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="examplePassword11">Confirm Password</Label>
                                                    <Input type="password" name="cfpassword" id="exampcfpassword"
                                                        placeholder="Confirm Password" value={cfpassword} onChange={changeHandler} />
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <FormGroup>
                                            <Label for="exampleAddress">Address</Label>
                                            <Input type="text" name="address" id="exampleAddress"
                                                placeholder="Enter User Address" value={address} onChange={changeHandler} />
                                        </FormGroup>

                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleCity">City</Label>
                                                    <Input type="text" name="city" id="exampleCity" value={city} onChange={changeHandler} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleState">State</Label>
                                                    <Input type="text" name="state" id="exampleState" value={state} onChange={changeHandler} />
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <FormGroup check>
                                            <Input type="checkbox" name="check" id="exampleCheck" checked={ischecked} onChange={checkHandler} />
                                            <Label for="exampleCheck" >{role === 1 ? "Is Admin" : "Is Manager"}</Label>
                                        </FormGroup>

                                        <Button color="primary" className="mt-2" type='submit'>Register Now</Button>
                                    </Form>

                                </div>
                                {/* <div className="result" style={{ marginTop: "20px", fontWeight: 800 }}>
                                            This User Will  be : {ischecked ? "Admin" : "By Default Manager"}
                                        </div> */}
                            </CardBody>
                        </div>

                    </div>
                </Fragment >

            </div>
        </Fragment>
    );

}

export default AddNewUser;



