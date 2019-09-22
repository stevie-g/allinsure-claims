import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerHomePage from '../screens/customers/CustomerHomePage'
import StaffHomePage from '../screens/staff/StaffHomePage'
import Home from './Home'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const initialState = {
    isLoggedIn: false,
    userType: '',
    username: ''
}

function App() {
    const [appState, updateAppState] = useState(initialState)
    return (
        <Router>
            <Switch>
                <Route exact path='/' render={(props) => (<Home {...props} appState={appState} updateAppState={updateAppState} />)} />
                <Route exact path='/login' render={(props) => (<Login {...props} appState={appState} updateAppState={updateAppState} />)} />
                <PrivateRoute exact path='/customer' component={CustomerHomePage} appState={appState} />
                <PrivateRoute exact path='/staff' component={StaffHomePage} appState={appState} />
                {/* <Route component={NoMatch} /> */}
            </Switch>
        </Router>
    )
}

export default App;
