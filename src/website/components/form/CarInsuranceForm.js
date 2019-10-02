import React from 'react'
import { Container, Form } from 'react-bootstrap'

const CarInsuranceForm = (props) => {
    return (
        <Container>
            <Form>
                <Form.Group id='carInsuranceForm.ControlSelectDescription'>
                    <Form.Label>Which option best describes your incident?</Form.Label>
                    <Form.Control as='select'>
                        <option>Glass damage only</option>
                        <option>Damage in an accident</option>
                        <option>Theft or attempted theft</option>
                        <option>Weather or natural event</option>
                        <option>Fire (including bushfire)</option>
                        <option>Something else</option>
                    </Form.Control>
                </Form.Group>


            </Form>
        </Container>
    )
}

export default CarInsuranceForm

{/* <Form.Group id=''>
    <Form.Label></Form.Label>
    <Form.Control type='' placeholder=''></Form.Control>
</Form.Group> */}