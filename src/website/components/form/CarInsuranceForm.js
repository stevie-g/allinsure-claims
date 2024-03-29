import React from 'react'
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap'

const CarInsuranceForm = (props) => {
    const formValues = {
        id: `C000000${localStorage.count}`,
        type: 'Car',
        userID: props.appState.user.id,
        staffID: `00${props.appState.user.id % 2}`,
        submitDate: '22/10/2019',
        status: 'Pending',
        staffFeedback: '',
        additionalInfo: '',
        incidentType:'',
        incidentDate: '',
        policeReport: '',
        cost: '',
        accidentDescription: '',
        driverSurname: '',
        driverFirstName: '',
        driverLicenceNumber: '',
        driverDateOfBirth: '',
        otherDriverSurname: '',
        otherDriverFirstName: '',
        otherDriverLicenceNumber: '',
        otherDriverLicencePlate: '',
        otherDriverInsurance: '',
        damageLocation: '',
        contentsList: '',
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (props.db) {
            props.db.transaction((q) => {
                q.executeSql('INSERT INTO CLAIM VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                    [formValues.id, formValues.type, formValues.userID, formValues.staffID, formValues.submitDate, formValues.status, formValues.staffFeedback, formValues.additionalInfo, formValues.incidentType,
                        formValues.incidentDate, formValues.policeReport, formValues.cost, formValues.accidentDescription, formValues.driverSurname, formValues.driverFirstName,
                        formValues.driverLicenceNumber, formValues.driverDateOfBirth, formValues.otherDriverSurname, formValues.otherDriverFirstName, formValues.otherDriverLicenceNumber,
                        formValues.otherDriverLicencePlate, formValues.otherDriverInsurance, formValues.damageLocation, formValues.contentsList],
                    function (q, results) {
                        let storageNum = parseInt(localStorage.count)
                        storageNum++
                        let storageString = storageNum.toString()
                        localStorage.count = storageString
                    }
                )
            })
            props.updateInsuranceType('submitted')
        }
    }
    return (
        <div className='newClaimForm customer-home-form'>
            <Container>
                <Card>
                    <Form onSubmit={handleSubmit} >
                        Who was driving the car?
                        <Row>
                            <Col>
                                <Form.Group id='carInsuranceForm.ControlDriverSurname'>
                                    <Form.Label><span>* </span>Surname</Form.Label>
                                    <Form.Control required type='text' placeholder='Driver surname' onChange={(e) => {
                                        formValues.driverSurname = e.target.value
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group id='carInsuranceForm.ControlDriverFirstName'>
                                    <Form.Label><span>* </span>First name</Form.Label>
                                    <Form.Control required type='text' placeholder='Driver first name' onChange={(e) => {
                                        formValues.driverFirstName = e.target.value
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group id='carInsuranceForm.ControlDriverLicenceNumber'>
                                    <Form.Label><span>* </span>Licence number</Form.Label>
                                    <Form.Control required type='text' placeholder='Driver licence number' onChange={(e) => {
                                        formValues.driverLicenceNumber = e.target.value
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group id='carInsuranceForm.ControlDriverAge'>
                                    <Form.Label><span>* </span>Date of Birth</Form.Label>
                                    <Form.Control required type='text' placeholder='Date of birth' onChange={(e) => {
                                        formValues.driverDateOfBirth = e.target.value
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        Details of the other driver (if known)
                        <Row>
                            <Col>
                                <Form.Group id='carInsuranceForm.ControlOtherDriverSurname'>
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control type='text' placeholder='Driver surname' onChange={(e) => {
                                        formValues.otherDriverSurname = e.target.value
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group id='carInsuranceForm.ControlOtherDriverFirstName'>
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type='text' placeholder='Driver first name' onChange={(e) => {
                                        formValues.otherDriverFirstName = e.target.value
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group id='carInsuranceForm.ControlOtherDriverLicenceNumber'>
                                    <Form.Label>Licence number</Form.Label>
                                    <Form.Control type='text' placeholder='Driver licence number' onChange={(e) => {
                                        formValues.otherDriverLicenceNumber = e.target.value
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group id='carInsuranceForm.ControlOtherDriverLicencePlate'>
                                    <Form.Label>Licence plate</Form.Label>
                                    <Form.Control type='text' placeholder='Driver licence plate' onChange={(e) => {
                                        formValues.otherDriverLicencePlate = e.target.value
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group id='carInsuranceForm.ControlOtherDriverInsurance'>
                                    <Form.Label>Insurance provider (if known)</Form.Label>
                                    <Form.Control type='text' placeholder='Driver insurance' onChange={(e) => {
                                        formValues.otherDriverInsurance= e.target.value
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group id='carInsuranceForm.ControlIncidentDate'>
                                    <Form.Label><span>* </span>Date of incident</Form.Label>
                                    <Form.Control required type='text' placeholder='Date of incident' onChange={(e) => {
                                        formValues.incidentDate = e.target.value
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group id='carInsuranceForm.ControlPoliceReport'>
                                    <Form.Label>Police report number (if available)</Form.Label>
                                    <Form.Control type='text' placeholder='Police report number' onChange={(e) => {
                                        formValues.policeReport = e.target.value
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group id='carInsuranceForm.ControlOtherSelectDescription'>
                            <Form.Label>Please give a brief description of the incident</Form.Label>
                            <Form.Control as='textarea' rows='4' placeholder='Enter description here' onChange={(e) => {
                                formValues.accidentDescription = e.target.value
                            }}/>
                        </Form.Group>
                        <Button variant='secondary' type='submit'>
                            Submit claim
                        </Button>

                    </Form>
                </Card>
            </Container>
            
        </div>
    )
}

export default CarInsuranceForm
