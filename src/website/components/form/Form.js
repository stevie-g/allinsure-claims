import React from 'react'
import { Button } from 'react-bootstrap'
import CarInsuranceForm from './CarInsuranceForm'
import HomeInsuranceForm from './HomeInsuranceForm'

const Form = (props) => {
    switch (props.insuranceType) {
        case 'car':
            return (
                <CarInsuranceForm appState={props.appState} insuranceType={props.insuranceType} updateInsuranceType={props.updateInsuranceType} />
            )
        case 'home':
            return (
                <HomeInsuranceForm appState={props.appState} insuranceType={props.insuranceType} updateInsuranceType={props.updateInsuranceType} />
            )
        case 'submitted':
            return (
                <div>
                    Your claim has been submitted!
                    <div>
                        <Button variant='outline-secondary' href='/customer'>
                            Return home
                        </Button>
                    </div>
                </div>
            )
        default:
            return <div></div>
    }
}

export default Form