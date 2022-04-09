import React, { useEffect } from 'react';
// import configureStore from './config/configureStore';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main_login from './DemoPages/Forms/Elements/Layouts/Examples/Main_login';
import NotFound from './NotfoundComponent/NotFound';
import { useDispatch, useSelector } from 'react-redux'
import ThemeFiles from './ThemeFiles';
import axios from 'axios';
import { dispactchlogin, dispatchGetUser, fetchUser } from './Actions';
// import routes from './Routes';
import Dashboards from './DemoPages/Dashboards/index';
import ResetPassword from './DemoPages/Forms/Elements/Layouts/Examples/ResetPassword';
// import SetPassword from './DemoPages/Forms/Elements/Layouts/Examples/SetPassword';
import './App.scss'
// import AddNewUser from './DemoPages/Forms/Elements/Layouts/Examples/AllRegisterUser/AddNewUser';
// import LoggedUserProfile from './DemoPages/Forms/Elements/Layouts/Examples/Profile/LoggedUserProfile';
import SetPassword from './DemoPages/Forms/Elements/Layouts/Examples/SetPassword'
// import LoggedUserPass from './DemoPages/Forms/Elements/UserProfile/LoggedUserPass';
import LoadingComponent from './Loader/LoadingComponent';

const App = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.tokenreducer)
    const auth = useSelector(state => state.authReducer)
    const { isLogged, isAdmin } = auth

    // const [isAuthenticated, setIsAuthenticated] = useState(false)

    // const loading = (
    //     <div className="pt-3 text-center">
    //         <div className="sk-spinner sk-spinner-pulse"></div>
    //     </div>
    // );


    // function LoadingSpinner() {
    //     return (
    //         <div className="spinner-container">
    //             <div className="loading-spinner">
    //             </div>
    //         </div>
    //     );
    // }


    useEffect(() => {

        const refresh_token = localStorage.getItem('token')
        if (refresh_token) {
            const getToken = async () => {
                const res = await axios.post('user/refresh_token', null).then((res) => {
                    console.log(res)
                    dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
                    // setIsAuthenticated(true)
                }).catch((err) => {
                    console.log(err)
                })
            }
            getToken()
        }

    }, [isLogged, dispatch])



    useEffect(() => {
        if (token) {
            const getUser = () => {
                dispatch(dispactchlogin())

                return fetchUser(token).then(res => {
                    dispatch(dispatchGetUser(res))
                })
            }
            getUser()
        }
    }, [token, dispatch])

    return (
        <>


            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={!isLogged ? Main_login : LoadingComponent} />
                    <Route exact path="/dashboard" component={isLogged ? ThemeFiles : Main_login} />
                    <Route exact path="/resetPassword" component={ResetPassword} />
                    <Route exact path="/user/reset/:token" component={SetPassword} />
                    <Route exact path="/loading" component={LoadingComponent} />

                    {/* <Route exact path="/allmanagers" component={UserList} />
                    {/* <Route exact path="/theme" component={isAdmin ? ThemeFiles : Main_login} />
                    <Route exact path="/chagedpassword" component={isLogged ? LoggedUserPass : Main_login} />
                    <Route exact path="/addnewmanager" component={isAdmin ? AddNewUser : ThemeFiles} />
                    <Route exact path="/theme#/userProfile" component={isLogged ? LoggedUserProfile : Main_login} /> */}
                    <Route exact path="*" component={NotFound} />
                </Switch>
            </BrowserRouter>






        </>
    )
}

export default App
// unregister();

// registerServiceWorker();

