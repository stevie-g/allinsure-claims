import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'


const Login = (props) => {
    const [isValid, updateIsValid] = useState(true)
    let userType = localStorage.userType
    let authenticatedUserID = ''
    const loginValues = {
        username: '',
        password: ''
    }
    
    const authenticateUser = (user) => {
        if (props.db) {
            if (props.appState.user.type === 'customer') {
                props.db.transaction(function (q) {
                    q.executeSql('SELECT * FROM CUSTOMER WHERE username = ? AND password = ?', [user.username, user.password], function (q, results) {
                        console.log(results)
                        if (results.rows.length > 0) {
                            authenticatedUserID = results.rows.item(0).user_ID
                            localStorage.isLoggedIn = 'true'
                            localStorage.userID = authenticatedUserID
                            props.updateAppState({
                                isLoggedIn: true,
                                user: {
                                    type: userType,
                                    id: authenticatedUserID
                                }
                            })
                        }
                        else {
                            updateIsValid(false)
                        }
                    }, function (q, e) {
                        console.log(e.message)
                    })
                })
            }
            else if (props.appState.user.type === 'staff') {
                props.db.transaction(function (q) {
                    q.executeSql('SELECT * FROM STAFF WHERE username = ? AND password = ?', [user.username, user.password], function (q, results) {
                        console.log(results)
                        if (results.rows.length > 0) {
                            authenticatedUserID = results.rows.item(0).staff_ID
                            localStorage.isLoggedIn = 'true'
                            localStorage.userID = authenticatedUserID
                            props.updateAppState({
                                isLoggedIn: true,
                                user: {
                                    type: userType,
                                    id: authenticatedUserID
                                }
                            })
                        }
                    }, function (q, e) {
                        console.log(e.message)
                    })
                })
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        authenticateUser(loginValues)
    }

    // should redirect to page they came from
    if (props.appState.isLoggedIn) {
        //switch
        if (props.appState.user.type === 'customer') {
            console.log('redirecting customer')
            return (
                <Redirect to='/customer' />
            )
        }
        else if (props.appState.user.type === 'staff') {
            console.log('redirecting staff')
            return (
                <Redirect to='/staff' />
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
    else {
        return (
            <Form className='loginForm' onSubmit={handleSubmit}>
                <Form.Group controlId='loginFormUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='Enter username' name='username' onChange={(e) => {
                        loginValues.username = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group controlId='loginFormPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' name='password' onChange={(e) => {
                        loginValues.password = e.target.value
                    }}/>
                </Form.Group>
                {!isValid ? (<Form.Text><span style={{color: 'red'}}>Username or password is invalid</span><br /><br /></Form.Text>) : ('')}
                <Button variant='light' type='submit' name='sub' value='Submit' onClick={(e) => {
                    handleSubmit(e)
                }}>
                    Log in
                </Button>
            </Form>
        )
    }
}

export default Login