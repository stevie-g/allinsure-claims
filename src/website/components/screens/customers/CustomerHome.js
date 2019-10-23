import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'

const CustomerHome = (props) => {
    const [firstName, updateFirstName] = useState('')

    useEffect(() => {
        const fetchData = () => {
            props.db.transaction((q) => {
                q.executeSql('SELECT firstname FROM CUSTOMER WHERE user_ID = ?;', [props.appState.user.id], function (q, results) {
                    let name = results.rows.item(0).firstname
                    updateFirstName(name)
                })
            })
        }
        if (props.db.transaction && props.appState.user.id !== 'unknown') {
            fetchData()
        }
    }, [props.appState, props.db])

    if (props.appState.isLoggedIn && props.appState.user.type === 'customer') {
        return (
            <div className='customer-home'>
                <Container>
                    <Card>
                        {(firstName ? (<h3>Welcome back {firstName}</h3>) : '')}
                    </Card>
                    <Card>
                        <Card.Title>Important Announcements</Card.Title>
                    </Card>
                </Container>
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