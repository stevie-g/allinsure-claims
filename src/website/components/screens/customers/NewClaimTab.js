import React, { useState } from 'react'
import Form from '../../form/Form'
import { Container, DropdownButton, DropdownItem } from 'react-bootstrap'

const NewClaimTab = () => {
    const [insuranceType, updateInsuranceType] = useState('')

    return (
        <Container style={{padding: '20px'}}>
            <DropdownButton id='insuranceDropdown' title='Please select an insurance policy' variant='secondary'>
                <DropdownItem as='button' eventKey='car' onSelect={() => {
                    updateInsuranceType('car')
                }}>My car insurance policy</DropdownItem>
            </DropdownButton>
            {insuranceType && <Form insuranceType={insuranceType}/>}
        </Container>
    )
}

export default NewClaimTab