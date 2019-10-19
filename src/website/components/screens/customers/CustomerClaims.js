import React, { useState, useEffect } from 'react'
import { Container, Table, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const isActive = (claim) => {
    return (claim.status === 'Pending' || claim.status === 'Approved' || claim.status === 'Provide more information')
}

const CustomerClaims = (props) => {
    const [claims, updateClaims] = useState([])

    useEffect(() => {
        const fetchClaims = () => {
            let claimsArray = []
            if (props.db !== null) {
                props.db.transaction((q) => {
                    q.executeSql('SELECT ID, type, submit_date, status FROM CLAIM WHERE user_id = ?;', [props.appState.user.id], function (q, results) {
                        console.log(results)
                        let length = results.rows.length, i
                        for (i = 0; i < length; i++) {
                            let individualClaim = {
                                id: '',
                                insuranceType: '',
                                dateOfClaim: '',
                                status: ''
                            }
                            individualClaim.id = results.rows.item(i).ID
                            individualClaim.insuranceType = results.rows.item(i).type
                            individualClaim.dateOfClaim = results.rows.item(i).submit_date
                            individualClaim.status = results.rows.item(i).status
                            claimsArray.push(individualClaim)
                        }
                        updateClaims(claimsArray)
                    }, function (q, e) {
                        console.log(e.message)
                    })
                })
            }
        }

        if (props.db.transaction) {
            fetchClaims()
        }
    }, [props.appState, props.db])

    if (claims.length > 0) {
        return (
            <Container>
                <Card>
                    <Button variant='secondary' href='/customer/newclaim'>
                        New claim
                    </Button>
                    <h3>Active claims</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Claim ID</th>
                                <th>Insurance Type</th>
                                <th>Date of claim</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.filter((claim) => isActive(claim)).map((claim, index) => (
                                <tr key={index}>
                                    <td><Link to={`/claim/${claim.id}`}>{claim.id}</Link></td>
                                    <td>{claim.insuranceType}</td>
                                    <td>{claim.dateOfClaim}</td>
                                    <td>{claim.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
                <Card>
                    <h3>History</h3>
                    <Table>
                    <thead>
                            <tr>
                                <th>Claim ID</th>
                                <th>Insurance Type</th>
                                <th>Date of claim</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.filter((claim) => !isActive(claim)).map((claim, index) => (
                                <tr key={index}>
                                    <td><Link to={`/claim/${claim.id}`}>{claim.id}</Link></td>
                                    <td>{claim.insuranceType}</td>
                                    <td>{claim.dateOfClaim}</td>
                                    <td>{claim.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </Container>
        )
    }
    else {
        return (
            <Container>
                There are no claims to view.
            </Container>
        )
    }
}

export default CustomerClaims