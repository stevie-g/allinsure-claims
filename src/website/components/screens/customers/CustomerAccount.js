import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Card, Form, Row, Col, Button, Spinner } from 'react-bootstrap'

const CustomerAccount = (props) => {
    const [userDetails, updateUserDetails] = useState()
    const [isEditable, updateIsEditable] = useState(false)
    let newDetails = {
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
    }

    useEffect(() => {
        const fetchData = () => {
            props.db.transaction((q) => {
                q.executeSql('SELECT * FROM CUSTOMER WHERE user_ID = ?;', [props.appState.user.id], function (q, results) {
                    newDetails.firstname = results.rows.item(0).firstname
                    newDetails.lastname = results.rows.item(0).lastname
                    newDetails.email = results.rows.item(0).email
                    newDetails.phone = results.rows.item(0).phonenumber
                    updateUserDetails(newDetails)
                })
            })
        }

        if (props.db.transaction && props.appState.user.id !== 'unknown') {
            fetchData()
        }
    }, [props.appState, props.db])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newDetails.firstname) newDetails.firstname = userDetails.firstname
        if (!newDetails.lastname) newDetails.lastname = userDetails.lastname
        if (!newDetails.phone) newDetails.phone = userDetails.phone
        if (!newDetails.email) newDetails.email = userDetails.email
        if (props.db.transaction) {
            props.db.transaction((q) => {
                q.executeSql('UPDATE CUSTOMER SET firstname = ?, lastname = ?, phonenumber = ?, email = ? WHERE user_ID = ?;',
                [newDetails.firstname, newDetails.lastname, newDetails.phone, newDetails.email, props.appState.user.id],
                function (q, results) {
                    updateIsEditable(!isEditable)
                })
            })
        }
    }

    if (props.appState.isLoggedIn && props.appState.user.type === 'customer') {
        if (userDetails) {
            return (
                <div className='customer-home'>
                    <Container>
                        <Card>
                            <Card.Title>Your details</Card.Title>
                            <Form>
                                <Form.Group as={Row} controlId='userAccountFirstName'>
                                    <Form.Label column>First name</Form.Label>
                                    <Col sm='10'>
                                        <Form.Control plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={userDetails.firstname} onChange={(e) => {
                                                newDetails.firstname = e.target.value
                                        }}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId='userAccountLastName'>
                                    <Form.Label column>Last name</Form.Label>
                                    <Col sm='10'>
                                        <Form.Control plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={userDetails.lastname} onChange={(e) => {
                                            newDetails.lastname = e.target.value
                                        }}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId='userAccountEmail'>
                                    <Form.Label column>Email</Form.Label>
                                    <Col sm='10'>
                                        <Form.Control plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={userDetails.email} onChange={(e) => {
                                            newDetails.email = e.target.value
                                        }}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId='userAccountPhone'>
                                    <Form.Label column>Phone number</Form.Label>
                                    <Col sm='10'>
                                        <Form.Control plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={userDetails.phone} onChange={(e) => {
                                            newDetails.phone = e.target.value
                                        }}/>
                                    </Col>
                                </Form.Group>
                            </Form>
                            <Button className='button-edit' variant='secondary' onClick={() => updateIsEditable(!isEditable)}>
                                {!isEditable ? 'Edit details' : 'Cancel'}
                            </Button>
                            {isEditable ? (
                                <Button className='button-edit' variant='primary' type='Submit' onClick={(e) => handleSubmit(e)}>
                                    Save changes
                                </Button>
                            ) : (
                                ''
                            )}
                        </Card>
                    </Container>
                </div>
            )
        }
        else {
            return (
                <div className='customer-home'>
                    <Container>
                        <Spinner animation='border' variant='secondary' />
                    </Container>
                </div>
            )
        }
    }
    else {
        localStorage.userType = 'customer'
        return (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}
            />
        )
    }
}

export default CustomerAccount