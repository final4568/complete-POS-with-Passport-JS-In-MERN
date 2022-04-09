
// import { Container } from './styles';
import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Card, Alert, } from 'reactstrap';// import { Container } from './styles';
import { Link } from 'react-router-dom'
import AppFooter from '../../../../../../Layout/AppFooter';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchGetallUser, fetchallUser } from '../../../../../../Actions/userAction';
import axios from 'axios';

function AllRegisterUser() {
    const auth = useSelector(state => state.authReducer)
    const token = useSelector(state => state.tokenreducer)
    const users = useSelector(state => state.userReducer)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [err, setErr] = useState('')
    const [refresh, setRefresh] = useState(false);


    const { isAdmin, isLogged } = auth
    const dispatch = useDispatch();

    useEffect(() => {
        if (refresh) return setRefresh(false);
        if (isAdmin) {
            fetchallUser(token).then(res => {
                dispatch(dispatchGetallUser(res))
            })
            console.log(users)
        }
    }, [token, isAdmin, dispatch, refresh])


    const DeleteUser = async (id) => {
        if (id !== auth.user._id) {
            setLoading(true)
            try {

                await axios.delete(`user/delete/${id}`).then((res) => {
                    setSuccess(res.data.msg)
                    setErr('')
                })
                setRefresh(true)

            } catch (err) {
                setSuccess('')
                setErr(err.response.data.msg)
            }
        } else {
            setErr("Your can't delete Your Account..! ")
        }
    }

    return (
        <Fragment>
            <Row style={{ marginTop: "50px" }}>

                {/* this componenets for showing err and success notification */}
                <div style={{ width: "100%" }}>
                    {success && <Alert color="success">{success}</Alert>}
                    {err && <Alert color="danger">{err}</Alert>}
                </div>

                <Col md="12">
                    <Card className="main-card mb-3">

                        <div className="table-responsive">
                            <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th >Email</th>
                                        <th >Role</th>
                                        <th >Looged</th>
                                        <th >Action</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        users.map(usr => (
                                            <tr key={usr._id}>
                                                <td>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left me-3">
                                                                <div className="widget-content-left">
                                                                    <img width={40} className="rounded-circle" src={usr.avatar} alt="Avatar" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading" style={{ textTransform: "capitalize" }}>{usr.name}</div>
                                                                <div className="widget-subheading opacity-7">
                                                                    {

                                                                        usr.role === 1
                                                                            ? <i className="fa fa-check" title="Admin">Admin</i>
                                                                            : <i className="fa fa-times" title="User">Manager</i>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{usr.email}</td>
                                                <td>
                                                    {

                                                        usr.role === 1
                                                            ? <i className="fa fa-check" title="Admin">Admin</i>
                                                            : <i className="fa fa-times" title="User">Manager</i>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        (usr._id === auth.user._id)
                                                            ? <i className="fa fa-check" title="Admin" style={{ color: "green", fontWeight: "800" }}>Active</i>
                                                            : <i className="fa fa-times" title="User">OffLine</i>
                                                    }

                                                </td>






                                                <td>
                                                    <td className="text-center">
                                                        <Link to={`/forms/edituser/${usr._id}`}>
                                                            <button type="button" className="btn btn-warning btn-sm">Edit Role</button>
                                                        </Link>
                                                    </td>

                                                    <td className="text-center">
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => {
                                                            if (
                                                                window.confirm(
                                                                    `Are you sure you wish to delete this?`
                                                                )
                                                            ) DeleteUser(usr._id)
                                                        }}>Delete User</button>
                                                    </td>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* <div className="d-block text-center card-footer">
                                    <Link to="/addnewmanager">
                                        <button className="btn-wide btn btn-success">Register New Manager</button></Link>
                                </div> */}
                    </Card>
                </Col>
            </Row>


            <AppFooter />
        </Fragment >

    );
}

export default AllRegisterUser;