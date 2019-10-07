import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import HomeTab from './HomeTab'
import ClaimsTab from './ClaimsTab'
import AccountTab from './AccountTab'
import NewClaimTab from './NewClaimTab'

const CustomerHomePage = (props) => {
    return (
        <div className='tabs'>
            <Tabs defaultActiveKey={'home'}>
                <Tab eventKey= {'home'} title={'Home'}>
                    <HomeTab appState={props.appState} />
                </Tab>
                <Tab eventKey={'claims'} title={'My Claims'}>
                    <ClaimsTab appState={props.appState} />
                </Tab>
                <Tab eventKey={'account'} title={'Account Details'}>
                    <AccountTab appState={props.appState} />
                </Tab>
                <Tab eventKey={'new'} title={'New Claim'} pullright='true'>
                    <NewClaimTab appState={props.appState} />
                </Tab>
            </Tabs>
        </div>
    )
}

export default CustomerHomePage