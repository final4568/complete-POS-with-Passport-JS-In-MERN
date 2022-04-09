import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
// import { unregister } from './registerServiceWorker';
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter } from 'react-router-dom';
import './assets/base.css';
import Main from './DemoPages/Main';
import store from './config/configureStore';
import { Provider } from 'react-redux'
// import { useSelector } from 'react-redux';

// const store = configureStore();

const ThemeFiles = () => {

    const renderApp = Component => {
        ReactDOM.render(
            <>
                <Provider store={store}>
                    <HashRouter>
                        <Component />
                    </HashRouter>
                </Provider>
            </>, document.getElementById('root')

        );
    };

    renderApp(Main);

    if (module.hot) {
        module.hot.accept('./DemoPages/Main', () => {
            const NextApp = require('./DemoPages/Main').default;
            renderApp(NextApp);
        });
    }
}

export default ThemeFiles
// unregister();

// registerServiceWorker();
