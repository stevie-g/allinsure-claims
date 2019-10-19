import React from 'react'
import * as styles from './App.css'
import { Link, Redirect } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

const Home = (props) => {
    // should be wherever they came from
    if (props.appState.isLoggedIn && props.appState.user.type === 'customer' && props.appState.user.firstName !== null) {
        return (
            <Redirect to='/customer' />
        )
    }
    else {
        return (
            <div className='home'>
                <Row>
                    <Col>
                        <Link to='/login/customer' onClick={() => {
                            props.updateAppState({
                                isLoggedIn: false,
                                user: {
                                    type: 'customer',
                                    firstName: ''
                                }
                            })
                            localStorage.userType = 'customer'
                        }}>Customers</Link>
                    </Col>
                    <Col>
                        <Link to='/login/staff' onClick={() => {
                            props.updateAppState({
                                isLoggedIn: false,
                                user: {
                                    type: 'staff',
                                    firstName: ''
                                }
                            })
                            localStorage.userType = 'staff'
                        }}>Staff</Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home