import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const CarInsuranceForm = (props) => {
    const formValues = {
        driverSurname: '',
        driverFirstName: '',
        driverLicenceNumber: '',
        driverAge: '',
        otherDriverSurname: '',
        otherDriverFirstName: '',
        otherDriverLicenceNumber: '',
        otherDriverLicencePlate: '',
        otherDriverInsurance: '',
        accidentDate: '',
        policeReport: '',
        accidentDescription: ''
    }
    const [formState, updateFormState] = useState(formValues)
    const [otherDriver, displayOtherDriver] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formState)
        props.updateInsuranceType('submitted')
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
                                formState.driverSurname = e.target.value
                            }}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id='carInsuranceForm.ControlDriverFirstName'>
                            <Form.Label>First name</Form.Label>
                            <Form.Control type='text' placeholder='Driver first name' onChange={(e) => {
                                formState.driverFirstName = e.target.value
                            }}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group id='carInsuranceForm.ControlDriverLicenceNumber'>
                            <Form.Label>Licence number</Form.Label>
                            <Form.Control type='text' placeholder='Driver licence number' onChange={(e) => {
                                formState.driverLicenceNumber = e.target.value
                            }}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id='carInsuranceForm.ControlDriverAge'>
                            <Form.Label>Age</Form.Label>
                            <Form.Control type='text' placeholder='Driver age' onChange={(e) => {
                                formState.driverAge = e.target.value
                            }}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group id='carInsuranceForm.ControlOtherDriverRadio'>
                    <Form.Label>Details of the other driver (if available)</Form.Label>
                    <Form.Check type='radio' label='Yes' name='otherDriverRadio' id='otherDriverRadio1' onChange={() => {
                        displayOtherDriver(true)
                    }}/>
                    <Form.Check inline type='radio' label='No' name='otherDriverRadio' id='otherDriverRadio2' onChange={() => {
                        displayOtherDriver(false)
                    }}/>
                </Form.Group>
                {otherDriver && <div>
                    <Row>
                        <Col>
                            <Form.Group id='carInsuranceForm.ControlOtherDriverSurname'>
                                <Form.Label>Surname</Form.Label>
                                <Form.Control type='text' placeholder='Driver surname' onChange={(e) => {
                                    formState.otherDriverSurname = e.target.value
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group id='carInsuranceForm.ControlOtherDriverFirstName'>
                                <Form.Label>First name</Form.Label>
                                <Form.Control type='text' placeholder='Driver first name' onChange={(e) => {
                                    formState.otherDriverFirstName = e.target.value
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group id='carInsuranceForm.ControlOtherDriverLicenceNumber'>
                                <Form.Label>Licence number</Form.Label>
                                <Form.Control type='text' placeholder='Driver licence number' onChange={(e) => {
                                    formState.otherDriverLicenceNumber = e.target.value
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group id='carInsuranceForm.ControlOtherDriverLicencePlate'>
                                <Form.Label>Licence plate</Form.Label>
                                <Form.Control type='text' placeholder='Driver licence plate' onChange={(e) => {
                                    formState.otherDriverLicencePlate = e.target.value
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group id='carInsuranceForm.ControlOtherDriverInsurance'>
                                <Form.Label>Insurance provider (if known)</Form.Label>
                                <Form.Control type='text' placeholder='Driver insurance' onChange={(e) => {
                                    formState.otherDriverInsurance= e.target.value
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>}
                <Row>
                    <Col>
                        <Form.Group id='carInsuranceForm.ControlIncidentDate'>
                            <Form.Label>Date of incident</Form.Label>
                            <Form.Control type='text' placeholder='Date of incident' onChange={(e) => {
                                formState.accidentDate = e.target.value
                            }}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id='carInsuranceForm.ControlPoliceReport'>
                            <Form.Label>Police report number (if available)</Form.Label>
                            <Form.Control type='text' placeholder='Police report number' onChange={(e) => {
                                formState.policeReport = e.target.value
                            }}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group id='carInsuranceForm.ControlOtherSelectDescription'>
                    <Form.Label>Please give a brief description of the incident</Form.Label>
                    <Form.Control type='text' placeholder='Enter description here' onChange={(e) => {
                        formState.accidentDescription = e.target.value
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
