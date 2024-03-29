import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

const isActive = (claim) => {
    return (claim.status === 'Pending' || claim.status === 'Approved' || claim.status === 'Provide more information')
}
const isPending = (claim) => {
    return (claim.status === 'Pending' || claim.status === 'Provide more information')
}

const CarClaim = (props) => {
    console.log(props)
    const path = props.location.pathname.split('/')
    const claimID = path[2]
    const [claimValues, updateClaimValues] = useState({})
    const [isEditable, updateIsEditable] = useState(false)
    const [requestsInfo, updateRequestsInfo] = useState(false)
    const [isSubmitted, updateIsSubmitted] = useState(false)

    const formValues = {
        id: '',
        status: '',
        staffFeedback: '',
        additionalInfo: '',
        incidentDate: '',
        policeReport: '',
        accidentDescription: '',
        driverSurname: '',
        driverFirstName: '',
        driverLicenceNumber: '',
        driverDateOfBirth: '',
        otherDriverSurname: '',
        otherDriverFirstName: '',
        otherDriverLicenceNumber: '',
        otherDriverLicencePlate: '',
        otherDriverInsurance: ''
    }

    useEffect(() => {
        const fetchData = () => {
            props.db.transaction((q) => {
                q.executeSql('SELECT * FROM CLAIM WHERE ID = ?;', [claimID], function (q, results) {
                    formValues.id = results.rows.item(0).ID
                    formValues.status = results.rows.item(0).status
                    formValues.staffFeedback = results.rows.item(0).staff_feedback
                    formValues.additionalInfo = results.rows.item(0).more_info
                    formValues.incidentDate = results.rows.item(0).incident_date
                    formValues.policeReport = results.rows.item(0).police_report
                    formValues.accidentDescription = results.rows.item(0).description
                    formValues.driverSurname = results.rows.item(0).driver_surname
                    formValues.driverFirstName = results.rows.item(0).driver_firstname
                    formValues.driverLicenceNumber = results.rows.item(0).driver_licence_number
                    formValues.driverDateOfBirth = results.rows.item(0).driver_dob
                    formValues.otherDriverSurname = results.rows.item(0).otherdriver_surname
                    formValues.otherDriverFirstName = results.rows.item(0).otherdriver_firstname
                    formValues.otherDriverLicenceNumber = results.rows.item(0).otherdriver_licence_number
                    formValues.otherDriverLicencePlate = results.rows.item(0).otherdriver_licence_plate
                    formValues.otherDriverInsurance = results.rows.item(0).otherdriver_insurance
                    updateClaimValues(formValues)
                }, function (e, q) {
                    console.log(e.message)
                })
            })
        }

        if (props.db.transaction && props.appState.user.id !== 'unknown') {
            fetchData()
        }
    }, [props.appState, props.db])
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formValues.additionalInfo) formValues.additionalInfo = claimValues.additionalInfo
        if (!formValues.incidentDate) formValues.incidentDate = claimValues.incidentDate
        if (!formValues.policeReport) formValues.policeReport = claimValues.policeReport
        if (!formValues.accidentDescription) formValues.accidentDescription = claimValues.accidentDescription
        if (!formValues.driverSurname) formValues.driverSurname = claimValues.driverSurname
        if (!formValues.driverFirstName) formValues.driverFirstName = claimValues.driverFirstName
        if (!formValues.driverLicenceNumber) formValues.driverLicenceNumber = claimValues.driverLicenceNumber
        if (!formValues.driverDateOfBirth) formValues.driverDateOfBirth = claimValues.driverDateOfBirth
        if (!formValues.otherDriverSurname) formValues.otherDriverSurname = claimValues.otherDriverSurname
        if (!formValues.otherDriverFirstName) formValues.otherDriverFirstName = claimValues.otherDriverFirstName
        if (!formValues.otherDriverLicenceNumber) formValues.otherDriverLicenceNumber = claimValues.otherDriverLicenceNumber
        if (!formValues.otherDriverLicencePlate) formValues.otherDriverLicencePlate = claimValues.otherDriverLicencePlate
        if (!formValues.otherDriverInsurance) formValues.otherDriverInsurance = claimValues.otherDriverInsurance
        console.log(formValues)
        if (props.db.transaction) {
            props.db.transaction((q) => {
                q.executeSql('UPDATE CLAIM SET more_info = ?, incident_date = ?, police_report = ?, description = ?, driver_surname = ?, driver_firstname = ?, driver_licence_number = ?, driver_dob = ?, otherdriver_surname = ?, otherdriver_firstname = ?, otherdriver_licence_number = ?, otherdriver_licence_plate = ?, otherdriver_insurance = ? WHERE ID = ?;',
                    [formValues.additionalInfo, formValues.incidentDate, formValues.policeReport, formValues.accidentDescription, formValues.driverSurname, formValues.driverFirstName,
                        formValues.driverLicenceNumber, formValues.driverDateOfBirth, formValues.otherDriverSurname, formValues.otherDriverFirstName, formValues.otherDriverLicenceNumber,
                        formValues.otherDriverLicencePlate, formValues.otherDriverInsurance, claimValues.id],
                    function (q, results) {
                        updateIsEditable(!isEditable)
                        updateIsSubmitted(true)
                    }
                )
            })
        }
    }

    const updateStatus = (status) => {
        if (props.db.transaction) {
            props.db.transaction((q) => {
                q.executeSql('UPDATE CLAIM SET status = ? WHERE ID = ?;', [status, claimValues.id], function (q, results) {
                    updateIsSubmitted(true)
                })
            })
        }
    }

    const handleRequestForInfo = () => {
        if (props.db.transaction) {
            props.db.transaction((q) => {
                q.executeSql('UPDATE CLAIM SET status = "Provide more information", staff_feedback = ? WHERE ID = ?;', [formValues.staffFeedback, claimValues.id], function (q, results) {
                    updateIsSubmitted(true)
                })
            })
        }
    }
    if (props.appState.isLoggedIn) {
        if (!isSubmitted) {
            return (
                <div className='customer-home-form'>
                    <Container>
                        <Card>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group id='carInsuranceForm.ControlDriverSurname'>
                                            <Form.Label>Surname</Form.Label>
                                            <Form.Control required type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.driverSurname} onChange={(e) => {
                                                formValues.driverSurname = e.target.value
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group id='carInsuranceForm.ControlDriverFirstName'>
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control required type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.driverFirstName} onChange={(e) => {
                                                formValues.driverFirstName = e.target.value
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group id='carInsuranceForm.ControlDriverLicenceNumber'>
                                            <Form.Label>Licence number</Form.Label>
                                            <Form.Control required type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.driverLicenceNumber} onChange={(e) => {
                                                formValues.driverLicenceNumber = e.target.value
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group id='carInsuranceForm.ControlDriverAge'>
                                            <Form.Label>Date of Birth</Form.Label>
                                            <Form.Control required type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.driverDateOfBirth} onChange={(e) => {
                                                formValues.driverDateOfBirth = e.target.value
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                Details of the other driver
                                <Row>
                                    <Col>
                                        <Form.Group id='carInsuranceForm.ControlOtherDriverSurname'>
                                            <Form.Label>Surname</Form.Label>
                                            <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.otherDriverSurname} onChange={(e) => {
                                                formValues.otherDriverSurname = e.target.value
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group id='carInsuranceForm.ControlOtherDriverFirstName'>
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.otherDriverFirstName} onChange={(e) => {
                                                formValues.otherDriverFirstName = e.target.value
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group id='carInsuranceForm.ControlOtherDriverLicenceNumber'>
                                            <Form.Label>Licence number</Form.Label>
                                            <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.otherDriverLicenceNumber} onChange={(e) => {
                                                formValues.otherDriverLicenceNumber = e.target.value
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group id='carInsuranceForm.ControlOtherDriverLicencePlate'>
                                            <Form.Label>Licence plate</Form.Label>
                                            <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.otherDriverLicencePlate} onChange={(e) => {
                                                formValues.otherDriverLicencePlate = e.target.value
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group id='carInsuranceForm.ControlOtherDriverInsurance'>
                                            <Form.Label>Insurance provider (if known)</Form.Label>
                                            <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.otherDriverInsurance} onChange={(e) => {
                                                formValues.otherDriverInsurance= e.target.value
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group id='carInsuranceForm.ControlIncidentDate'>
                                            <Form.Label>Date of incident</Form.Label>
                                            <Form.Control required type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.incidentDate} onChange={(e) => {
                                                formValues.incidentDate = e.target.value
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group id='carInsuranceForm.ControlPoliceReport'>
                                            <Form.Label>Police report number</Form.Label>
                                            <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.policeReport} onChange={(e) => {
                                                formValues.policeReport = e.target.value
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group id='carInsuranceForm.ControlOtherSelectDescription'>
                                    <Form.Label>Description given</Form.Label>
                                    <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.accidentDescription} onChange={(e) => {
                                        formValues.accidentDescription = e.target.value
                                    }}/>
                                </Form.Group>
                                {claimValues.staffFeedback && props.appState.user.type === 'customer' ? (
                                    <Form.Group id='carInsuranceForm.AdditionalInfo'>
                                        <Form.Label>{claimValues.staffFeedback}</Form.Label>
                                        <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.additionalInfo} onChange={(e) => {
                                            formValues.additionalInfo = e.target.value
                                        }}/>
                                    </Form.Group>
                                ) : (claimValues.staffFeedback || requestsInfo) && props.appState.user.type === 'staff' ? (
                                    <Form.Group id='carInsuranceForm.RequestInfo'>
                                        <Form.Label>Provide a message to the customer:</Form.Label>
                                        <Form.Control type='text' plaintext defaultValue={claimValues.staffFeedback} onChange={(e) => {
                                            formValues.staffFeedback = e.target.value
                                        }}/>
                                    </Form.Group>
                                ) : (
                                    ''
                                )}
                                {(props.appState.user.type === 'customer' && isActive(claimValues)) ? (
                                    <div>
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
                                    </div>
                                ) : (props.appState.user.type === 'staff' && isPending(claimValues)) ? (
                                    <div>
                                        <Row>
                                            <Col sm={8}>
                                                <Button className='button-staff' variant='secondary' onClick={() => {
                                                    if (!formValues.staffFeedback) updateRequestsInfo(true)
                                                    else handleRequestForInfo()
                                                }}>
                                                    {(!requestsInfo ? (<span>Request more information</span>) : (<span>Save changes</span>))}
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button className='button-staff' variant='danger' onClick={() => updateStatus('Denied')}>
                                                    Deny
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button className='button-staff' variant='success' onClick={() => updateStatus('Approved')}>
                                                    Approve
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </Form>
                        </Card>
                    </Container>
                    
                </div>
            )
        }
        else {
            return (
                <div className='customer-home'>
                    <Container>
                        <Card>
                            Your changes have been saved.
                            <div>
                                <Button variant='secondary' href={`/${props.appState.user.type}`}>
                                    Return home
                                </Button>
                            </div>
                        </Card>
                    </Container>
                    
                </div>
            )
        }
    }
    else {
        return (
            <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }}
            />
        )
    }
}

export default CarClaim
