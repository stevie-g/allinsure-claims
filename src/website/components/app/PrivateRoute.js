import React from 'react'
import CustomerHomePage from '../screens/customers/CustomerHomePage'
import StaffHomePage from '../screens/staff/StaffHomePage'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, appState, ...rest}) => {
    console.log("private route", rest)

    return (
        <Route { ...rest } render={(props) => appState.isLoggedIn ?
            (
                <Component {...props} />
            ) : 
            (
                <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                }}
                />
            )}
        />
    )
}

export default PrivateRoute