import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// DASHBOARDS

import BasicDashboard from './Basic/index';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

function Dashboards({ match }) {


    return (
        <Fragment>
            <AppHeader />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <BasicDashboard />
                    </div>
                    <AppFooter />
                </div>
            </div>
        </Fragment>
    );

}

export default Dashboards;



// const Dashboards = ({ match }) => (
//     const auth = useSelector();

//     return(
//     <Fragment>
//         <AppHeader />
//         <div className="app-main">
//             <AppSidebar />
//             <div className="app-main__outer">
//                 <div className="app-main__inner">
//                     <BasicDashboard />
//                 </div>
//                 <AppFooter />
//             </div>
//         </div>
//     </Fragment>
//     )
// );


// export default Dashboards;


