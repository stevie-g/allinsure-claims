import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, isLoggedIn, appState, ...rest}) => {
    console.log(isLoggedIn)
    return (
        <Route { ...rest } render={(props) => (isLoggedIn ?
            (
                <Component appState={appState} {...props} />
            ) :
            (
                <Redirect to='/' />
            ))}
        />
    )
}

export default PrivateRoute