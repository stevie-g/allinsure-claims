import React, { useState } from 'react'
import Form from '../../form/Form'
import { Container, DropdownButton, DropdownItem } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

const CustomerNewClaim = (props) => {
    const [insuranceType, updateInsuranceType] = useState('')

    if (props.appState.isLoggedIn && props.appState.user.type === 'customer') {
        return (
            <div className='customer-home'>
                <Container style={{padding: '20px'}}>
                    <DropdownButton inline id='insuranceDropdown' title='Please select an insurance type' variant='secondary'>
                        <DropdownItem as='button' eventKey='car' onSelect={() => {
                            updateInsuranceType('car')
                        }}>Car insurance</DropdownItem>
                        <DropdownItem as='button' eventKey='home' onSelect={() => {
                            updateInsuranceType('home')
                        }}>Home insurance</DropdownItem>
                    </DropdownButton>
                    {insuranceType && <Form insuranceType={insuranceType} updateInsuranceType={updateInsuranceType} appState={props.appState} db={props.db}/>}
                </Container>
            </div>
        )
    }
    else {
        localStorage.userType = 'customer'
        return (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}
            />
        )
    }
}

export default CustomerNewClaim