import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import HomeTab from './HomeTab'
import ClaimsTab from './ClaimsTab'
import AccountTab from './AccountTab'
import NewClaimTab from './NewClaimTab'

const CustomerHomePage = (props) => {
    console.log('customer home props', props)
    return (
        <div className='tabs'>
            <Tabs defaultActiveKey={'home'}>
                <Tab eventKey= {'home'} title={'Home'}>
                    <HomeTab appState={props.appState} db={props.db} />
                </Tab>
                <Tab eventKey={'claims'} title={'My Claims'}>
                    <ClaimsTab appState={props.appState} db={props.db} />
                </Tab>
                <Tab eventKey={'account'} title={'Account Details'}>
                    <AccountTab appState={props.appState} db={props.db} />
                </Tab>
                <Tab eventKey={'new'} title={'New Claim'} pullright='true'>
                    <NewClaimTab appState={props.appState} db={props.db} />
                </Tab>
            </Tabs>
        </div>
    )
}

export default CustomerHomePage