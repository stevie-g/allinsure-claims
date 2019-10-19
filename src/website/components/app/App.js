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
                q.executeSql('DROP TABLE CUSTOMER;')
                q.executeSql('DROP TABLE STAFF;')
                q.executeSql('DROP TABLE CAR_CLAIM;')
                q.executeSql('DROP TABLE HOME_CLAIM;')
                // DROP TABLE CLAIM
            })
            dbresult.transaction((q) => {
                q.executeSql('CREATE TABLE IF NOT EXISTS CUSTOMER (user_ID unique, username, firstname, lastname, password, phonenumber, address, email);')
                q.executeSql('INSERT INTO CUSTOMER VALUES ("001", "psherman", "P", "Sherman", "123456", "0404123456", "42 Wallaby Way", "psherman@gmail.com");')
            })
            dbresult.transaction((q) => {
                q.executeSql('CREATE TABLE IF NOT EXISTS STAFF (staff_ID unique, username, firstname, lastname, password, email);')
                q.executeSql('INSERT INTO STAFF VALUES ("001, "skg971", "Stevie", "Greenshields", "123456", "stevie@allinsure.com"')
                q.executeSql('INSERT INTO STAFF VALUES ("002", "jg081", "Ryan", "Guan", "123456", "ryan@allinsure.com");')
            })
            dbresult.transaction((q) => {
                q.executeSql('CREATE TABLE IF NOT EXISTS CAR_CLAIM (ID unique, user_ID, staff_ID, submit_date, status, driver_surname, driver_firstname, driver_licence_number, driver_dob, otherdriver_surname, otherdriver_firstname, otherdriver_licence_number, otherdriver_licence_plate, otherdriver_insurance, incident_date, police_report, description, staff_feedback);')
                q.executeSql('INSERT INTO CAR_CLAIM VALUES ("C0000001", "001", "001", "14/10/2019", "Pending", "Greenshields", "Stevie", "9995551", "1/1/2000", "Smith", "Will", "2323232", "GEF574", "AAMI", "7/10/19", "DDFRH4386B0001", "He reversed into my car at Woolies", "");')
            })
            dbresult.transaction((q) => {
                q.executeSql('CREATE TABLE IF NOT EXISTS HOME_CLAIM (ID unique, user_ID, staff_ID, submit_date, status, incident_type, incident_date, damage_location, description, contents_list, cost, police_report);')
                q.executeSql('INSERT INTO HOME_CLAIM VALUES ("H0000001", "001", "002", "29/09/2019", "Approved", "Bushfire", "15/09/2019", "shed", "Shed was destroyed in the fire", "Lawn mower, pool table", "7000", "SDBWEDJH542H70001");')
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
