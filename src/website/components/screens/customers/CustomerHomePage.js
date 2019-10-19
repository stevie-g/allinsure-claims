import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

const CustomerHomePage = (props) => {
    console.log('customer home props', props)
    if (props.appState.isLoggedIn) {
        return (
            <div className='tabs'>

                {/* <Tabs defaultActiveKey={'home'}>
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
                </Tabs> */}
            </div>
        )
    }
    else {
        return (
            <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }}
            />
        )
    }
}

export default CustomerHomePage