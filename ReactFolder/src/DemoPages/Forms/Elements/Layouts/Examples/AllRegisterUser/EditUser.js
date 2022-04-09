import React, { Fragment, useState, useEffect } from 'react';
import { CardBody, Row, Col, Alert, Form, FormGroup, Label, Input, Button, } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

function EditUser() {
    const { id } = useParams();
    const [edituser, setEditUser] = useState([]);
    const history = useHistory();

    const auth = useSelector(state => state.authReducer)
    const users = useSelector(state => state.userReducer);
    const token = useSelector(state => state.tokenreducer);

    const [err, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [role, setRole] = useState('')

    useEffect(() => {

        if (users.length !== 0) {
            users.forEach(user => {
                if (user._id === id) {
                    setEditUser(user)
                    setRole(user.role)
                }
            })
        }
    }, [users, id])

    useEffect(() => {
        if (id === auth.user._id) {
            setError("You are LoggedIn and never Changed Role By Your Self")
            history.push('/forms/UserProfile')
        }
    }, [auth])

    const handleUpdate = async (e) => {
        e.preventDefault()

        const res = await axios.patch(`user/updaterole/${id}`, { role }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setSuccess(res.data.msg)
        }).catch((err) => {
            err.response.data.msg && setError(err.response.data.msg)
        })
    }



    return (
        <Fragment>
            <div className="main-card mb-3 login_container">
                <div className='form_main_container'>

                    <CardBody>
                        <div className="Register_page">

                            {/* this componenets for showing err and success notification */}
                            <div style={{ width: "100%" }}>
                                {success && <Alert color="success">{success}</Alert>}
                                {err && <Alert color="danger">{err}</Alert>}
                            </div>

                            <Form onSubmit={handleUpdate} style={{ marginBottom: "60px" }}>
                                <Row>
                                    <Col md={6}>

                                        <h1>{role === 1 ? "Admin" : "Manage"}</h1>

                                        <FormGroup>
                                            <Label for="exampleEmail11">User Email</Label>
                                            <Input type="email" name="email" id="exampleEmail11"
                                                placeholder="Enter User Email Address" disabled value={edituser.name} />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="exampleEmail11">User Email</Label>
                                            <Input type="email" name="email" id="exampleEmail11"
                                                placeholder="Enter User Email Address" disabled value={edituser.email} />
                                        </FormGroup>

                                        <FormGroup>
                                            <select className="selection" value={role} onChange={(e) => setRole(e.target.value)}>
                                                <option className="option" value="0">Role</option>
                                                <option className="option" value="1">Admin</option>
                                                <option className="option" value="0">Manager</option>
                                            </select>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button color="primary" className="mt-2" type='submit'>Update Now</Button>
                            </Form>

                        </div>

                    </CardBody>
                </div>

            </div >
        </Fragment >
    );
}

export default EditUser;

