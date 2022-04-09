import React from "react";

const Mainlogin = React.lazy(() =>
    import("./DemoPages/Forms/Elements/Layouts/Examples/Main_login")
);

const Dashboards = React.lazy(() =>
    import("./DemoPages/Dashboards/index")
);

const ResetPassword = React.lazy(() =>
    import("./DemoPages/Forms/Elements/Layouts/Examples/ResetPassword")
);

const UserList = React.lazy(() =>
    import("./DemoPages/Dashboards/Basic/UserList")
);

const AddNewUser = React.lazy(() =>
    import("./DemoPages/Forms/Elements/Layouts/Examples/AddNewUser")
);

const LoggedUserProfile = React.lazy(() =>
    import("./DemoPages/Forms/Elements/Layouts/Examples/Profile/LoggedUserProfile")
);

const SetPassword = React.lazy(() =>
    import("./DemoPages/Forms/Elements/Layouts/Examples/SetPassword")
);

const LoggedUserPass = React.lazy(() =>
    import("./DemoPages/Forms/Elements/Layouts/Examples/ChangedPassword/LoggedUserPass")
);
const NotFound = React.lazy(() =>
    import("./NotfoundComponent/NotFound")
);


const routes = [

    {
        path: "*",
        exact: true,
        name: "NotFound",
        component: NotFound
    },
    {
        path: "/",
        exact: true,
        name: "Dashboards",
        component: Dashboards,
    },
    {
        path: "/resetPassword",
        exact: true,
        name: "ResetPassword",
        component: ResetPassword,
    },
    {
        path: "/allmanagers",
        exact: true,
        name: "UserList",
        component: UserList,
    },
    {
        path: "/addnewmanager",
        exact: true,
        name: "AddNewUser",
        component: AddNewUser,
    },
    {
        path: "/userProfile",
        exact: true,
        name: "LoggedUserProfile",
        component: LoggedUserProfile,
    },
    {
        path: "/chagedpassword",
        exact: true,
        name: "LoggedUserPass",
        component: LoggedUserPass,
    },
    {
        path: "/user/reset/:token",
        exact: true,
        name: "SetPassword",
        component: SetPassword,
    },
]
export default routes;