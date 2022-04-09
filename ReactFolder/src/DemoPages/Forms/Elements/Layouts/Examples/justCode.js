/ eslint-disable default-case /
import React, { useEffect, useState } from "react";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import routes from "./application-routes/routes";
import axios from "axios";
// import Login from "./admin/components/login/Login";
// import Home from "./layouts/home/Home.jsx";

if (process.env.REACT_APP_STAGE === "PROD")
    console.log = function no_console() { };

const LoginPage = React.lazy(() =>
    import("./admin/layouts/login-page/LoginPage")
);



function justCode() {
    var [loader, setLoader] = useState(true);
    let [auth, setAuth] = useState();

    const loading = (
        <div className="pt-3 text-center">
            <div className="sk-spinner sk-spinner-pulse"></div>
        </div>
    );

    function authenticateAdminUsingToken(callback) {
        if (!localStorage.getItem("accessToken")) {
            callback(false);
        }
        let url = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_POST_API_AUTHENTICATE}`;
        let headers = {
            "x-access-token": `${localStorage.getItem("accessToken")}`,
        };
        axios.post(url, {}, { headers: headers })
            .then((result) => {
                console.log("result", result.status);
                if (result.status === 200) {
                    callback(true);
                }
            })
            .catch((error) => {
                console.log("error", error);
                callback(false);
            });
    }
    useEffect(() => {
        demoAsyncCall().then(() => setLoader(false));
        let url = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_POST_API_AUTHENTICATE}`;
        console.log("url", url);
        authenticateAdminUsingToken((status) => {
            console.log("hello", status);
            setAuth(status);
        });
    }, []);
    const isAuthenticated = auth;
    console.log("auth", auth);
    return (
        <HashRouter>
            {loader ? null : (
                <React.Suspense fallback={loading}>
                    <Switch>
                        {routes.map(({ path, exact, component: Component }) => (
                            <Route
                                path={path}
                                exact={exact}
                                component={
                                    !isAuthenticated &&
                                        (path === "/orders" ||
                                            path === "/customers" ||
                                            path === "/edithomepage")
                                        ? LoginPage
                                        : Component
                                } // sans the angle brackets </>
                            />
                        ))}
                    </Switch>
                </React.Suspense>
            )}
        </HashRouter>
    );
}
function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}
export default justCode;