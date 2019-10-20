import React from 'react'
import { Form, Button } from 'react-bootstrap'


const selectOptions = ['Fire (including bushfire)', 'Water damage (including flood)', 'Other weather event', 'Theft or attempted theft', 'Non-theft property damage']


const HomeInsuranceForm = (props) => {
    const formValues = {
        id: `H000000${localStorage.count}`,
        type: 'Home',
        userID: props.appState.user.id,
        staffID: props.appState.user.id % 2,
        submitDate: new Date().toString(),
        status: 'Pending',
        staffFeedback: '',
        additionalInfo: '',
        incidentType:'',
        incidentDate: '',
        policeReport: '',
        cost: '',
        incidentDescription: '',
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
        console.log(formValues)
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
        <div className='newClaimForm'>
            <Form onSubmit={handleSubmit}>
                <Form.Group id='homeInsuranceForm.ControlIncidentType'>
                    <Form.Label>Type of incident</Form.Label>
                    <Form.Control as='select' onChange={(e) => {
                        formValues.incidentType = e.target.value
                    }}>
                    {selectOptions.map((title, index) => (
                        <option key={index}>{title}</option>
                    ))}
                        {/* <option>Fire (including bushfire)</option>
                        <option>Water damage (including flood)</option>
                        <option>Other weather event</option>
                        <option>Theft or attempted theft</option>
                        <option>Non-theft property damage</option> */}
                    </Form.Control>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlIncidentDate'>
                    <Form.Label><span>* </span>Date of incident</Form.Label>
                    <Form.Control required type='text' placeholder='Date of incident' onChange={(e) => {
                        formValues.incidentDate = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlDamageLocation'>
                    <Form.Label>Location of damage (if applicable)</Form.Label>
                    <Form.Control as='textarea' rows='4' placeholder='e.g. lounge room, roof' onChange={(e) => {
                        formValues.damageLocation = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlIncidentDescription'>
                    <Form.Label>Description of incident</Form.Label>
                    <Form.Control as='textarea' rows='4' placeholder='Describe the incident' onChange={(e) => {
                        formValues.incidentDescription = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlContentsList'>
                    <Form.Label>Please list damaged contents</Form.Label>
                    <Form.Control as='textarea' rows='4' placeholder='Contents' onChange={(e) => {
                        formValues.contentsList = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlCost'>
                    <Form.Label>Please enter estimated cost of damages (if known)</Form.Label>
                    <Form.Control type='text' placeholder='Cost' onChange={(e) => {
                        formValues.cost = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlPoliceReport'>
                    <Form.Label>Police report number (if available)</Form.Label>
                    <Form.Control type='text' placeholder='Police report number' onChange={(e) => {
                        formValues.policeReport = e.target.value
                    }}/>
                </Form.Group>

                <Button variant='secondary' type='Submit'>
                    Submit claim
                </Button>

            </Form>
        </div>
    )
}

export default HomeInsuranceForm

