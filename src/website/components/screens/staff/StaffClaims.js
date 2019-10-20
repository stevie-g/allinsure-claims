import React, { useState, useEffect } from 'react'
import { Container, Table, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const isActive = (claim) => {
    return (claim.status === 'Pending' || claim.status === 'Approved' || claim.status === 'Provide more information')
}

const StaffClaims = (props) => {
    const [claims, updateClaims] = useState([])

    useEffect(() => {
        const fetchClaims = () => {
            let claimsArray = []
            if (props.db) {
                props.db.transaction((q) => {
                    q.executeSql('SELECT ID, user_ID, type, status FROM CLAIM WHERE staff_ID = ?;', [props.appState.user.id], function (q, results) {
                        console.log(results)
                        let length = results.rows.length, i
                        for (i = 0; i < length; i++) {
                            let individualClaim = {
                                id: '',
                                user: '',
                                insuranceType: '',
                                status: ''
                            }
                            individualClaim.id = results.rows.item(i).ID
                            individualClaim.user = results.rows.item(i).user_ID
                            individualClaim.insuranceType = results.rows.item(i).type
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
                    <h3>Pending claims</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Claim ID</th>
                                <th>User ID</th>
                                <th>Claim Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.filter((claim) => (claim.status === 'Pending' || claim.status === 'Provide more information')).map((claim, index) => (
                                <tr key={index}>
                                    <td><Link to={`/claim/${claim.id}`}>{claim.id}</Link></td>
                                    <td>{claim.user}</td>
                                    <td>{claim.insuranceType}</td>
                                    <td>{claim.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
                <Card>
                    <h3>Approved claims</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Claim ID</th>
                                <th>User ID</th>
                                <th>Claim Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.filter((claim) => claim.status === 'Approved').map((claim, index) => (
                                <tr key={index}>
                                    <td><Link to={`/claim/${claim.id}`}>{claim.id}</Link></td>
                                    <td>{claim.user}</td>
                                    <td>{claim.insuranceType}</td>
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

export default StaffClaims