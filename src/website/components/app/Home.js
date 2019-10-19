import React from 'react'
import * as styles from './App.css'
import { Link, Redirect } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

const Home = (props) => {
    // should be wherever they came from
    if (props.appState.isLoggedIn && props.appState.user.type === 'customer' && props.appState.user.id !== null) {
        console.log(props)
        console.log('redirecting from home')
        return (
            <Redirect to='/customer' />
        )
    }
    else if (props.appState.isLoggedIn && props.appState.user.type === 'staff' && props.appState.user.id !== null) {
        return (
            <Redirect to='staff' />
        )
    }
    else {
        return (
            <div className='home'>
                <Row>
                    <Col>
                        <Link to='/login' onClick={() => {
                            props.updateAppState({
                                isLoggedIn: false,
                                user: {
                                    type: 'customer',
                                    id: ''
                                }
                            })
                            localStorage.userType = 'customer'
                        }}>Customers</Link>
                    </Col>
                    <Col>
                        <Link to='/login' onClick={() => {
                            props.updateAppState({
                                isLoggedIn: false,
                                user: {
                                    type: 'staff',
                                    id: ''
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