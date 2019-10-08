import React from 'react'

const HomeTab = (props) => {
    console.log('home', props)
    return (
        <h3>Welcome back {props.appState.user.firstName}</h3>
    )
}

export default HomeTab