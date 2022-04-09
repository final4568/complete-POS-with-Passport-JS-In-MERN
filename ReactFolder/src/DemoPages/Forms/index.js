import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// Forms

import FormElementsLayouts from "./Elements/Layouts/";
import FormElementsControls from "./Elements/Controls/";
import AllRegisterUser from './Elements/Layouts/Examples/AllRegisterUser/index';
import LoggedUserPass from './Elements/UserProfile/LoggedUserPass';
import LoggedUserProfile from './Elements/UserProfile/LoggedUserProfile'
import EditUser from './Elements/Layouts/Examples/AllRegisterUser/EditUser';
// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

const Forms = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Form Elements */}

                    <Route path={`${match.url}/controls`} component={FormElementsControls} />
                    <Route path={`${match.url}/layouts`} component={FormElementsLayouts} />
                    <Route path={`${match.url}/UserProfile`} component={LoggedUserProfile} />
                    <Route path={`${match.url}/allResgiterusers`} component={AllRegisterUser} />
                    <Route path={`${match.url}/chagedpas`} component={LoggedUserPass} />
                    <Route path={`${match.url}/edituser/:id`} component={EditUser} />

                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Forms;