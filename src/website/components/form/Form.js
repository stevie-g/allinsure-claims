import React from 'react'
import { Button, Container, Card } from 'react-bootstrap'
import CarInsuranceForm from './CarInsuranceForm'
import HomeInsuranceForm from './HomeInsuranceForm'

const Form = (props) => {
    switch (props.insuranceType) {
        case 'car':
            return (
                <CarInsuranceForm appState={props.appState} insuranceType={props.insuranceType} updateInsuranceType={props.updateInsuranceType} db={props.db} />
            )
        case 'home':
            return (
                <HomeInsuranceForm appState={props.appState} insuranceType={props.insuranceType} updateInsuranceType={props.updateInsuranceType} db={props.db} />
            )
        case 'submitted':
            return (
                <div className='customer-home'>
                    <Container>
                        <Card>
                            Your claim has been submitted<br /><br />
                            <div>
                                <Button variant='outline-secondary' href='/customer'>
                                    Return home
                                </Button>
                            </div>
                        </Card>
                    </Container>
                    
                </div>
            )
        default:
            return <div></div>
    }
}

export default Form