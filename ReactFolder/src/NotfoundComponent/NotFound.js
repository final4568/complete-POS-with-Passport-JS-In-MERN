import React from 'react';
import './notfoundpage.scss'
// import { Container } from './styles';
import { useHistory } from 'react-router-dom'
function NotFound() {
    const history = useHistory()

    const clickHandler = () => {
        history.push('/')
    }
    return (
        <div className='notfound'>
            <h1>404</h1>
            <p>This Page is not Found in This Project</p>
            <button onClick={clickHandler}>Go Back</button>
        </div>
    );
}

export default NotFound;