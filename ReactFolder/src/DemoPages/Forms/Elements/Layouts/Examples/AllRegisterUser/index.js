import React, { Fragment } from 'react'
import Tabs from 'react-responsive-tabs';
import PageTitle from '../../../../../../Layout/AppMain/PageTitle';

// Examples

import AllRegisterUser from './AllResgiterUser';
import AddNewUser from './AddNewUser';
import { useSelector } from 'react-redux';
const tabsContent = [
    {
        title: 'All User ',
        content: <AllRegisterUser />
    },
    {
        title: 'Add New User',
        content: <AddNewUser />
    }


];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}


// import { Container } from './styles';

function FormElementsLayouts() {
    const auth = useSelector(state => state.authReducer)
    const {isAdmin} =auth
    

    if(isAdmin){
        return(
        <Fragment>
        <PageTitle
            heading="All Registered User Of System"
            subheading="Build whatever layout you need with our ArchitectUI framework."
            icon="pe-7s-graph text-success"
        />
        <Tabs tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
        </Fragment>
        )
    }else{
        return (
            <h1>Your Not Authorized</h1>
            )
    }
 
}

export default FormElementsLayouts;
// class FormElementsLayouts extends React.Component {

//     render() {
//         return (
            
//         )
//     }
// }

// export default FormElementsLayouts;



