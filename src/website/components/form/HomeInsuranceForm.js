import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const HomeInsuranceForm = (props) => {
    const formValues = {
        incidentType: '',
        incidentDate: '',
        damageLocation: '',
        incidentDescription: '',
        contentsList: '',
        cost: '',
        policeReport: ''
    }
    //need this?
    const [formState, updateFormState] = useState(formValues)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formState)
        props.updateInsuranceType('submitted')
    }
    return (
        <div className='newClaimForm'>
            <Form>
                <Form.Group id='homeInsuranceForm.ControlIncidentType'>
                    <Form.Label>Type of incident</Form.Label>
                    <Form.Control type='text' placeholder='e.g. fire, theft, etc' onChange={(e) => {
                        formState.incidentType = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlIncidentDate'>
                    <Form.Label>Date of incident</Form.Label>
                    <Form.Control type='text' placeholder='Date of incident' onChange={(e) => {
                        formState.incidentDate = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlDamageLocation'>
                    <Form.Label>Location of damage (if applicable)</Form.Label>
                    <Form.Control type='text' placeholder='e.g. lounge room, roof' onChange={(e) => {
                        formState.damageLocation = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlIncidentDescription'>
                    <Form.Label>Description of incident</Form.Label>
                    <Form.Control type='text' placeholder='Describe the incident' onChange={(e) => {
                        formState.incidentDescription = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlContentsList'>
                    <Form.Label>Please list damaged contents</Form.Label>
                    <Form.Control type='text' placeholder='Contents' onChange={(e) => {
                        formState.contentsList = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlCost'>
                    <Form.Label>Please enter estimated cost of damages (if known)</Form.Label>
                    <Form.Control type='text' placeholder='Cost' onChange={(e) => {
                        formState.cost = e.target.value
                    }}/>
                </Form.Group>
                <Form.Group id='homeInsuranceForm.ControlPoliceReport'>
                    <Form.Label>Police report number (if available)</Form.Label>
                    <Form.Control type='text' placeholder='Police report number' onChange={(e) => {
                        formState.policeReport = e.target.value
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

export default HomeInsuranceForm

{/* <Form.Control as='select'>
<option>Glass damage only</option>
<option>Damage in an accident</option>
<option>Theft or attempted theft</option>
<option>Weather or natural event</option>
<option>Fire (including bushfire)</option>
<option>Something else</option>
</Form.Control> */}