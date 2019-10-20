import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const StaffHomePage = (props) => {
    console.log('home', props)
    const [firstName, updateFirstName] = useState('')

    useEffect(() => {
        const fetchData = () => {
            props.db.transaction((q) => {
                q.executeSql('SELECT firstname FROM STAFF WHERE staff_ID = ?;', [props.appState.user.id], function (q, results) {
                    console.log(results)
                    let name = results.rows.item(0).firstname
                    updateFirstName(name)
                })
            })
        }

        if (props.db.transaction && props.appState.user.id !== 'unknown') {
            fetchData()
        }
    }, [props.appState, props.db])

    if (props.appState.isLoggedIn && props.appState.user.type === 'staff') {
        return (
            <div>
                {(firstName ? (<h3>Hi {firstName}</h3>) : '')}
            </div>
        )
    }
    else {
        localStorage.userType = 'staff'
        return (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}
            />
        )
    }
}

export default StaffHomePage