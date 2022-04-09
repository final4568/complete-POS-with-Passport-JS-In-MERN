import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Card, } from 'reactstrap';// import { Container } from './styles';
import { Link, useHistory } from 'react-router-dom'
import './loading.scss'
// import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
// import avatar2 from '../../../assets/utils/images/avatars/2.jpg';
// import avatar3 from '../../../assets/utils/images/avatars/3.jpg';
// import avatar4 from '../../../assets/utils/images/avatars/4.jpg';

import { useSelector, useDispatch } from 'react-redux';
import { dispatchGetallUser, fetchallUser } from '../Actions/userAction';

function LoadingComponent() {
    const history = useHistory()

    const auth = useSelector(state => state.authReducer)
    const token = useSelector(state => state.tokenreducer)
    const users = useSelector(state => state.userReducer)
    const { isAdmin } = auth
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAdmin) {
            fetchallUser(token).then(res => {
                dispatch(dispatchGetallUser(res))
            })
            console.log(users)
        }
    }, [token, isAdmin, dispatch])

    setTimeout(() => {
        history.push('/dashboard')
    }, 500)
    return (
        <>
            <div className='loading_outer'>
                <div className='loading_container'>
                    <h1>Loading ... ! Wait</h1>
                    <div class="loader"></div>
                </div>
            </div>

        </>

    );

}

export default LoadingComponent;
