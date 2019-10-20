import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

const CustomerHome = (props) => {
    console.log('home', props)
    const [firstName, updateFirstName] = useState('')

    useEffect(() => {
        const fetchData = () => {
            props.db.transaction((q) => {
                q.executeSql('SELECT firstname FROM CUSTOMER WHERE user_ID = ?;', [props.appState.user.id], function (q, results) {
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

    if (props.appState && props.appState.isLoggedIn) {
        return (
            <div>
                {(firstName ? (<h3>Welcome back {firstName}</h3>) : '')}
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

export default CustomerHome