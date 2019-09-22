import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const Login = (props) => {
    console.log(props)

    const handleLogon = () => {
        console.log('clicked')
        props.updateAppState({
            isLoggedIn: true,
            userType: props.appState.userType,
            username: 'Stevie'
        })
    }

    // should redirect to page they came from
    if (props.appState.isLoggedIn) {
        if (props.appState.userType === 'customer') {
            return (
                <Redirect to='/customer' />
            )
        }
        else if (props.appState.userType === 'staff') {
            return (
                <Redirect to='/staff' />
            )
        }
    }
    else {
        return (
            <Form className='loginForm'>
                <Form.Group controlId='loginFormUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='Enter username' />
                </Form.Group>
                <Form.Group controlId='loginFormPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' />
                </Form.Group>
                <Button variant='light' onClick={() => {
                    handleLogon()
                    console.log("after click")
                }}>
                    Log in
                </Button>
            </Form>
        )
    }
}

export default Login