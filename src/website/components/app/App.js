import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CustomerHomePage from '../screens/customers/CustomerHomePage'
import StaffHomePage from '../screens/staff/StaffHomePage'
import Home from './Home'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import { Container, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const initialState = {
    isLoggedIn: false,
    userType: '',
    username: ''
}
console.log(initialState)

function App() {
    const [appState, updateAppState] = useState(initialState)
    console.log(appState)
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
