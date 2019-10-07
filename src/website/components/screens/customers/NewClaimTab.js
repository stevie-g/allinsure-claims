import React, { useState } from 'react'
import Form from '../../form/Form'
import { Container, DropdownButton, DropdownItem } from 'react-bootstrap'

const NewClaimTab = (props) => {
    const [insuranceType, updateInsuranceType] = useState('')

    return (
        <Container style={{padding: '20px'}}>
            New Claim
            <DropdownButton id='insuranceDropdown' title='Please select an insurance policy' variant='secondary'>
                <DropdownItem as='button' eventKey='car' onSelect={() => {
                    updateInsuranceType('car')
                }}>My car insurance policy</DropdownItem>
                <DropdownItem as='button' eventKey='home' onSelect={() => {
                    updateInsuranceType('home')
                }}>My home insurance policy</DropdownItem>
            </DropdownButton>
            {insuranceType && <Form insuranceType={insuranceType} updateInsuranceType={updateInsuranceType} appState={props.appState}/>}
        </Container>
    )
}

export default NewClaimTab