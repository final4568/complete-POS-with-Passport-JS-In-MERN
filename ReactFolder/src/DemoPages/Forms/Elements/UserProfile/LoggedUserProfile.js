import React, { Fragment, useState } from 'react';
import { CardBody, Row, Col, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './profile.scss'


const initialState = {
    name: '',
    email: '',
    password: '',
    cfpassword: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    err: '',
    success: ''
}


function FormsFeedback() {

    const auth = useSelector(state => state.authReducer)
    const token = useSelector(state => state.tokenreducer)
    const { user } = auth

    const [data, setData] = useState(initialState);
    const { name, email, password, cfpassword, address, city, state, zip, err, success } = data

    const [avatar, setavatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ischecked, setChecked] = useState(false);

    const [role, setRole] = useState(0)

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: '', success: '', })
    }

    const checkHandler = () => {
        setChecked(!ischecked)
        if (!ischecked) {
            setRole(1)
        } else {
            setRole(0)
        }

    }

    const updateInfor = async (e) => {
        e.preventDefault()
        try {
            await axios.patch('/user/update', {
                name: name ? name : user.name,
                address: address ? address : address.address,
                name: name ? name : user.name,
                city: city ? city : user.city,
                state: state ? state : user.state,
                role: role ? role : user.role,
                avatar: avatar ? avatar : user.avatar

            }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setData({ ...data, err: '', success: "Updated Success!" })
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    const changeImge = async (e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]
            if (!file) return setData({ ...data, err: "No files were uploaded.", success: '' })

            if (file.size > 1024 * 1024)
                return setData({ ...data, err: "Size too large.", success: '' })

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({ ...data, err: "File format is incorrect.", success: '' })

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('user/img/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: `Bearer ${token}` }
            })
            setavatar(res.data.url)
            setLoading(false)


        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <Fragment>
            <div className="main-card mb-3 login_container">
                <div className='form_main_container'>

                    <CardBody>
                        <div className="Register_page">
                            <div style={{ width: "100%" }}>
                                {data.success && <Alert color="success">{data.success}</Alert>}
                                {data.err && <Alert color="danger">{data.err}</Alert>}
                            </div>


                            <Form onSubmit={updateInfor} style={{ marginBottom: "60px" }}>
                                <Row>
                                    <Col md={4}>
                                        {/* user Image and name details */}
                                        <div className='profile_details'>
                                            <h1>{user.role === 1 ? "Admin Profile" : "Manage"}</h1>
                                            <div className='avatar'>
                                                <img src={avatar ? avatar : user.avatar} alt="" width="100%" />
                                                {loading && <div className='loading'>Loading...</div>}
                                                <span>
                                                    <i class="fa fa-camera" aria-hidden="true"></i>
                                                    <p >Change Photo</p>
                                                    <input type="file" name="file" id="file_up" onChange={changeImge} />
                                                </span>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col md={8} >
                                        <FormGroup>
                                            <Label for="exampleEmail11">User Role</Label>
                                            <Input type="email" name="email" id="exampleEmail11"
                                                placeholder="Enter User Email Address" disabled value={user.role === 1 ? "Admin" : "Manager"} />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="exampleEmail11">Email</Label>
                                            <Input type="email" name="email" id="exampleEmail11"
                                                placeholder="Enter User Email Address" disabled value={user.email} onChange={changeHandler} />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="exampleEmail11">name</Label>
                                            <Input type="text" name="name" id="name"
                                                placeholder="Enter name" value={name ? name : user.name} onChange={changeHandler} />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="exampleAddress">Address</Label>
                                            <Input type="text" name="address" id="exampleAddress"
                                                placeholder="Enter User Address" value={address ? address : user.address} onChange={changeHandler} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleCity">City</Label>
                                            <Input type="text" name="city" id="exampleCity" value={city ? city : user.city} onChange={changeHandler} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleState">State</Label>
                                            <Input type="text" name="state" id="exampleState" value={state ? state : user.state} onChange={changeHandler} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Button color="primary" className="mt-2" type='submit'>Update Now</Button>
                            </Form>

                        </div>

                    </CardBody>
                </div>

            </div>
        </Fragment >
    );
}

export default FormsFeedback;

