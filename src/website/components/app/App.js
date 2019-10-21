import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavMenu from './NavMenu'
import CustomerHome from '../screens/customers/CustomerHome'
import CustomerAccount from '../screens/customers/CustomerAccount'
import CustomerClaims from '../screens/customers/CustomerClaims'
import CustomerNewClaim from '../screens/customers/CustomerNewClaim'
import StaffHomePage from '../screens/staff/StaffHomePage'
import StaffClaims from '../screens/staff/StaffClaims'
import CarClaim from '../form/CarClaim'
import HomeClaim from '../form/HomeClaim'
import Home from './Home'
import Login from './Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

function App() {
    const [db, updateDb] = useState({})
    const initialState = {
        isLoggedIn: false,
        user: {
            type: '',
            id: ''
        }
    }
    const [appState, updateAppState] = useState(initialState)

    useEffect(() => {
        if (!localStorage.isLoggedIn) {
            localStorage.isLoggedIn = 'false'
        }
        if (!localStorage.userType) {
            localStorage.userType = 'unknown'
        }
        if (!localStorage.userID) {
            localStorage.userID = 'unknown'
        }
        if (!localStorage.count) {
            localStorage.count = '7'
        }
        let loginState = false
        if (localStorage.isLoggedIn === 'true') {
            loginState = true
        }
        if (appState.isLoggedIn !== loginState || appState.user.type !== localStorage.userType || appState.user.id !== localStorage.userID) {
            updateAppState({
                isLoggedIn: loginState,
                user: {
                    type: localStorage.userType,
                    id: localStorage.userID
                }
            })
        }
        console.log(localStorage)
    }, [appState.isLoggedIn, appState.user.type, appState.user.id])

    useEffect(() => {
        const initialiseDatabase = () => {
            let dbresult = openDatabase('localdb', '1.0', 'Customer Database', 2 * 2014 * 1024)
            dbresult.transaction((q) => {
                // q.executeSql('DROP TABLE CUSTOMER;')
                // q.executeSql('DROP TABLE STAFF;')
                // q.executeSql('DROP TABLE CLAIM;')
            })
            dbresult.transaction((q) => {
                q.executeSql('CREATE TABLE IF NOT EXISTS CUSTOMER (user_ID unique, username, firstname, lastname, password, phonenumber, address, email);')
                q.executeSql('INSERT INTO CUSTOMER VALUES ("001", "ms802", "Meg", "Sloan", "password", "22436687", "Northfields Avenue", "meg@gmail.com");')
                q.executeSql('INSERT INTO CUSTOMER VALUES ("002", "psherman", "P", "Sherman", "nemo", "0404123456", "42 Wallaby Way", "psherman@gmail.com");')
            })
            dbresult.transaction((q) => {
                q.executeSql('CREATE TABLE IF NOT EXISTS STAFF (staff_ID unique, username, firstname, lastname, password, email);')
                q.executeSql('INSERT INTO STAFF VALUES ("001", "skg971", "Stevie", "Greenshields", "12345", "stevie@allinsure.com");')
                q.executeSql('INSERT INTO STAFF VALUES ("002", "jg081", "Ryan", "Guan", "56789", "ryan@allinsure.com");')
            })
            dbresult.transaction((q) => {
                q.executeSql('CREATE TABLE IF NOT EXISTS CLAIM (ID unique, type, user_ID, staff_ID, submit_date, status, staff_feedback, more_info, incident_type, incident_date, police_report, cost, description, driver_surname, driver_firstname, driver_licence_number, driver_dob, otherdriver_surname, otherdriver_firstname, otherdriver_licence_number, otherdriver_licence_plate, otherdriver_insurance, damage_location, contents_list);')
                q.executeSql('INSERT INTO CLAIM VALUES ("C0000001", "Car", "001", "001", "20/10/2019", "Provide more information", "Please provide police report", "", "", "15/10/19", "", "", "He side-swiped at the traffic lights", "Sloan", "Meg", "9995551", "1/1/2000", "Jackson", "Mike", "", "CBU329", "NRMA", "", "");')
                q.executeSql('INSERT INTO CLAIM VALUES ("H0000002", "Home", "001", "002", "30/10/2018", "Resolved", "", "", "Theft or attempted theft", "28/10/2018", "ADBUDFI3238GFH09", "3000", "My computer was stolen", "", "", "", "", "", "", "", "", "", "", "Laptop");')
                q.executeSql('INSERT INTO CLAIM VALUES ("H0000003", "Home", "001", "001", "5/12/2010", "Resolved", "", "", "Other weather event", "01/11/2010", "DLFDSHDF45347839", "10000", "Lightning struck the roof", "", "", "", "", "", "", "", "", "", "Roof at front of house", "TV, couch, entertainment unit");')
                
                q.executeSql('INSERT INTO CLAIM VALUES ("H0000004", "Home", "002", "002", "20/10/2019", "Pending", "", "", "Water damage (including flood)", "15/10/2019", "BFHRU34800048HBTGG", "20000", "House was flooded during the east coast low", "", "", "", "", "", "", "", "", "", "", "Carpet and all furnishings");')
                q.executeSql('INSERT INTO CLAIM VALUES ("C0000005", "Car", "002", "001", "14/10/2019", "Provide more information", "Please provide other driver\'s licence number", "", "", "7/10/19", "DDFRH4386B0001", "", "He reversed into my car at Woolies", "Sherman", "P", "9995551", "3/5/1980", "Smith", "Will", "", "GEF574", "AAMI", "", "");')
                q.executeSql('INSERT INTO CLAIM VALUES ("H0000006", "Home", "002", "002", "29/09/2019", "Approved", "", "", "Fire (including bushfire)", "15/09/2019", "SDBWEDJH542H70001", "7000", "Shed was destroyed in the fire", "", "", "", "", "", "", "", "", "", "shed", "Lawn mower, pool table");')
            })
            updateDb(dbresult)
        }
        initialiseDatabase()
    }, [])

    return (
        <div>
            {appState.isLoggedIn && appState.user.type && appState.user.id &&
               
                    <NavMenu appState={appState} updateAppState={updateAppState} db={db} />
               
            }
            <Router>
                <Switch>
                    
                    <Route path='/login' render={(props) => (<Login {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    <Route exact path='/staff' render={(props) => (<StaffHomePage {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    <Route exact path='/staff/claims' render={(props) => (<StaffClaims {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    <Route exact path='/customer/account' render={(props) => (<CustomerAccount {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    <Route exact path='/customer/claims' render={(props) => (<CustomerClaims {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    <Route exact path='/customer/newclaim' render={(props) => (<CustomerNewClaim {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    <Route exact path='/customer' render={(props) => (<CustomerHome {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    <Route exact path='/claim/C:claimid' render={(props) => (<CarClaim {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    <Route exact path='/claim/H:claimid' render={(props) => (<HomeClaim {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    <Route exact path='/' render={(props) => (<Home {...props} appState={appState} updateAppState={updateAppState} />)} />
                    {/* <Route path='/staff' render={(props) => (<StaffHomePage {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} />
                    <Route path='/staff' render={(props) => (<StaffHomePage {...props} appState={appState} updateAppState={updateAppState} db={db}/>)} /> */}
                    {/* <PrivateRoute exact path='/customer' component={CustomerHomePage} appState={appState} db={db}/> */}
                    {/* <PrivateRoute exact path='/staff' component={StaffHomePage} appState={appState} db={db}/> */}
                    {/* <Route component={NoMatch} /> */}
                </Switch>
            </Router>
        </div>
    )
}

export default App;
