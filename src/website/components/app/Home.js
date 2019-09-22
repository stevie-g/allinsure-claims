import React from 'react'
import styles from './App.css'
import CustomerHomePage from '../screens/customers/CustomerHomePage'
import StaffHomePage from '../screens/staff/StaffHomePage'
import Login from './Login'
import { Route, Link } from 'react-router-dom'
import { Col, Button } from 'react-bootstrap'

const Home = (props) => {
    console.log(props.appState)
    if (props.appState.isLoggedIn) {
        return (
            <div></div>
        )
    }
    // else if (props.appState.isLoggedIn && props.appState.userType === 'customer') {
    //     return (
    //         <CustomerHomePage />
    //     )
    // }
    // else if (props.appState.isLoggedIn && props.appState.userType === 'staff') {
    //     return (
    //         <StaffHomePage />
    //     )
    // }
    else {
        return (
            <div className='home'>
                <Col>
                    <Link to='/login' onClick={() => {
                        props.updateAppState({
                            isLoggedIn: false,
                            userType: 'customer',
                            username: ''
                        })
                        console.log(props.appState)
                    }}>Customers</Link>
                </Col>
                <Col>
                    <Link to='/login' onClick={() => {
                        props.updateAppState({
                            isLoggedIn: false,
                            userType: 'staff',
                            username: ''
                        })
                        console.log(props.appState)
                    }}>Staff</Link>
                </Col>
            </div>
        )
    }
}

export default Home