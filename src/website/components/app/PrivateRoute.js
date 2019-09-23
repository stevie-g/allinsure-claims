import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, appState, ...rest}) => {
    return (
        <Route { ...rest } render={(props) => appState.isLoggedIn ?
            (
                <Component {...props} />
            ) : 
            (
                <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }}
                />
            )}
        />
    )
}

export default PrivateRoute