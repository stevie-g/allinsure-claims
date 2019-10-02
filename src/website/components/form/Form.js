import React from 'react'
import CarInsuranceForm from './CarInsuranceForm'

const Form = (props) => {
    switch (props.insuranceType) {
        case 'car':
            return (
                <CarInsuranceForm />
            )
        case 'home':
            return (
                <div></div>
            )
        default:
            return <div></div>
    }
}

export default Form