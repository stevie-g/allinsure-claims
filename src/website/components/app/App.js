import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerHomePage from '../screens/customers/CustomerHomePage'
import StaffHomePage from '../screens/staff/StaffHomePage'
import Home from './Home'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function App() {
    const [db, updateDb] = useState({})
    const initialState = {
        isLoggedIn: false,
        user: {
            type: '',
            firstName: ''
        }
    }
    const [appState, updateAppState] = useState(initialState)

    const handleLogout = () => {
        localStorage.clear()
    }

    useEffect(() => {
        if (!localStorage.isLoggedIn) {
            localStorage.isLoggedIn = 'false'
        }
        if (!localStorage.userType) {
            localStorage.userType = 'unknown'
        }
        if (!localStorage.firstName) {
            localStorage.firstName = 'unknown'
        }
        let loginState = false
        if (localStorage.isLoggedIn === 'true') {
            loginState = true
        }
        if (appState.isLoggedIn !== loginState || appState.user.type !== localStorage.userType || appState.user.firstName !== localStorage.firstName) {
            updateAppState({
                isLoggedIn: loginState,
                user: {
                    type: localStorage.userType,
                    firstName: localStorage.firstName
                }
            })
        }
        console.log(localStorage)
    }, [appState.isLoggedIn, appState.user.type, appState.user.firstName])

    useEffect(() => {
        const initialiseDatabase = () => {
            let dbresult = openDatabase('localdb', '1.0', 'Customer Database', 2 * 2014 * 1024)
            dbresult.transaction((q) => {
                q.executeSql('CREATE TABLE IF NOT EXISTS CUSTOMER (username unique, password)')
                q.executeSql('INSERT INTO CUSTOMER VALUES ("jg081", "123456")')
                q.executeSql('INSERT INTO CUSTOMER VALUES ("skg971", "123456")')
            })
            dbresult.transaction((q) => {
                q.executeSql('CREATE TABLE IF NOT EXISTS CLAIM (id unique, insuranceType, dateOfClaim, status)')
                q.executeSql('INSERT INTO CLAIM VALUES ("0000001", "Car", "8/10/2019", "Pending")')
            })
            console.log(JSON.stringify(dbresult), 'updated')
            updateDb(dbresult)
        }
        initialiseDatabase()
    }, [])

    return (
        <div>
            <Button variant='secondary' href='/' onClick={() => {
                handleLogout()
            }}>
                Log out
            </Button>
            <Router>
                <Switch>
                    <Route exact path='/' render={(props) => (<Home {...props} appState={appState} updateAppState={updateAppState} />)} />
                    <Route path='/login' render={(props) => (<Login {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    <Route path='/customer' render={(props) => (<CustomerHomePage {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    {/* <PrivateRoute exact path='/customer' component={CustomerHomePage} appState={appState} db={db}/> */}
                    <PrivateRoute exact path='/staff' component={StaffHomePage} appState={appState} db={db}/>
                    {/* <Route component={NoMatch} /> */}
                </Switch>
            </Router>
        </div>
    )
}

export default App;
