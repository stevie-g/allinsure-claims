import React from 'react'
import * as styles from './App.css'
import { Link, Redirect } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'

const Home = (props) => {
    console.log('home props', props)
    const fromUrl = props.location.state ? props.location.state.from.pathname : ''
    console.log(fromUrl)
    // if props.location.state.from is not undefined, redirect?
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
                <Container className='home-text'>
                    <Row>
                        <Col><h1>AllInsure</h1></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to={{pathname: '/login', state: {from: {pathname: fromUrl} }}} onClick={() => {
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
                            <Link to={{pathname: '/login', state: {from: {pathname: fromUrl} }}} onClick={() => {
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
                </Container>
            </div>
        )
    }
}

export default Home