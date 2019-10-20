import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const isActive = (claim) => {
    return (claim.status === 'Pending' || claim.status === 'Approved' || claim.status === 'Provide more information')
}

const CarClaim = (props) => {
    console.log(props)
    const path = props.location.pathname.split('/')
    const claimID = path[2]
    const [claimValues, updateClaimValues] = useState({})
    const [isEditable, updateIsEditable] = useState(false)
    const [requestsInfo, updateRequestsInfo] = useState(false)

    const formValues = {
        id: '',
        // type: '',
        // userID: '',
        // staffID: '',
        // submitDate: '',
        status: '',
        staffFeedback: '',
        additionalInfo: '',
        // incidentType:'',
        incidentDate: '',
        policeReport: '',
        // cost: '',
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
        // damageLocation: '',
        // contentsList: '',
    }

    useEffect(() => {
        const fetchData = () => {
            props.db.transaction((q) => {
                q.executeSql('SELECT * FROM CLAIM WHERE ID = ?;', [claimID], function (q, results) {
                    console.log(results)
                    formValues.id = results.rows.item(0).ID
                    // formValues.type = results.rows.item(0).type
                    // formValues.userID = results.rows.item(0).user_ID
                    // formValues.staffID = results.rows.item(0).staff_ID
                    // formValues.submitDate = results.rows.item(0).submit_date
                    formValues.status = results.rows.item(0).status
                    formValues.staffFeedback = results.rows.item(0).staff_feedback
                    formValues.additionalInfo = results.rows.item(0).more_info
                    // formValues.incidentType = results.rows.item(0).incident_type
                    formValues.incidentDate = results.rows.item(0).incident_date
                    formValues.policeReport = results.rows.item(0).police_report
                    // formValues.cost = results.rows.item(0).cost
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
                    // formValues.damageLocation = results.rows.item(0).damage_location
                    // formValues.contentsList = results.rows.item(0).contents_list
                    console.log(formValues)
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
        // if (!formValues.id) formValues.id = claimValues.id
        // if (!formValues.type) formValues.type = claimValues.type
        // if (!formValues.userID) formValues.userID = claimValues.userID
        // if (!formValues.staffID) formValues.staffID = claimValues.staffID
        // if (!formValues.submitDate) formValues.submitDate = claimValues.submitDate
        // if (!formValues.status) formValues.status = claimValues.status
        // if (!formValues.staffFeedback) formValues.staffFeedback = claimValues.staffFeedback
        if (!formValues.additionalInfo) formValues.additionalInfo = claimValues.additionalInfo
        // if (!formValues.incidentType) formValues.incidentType = claimValues.incidentType
        if (!formValues.incidentDate) formValues.incidentDate = claimValues.incidentDate
        if (!formValues.policeReport) formValues.policeReport = claimValues.policeReport
        // if (!formValues.cost) formValues.cost = claimValues.cost
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
        // if (!formValues.damageLocation) formValues.damageLocation = claimValues.damageLocation
        // if (!formValues.contentsList) formValues.contentsList = claimValues.contentsList
        console.log(formValues)
        if (props.db.transaction) {
            props.db.transaction((q) => {
                q.executeSql('UPDATE CLAIM SET more_info = ?, incident_date = ?, police_report = ?, description = ?, driver_surname = ?, driver_firstname = ?, driver_licence_number = ?, driver_dob = ?, otherdriver_surname = ?, otherdriver_firstname = ?, otherdriver_licence_number = ?, otherdriver_licence_plate = ?, otherdriver_insurance = ? WHERE ID = ?;',
                    [formValues.additionalInfo, formValues.incidentDate, formValues.policeReport, formValues.accidentDescription, formValues.driverSurname, formValues.driverFirstName,
                        formValues.driverLicenceNumber, formValues.driverDateOfBirth, formValues.otherDriverSurname, formValues.otherDriverFirstName, formValues.otherDriverLicenceNumber,
                        formValues.otherDriverLicencePlate, formValues.otherDriverInsurance, claimValues.id],
                    function (q, results) {
                        console.log('success!')
                        updateIsEditable(!isEditable)
                    }
                )
            })
        }
    }

    const updateStatus = (status) => {
        if (props.db.transaction) {
            props.db.transaction((q) => {
                q.executeSql('UPDATE CLAIM SET status = ? WHERE ID = ?;', [status, claimValues.id], function (q, results) {
                    console.log('success')

                })
            })
        }
    }

    const handleRequestForInfo = () => {
        if (props.db.transaction) {
            props.db.transaction((q) => {
                q.executeSql('UPDATE CLAIM SET status = "Provide more information", staff_feedback = ? WHERE ID = ?;', [formValues.staffFeedback, claimValues.id], function (q, results) {
                    console.log('success - info')
                })
            })
        }
    }

    return (
        <div>
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
                        <Button variant='secondary' onClick={() => updateIsEditable(!isEditable)}>
                            {!isEditable ? 'Edit details' : 'Cancel'}
                        </Button>
                        {isEditable ? (
                            <Button variant='primary' type='Submit' onClick={(e) => handleSubmit(e)}>
                                Save changes
                            </Button>
                        ) : (
                            ''
                        )}
                    </div>
                ) : props.appState.user.type === 'staff' ? (
                    <div>
                        <Button variant='danger' onClick={() => updateStatus('Denied')}>
                            Deny
                        </Button>
                        <Button variant='secondary' onClick={() => {
                            if (!formValues.staffFeedback) updateRequestsInfo(true)
                            else handleRequestForInfo()
                        }}>
                            {(!requestsInfo ? (<span>Request more information</span>) : (<span>Save changes</span>))}
                        </Button>
                        <Button variant='success' onClick={() => updateStatus('Approved')}>
                            Approve
                        </Button>
                    </div>
                ) : (
                    ''
                )}
            </Form>
        </div>
    )
}

export default CarClaim
