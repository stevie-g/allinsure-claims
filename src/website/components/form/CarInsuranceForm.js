import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'



const CarInsuranceForm = (props) => {
    if (!localStorage.carCount) {
        localStorage.carCount = '0'
    }
    const formValues = {
        driverSurname: '',
        driverFirstName: '',
        driverLicenceNumber: '',
        driverDateOfBirth: '',
        otherDriverSurname: '',
        otherDriverFirstName: '',
        otherDriverLicenceNumber: '',
        otherDriverLicencePlate: '',
        otherDriverInsurance: '',
        accidentDate: '',
        policeReport: '',
        accidentDescription: ''
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (props.db) {
            props.db.transaction((q) => {
                q.executeSql('CREATE TABLE IF NOT EXISTS CLAIM (id unique, insuranceType, dateOfClaim, status)')
                q.executeSql('INSERT INTO CLAIM VALUES (?, ?, ?, ?)', ["200", "Car", "15/10/19", "Pending"], function (q, results) {
                    let storageNum = parseInt(localStorage.carCount)
                    storageNum++
                    let storageString = storageNum.toString()
                    localStorage.carCount = storageString
                })
            })
            props.updateInsuranceType('submitted')
        }
    }
    return (
        <div className='newClaimForm'>
            <Form>
                Who was driving the car?
                <Row>
                    <Col>
                        <Form.Group id='carInsuranceForm.ControlDriverSurname'>
                            <Form.Label>Surname</Form.Label>
                            <Form.Control type='text' placeholder='Driver surname' onChange={(e) => {
                                formValues.driverSurname = e.target.value
                            }}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id='carInsuranceForm.ControlDriverFirstName'>
                            <Form.Label>First name</Form.Label>
                            <Form.Control type='text' placeholder='Driver first name' onChange={(e) => {
                                formValues.driverFirstName = e.target.value
                            }}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group id='carInsuranceForm.ControlDriverLicenceNumber'>
                            <Form.Label>Licence number</Form.Label>
                            <Form.Control type='text' placeholder='Driver licence number' onChange={(e) => {
                                formValues.driverLicenceNumber = e.target.value
                            }}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id='carInsuranceForm.ControlDriverAge'>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type='text' placeholder='Date of birth' onChange={(e) => {
                                formValues.driverDateOfBirth = e.target.value
                            }}/>
                        </Form.Group>
                    </Col>
                </Row>
                {/* <Form.Group id='carInsuranceForm.ControlOtherDriverRadio'>
                    <Form.Label>Details of the other driver (if available)</Form.Label>
                    <Form.Check type='radio' label='Yes' name='otherDriverRadio' id='otherDriverRadio1' onChange={() => {
                        displayOtherDriver(true)
                    }}/>
                    <Form.Check inline type='radio' label='No' name='otherDriverRadio' id='otherDriverRadio2' onChange={() => {
                        displayOtherDriver(false)
                    }}/>
                </Form.Group> */}
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
                            <Form.Label>Date of incident</Form.Label>
                            <Form.Control type='text' placeholder='Date of incident' onChange={(e) => {
                                formValues.accidentDate = e.target.value
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
                    <Form.Control type='text' placeholder='Enter description here' onChange={(e) => {
                        formValues.accidentDescription = e.target.value
                    }}/>
                </Form.Group>
                <Button variant='secondary' type='Submit' onClick={(e) => {
                    handleSubmit(e)
                }}>
                    Submit claim
                </Button>

            </Form>
        </div>
    )
}

export default CarInsuranceForm
