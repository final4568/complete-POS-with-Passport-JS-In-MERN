import React, { Fragment } from 'react';
import { DropdownToggle, DropdownMenu, Nav, NavItem, NavLink, UncontrolledButtonDropdown } from 'reactstrap';
// import { toast, Bounce } from 'react-toastify';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
// import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
// import { Container } from './styles';

//Custome dependencies start from
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function UserBox() {

    const auth = useSelector(state => state.authReducer)
    const { user, isLogged } = auth

    //  Logged Out Function for Admin LoggedOut
    const logout = async () => {
        try {
            await axios.get('/user/logout');
            localStorage.removeItem('persist:root');
            window.location.href = "/"
        } catch (error) {
            window.location.href = "/"
        }
    }



    // const notify2 = toastId => toast("You don't have any new items in your calendar for today! Go out and play!", {
    //     transition: Bounce,
    //     closeButton: true,
    //     autoClose: 5000,
    //     position: 'bottom-center',
    //     type: 'success'
    //     // Toasting Functions
    // });



    return (
        <Fragment>
            <div className="header-btn-lg pe-0">
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left">
                            <UncontrolledButtonDropdown>
                                <DropdownToggle color="link" className="p-0">
                                    <img width={42} className="rounded-circle" src={user.avatar} alt="" />
                                    <FontAwesomeIcon className="ms-2 opacity-8" icon={faAngleDown} />
                                </DropdownToggle>
                                <DropdownMenu end className="rm-pointers dropdown-menu-lg">
                                    <Nav vertical>
                                        <NavItem className="nav-item-header">
                                            Activity
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#">
                                                <Link to="/forms/UserProfile">Profile</Link>
                                                {/* <div className="ms-auto badge bg-pill bg-info">8</div> */}
                                            </NavLink>
                                        </NavItem>

                                        <NavItem>
                                            <NavLink href="#">
                                                <Link to="/forms/chagedpas">Change Password</Link>

                                                {/* <div className="ms-auto badge bg-pill bg-info">8</div> */}
                                            </NavLink>
                                        </NavItem>



                                        <NavItem className="nav-item-header">
                                            My Account
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#">
                                                Settings
                                                <div className="ms-auto badge bg-success">New</div>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#">
                                                Messages
                                                <div className="ms-auto badge bg-warning">512</div>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink onClick={logout}>
                                                LogOut
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </div>
                        <div className="widget-content-left  ms-3 header-user-info">
                            <div className="widget-heading">
                                {user.name}
                            </div>

                        </div>

                        {/* <div className="widget-content-right header-user-info ms-3">
                            <Button className="btn-shadow p-1" size="sm" onClick={notify2} color="info"
                                id="Tooltip-1">
                                <FontAwesomeIcon className="me-2 ms-2" icon={faCalendarAlt} />
                            </Button>
                            <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                                Click for Toastify Notifications!
                            </UncontrolledTooltip>
                        </div> */}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UserBox;



// class UserBox extends React.Component {Alina Mclourd
//     constructor(props) {
//         super(props);
//         this.state = {
//             active: false,
//         };

//     }

//     notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
//         transition: Bounce,
//         closeButton: true,
//         autoClose: 5000,
//         position: 'bottom-center',
//         type: 'success'
//     });


    // render() {

    //     return (
    //         <Fragment>
    //             <div className="header-btn-lg pe-0">
    //                 <div className="widget-content p-0">
    //                     <div className="widget-content-wrapper">
    //                         <div className="widget-content-left">
    //                             <UncontrolledButtonDropdown>
    //                                 <DropdownToggle color="link" className="p-0">
    //                                     <img width={42} className="rounded-circle" src={avatar1} alt="" />
    //                                     <FontAwesomeIcon className="ms-2 opacity-8" icon={faAngleDown} />
    //                                 </DropdownToggle>
    //                                 <DropdownMenu end className="rm-pointers dropdown-menu-lg">
    //                                     <Nav vertical>
    //                                         <NavItem className="nav-item-header">
    //                                             Activity
    //                                         </NavItem>
    //                                         <NavItem>
    //                                             <NavLink href="#">
    //                                                 Chat
    //                                                 <div className="ms-auto badge bg-pill bg-info">8</div>
    //                                             </NavLink>
    //                                         </NavItem>
    //                                         <NavItem>
    //                                             <NavLink href="#">Recover Password</NavLink>
    //                                         </NavItem>
    //                                         <NavItem className="nav-item-header">
    //                                             My Account
    //                                         </NavItem>
    //                                         <NavItem>
    //                                             <NavLink href="#">
    //                                                 Settings
    //                                                 <div className="ms-auto badge bg-success">New</div>
    //                                             </NavLink>
    //                                         </NavItem>
    //                                         <NavItem>
    //                                             <NavLink href="#">
    //                                                 Messages
    //                                                 <div className="ms-auto badge bg-warning">512</div>
    //                                             </NavLink>
    //                                         </NavItem>
    //                                         <NavItem>
    //                                             <NavLink href="#">
    //                                                 Logs
    //                                             </NavLink>
    //                                         </NavItem>
    //                                     </Nav>
    //                                 </DropdownMenu>
    //                             </UncontrolledButtonDropdown>
    //                         </div>
    //                         <div className="widget-content-left  ms-3 header-user-info">
    //                             <div className="widget-heading">
    //                                 Alina Mclourd
    //                             </div>
    //                             <div className="widget-subheading">
    //                                 VP People Manager
    //                             </div>
    //                         </div>

    //                         <div className="widget-content-right header-user-info ms-3">
    //                             <Button className="btn-shadow p-1" size="sm" onClick={this.notify2} color="info"
    //                                 id="Tooltip-1">
    //                                 <FontAwesomeIcon className="me-2 ms-2" icon={faCalendarAlt} />
    //                             </Button>
    //                             <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
    //                                 Click for Toastify Notifications!
    //                             </UncontrolledTooltip>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </Fragment>
    //     )
    // }
// }

// export default UserBox;