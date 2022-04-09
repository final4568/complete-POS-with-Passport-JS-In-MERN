import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './config/configureStore';
import App from './App'
// const store = configureStore();

// // import registerServiceWorker from './registerServiceWorker';
// import { unregister } from './registerServiceWorker';
// import './assets/base.css';
// import Main from './DemoPages/Main';
// import configureStore from './config/configureStore';


ReactDOM.render(
  <>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </>,
  document.getElementById('root')

  // {/* <BrowserRouter>
  //     <Switch>
  //       <Route exact path="/" >
  //         <Provider store={store}><Main_login /></Provider>
  //       </Route>

  //       <Route exact path="/dashboard">
  //         <Provider store={store}><App /></Provider>
  //       </Route>

  //       <Route exact path="*">
  //         <NotFound />
  //       </Route>
  //     </Switch>
  //   </BrowserRouter> */}

);
// };

// renderApp(Main);

// if (module.hot) {
//   module.hot.accept('./DemoPages/Main', () => {
//     const NextApp = require('./DemoPages/Main').default;
//     renderApp(NextApp);
//   });
// }
// unregister();

