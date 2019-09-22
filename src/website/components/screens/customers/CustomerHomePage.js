import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import HomeTab from './HomeTab'
import ClaimsTab from './ClaimsTab'
import AccountTab from './AccountTab'
import NewClaimTab from './NewClaimTab'

const CustomerHomePage = () => {
    return (
        <Tabs defaultActiveKey={'home'}>
            <Tab eventKey= {'home'} title={'Home'}>
                <HomeTab />
            </Tab>
            <Tab eventKey={'claims'} title={'My Claims'}>
                <ClaimsTab />
            </Tab>
            <Tab eventKey={'account'} title={'Account Details'}>
                <AccountTab />
            </Tab>
            <Tab eventKey={'new'} title={'New Claim'} pullright='true'>
                <NewClaimTab />
            </Tab>
        </Tabs>
    )
}

export default CustomerHomePage