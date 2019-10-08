import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'

const ClaimsTab = (props) => {
    const [claims, updateClaims] = useState([])

    useEffect(() => {
        const fetchClaims = () => {
            let claimsArray = []
            if (props.db !== null) {
                props.db.transaction((q) => {
                    q.executeSql('SELECT * FROM CLAIM', [], function (q, results) {
                        let length = results.rows.length, i
                        for (i = 0; i < length; i++) {
                            let individualClaim = {
                                id: '',
                                insuranceType: '',
                                dateOfClaim: '',
                                status: ''
                            }
                            individualClaim.id = results.rows.item(i).id
                            individualClaim.insuranceType = results.rows.item(i).insuranceType
                            individualClaim.dateOfClaim = results.rows.item(i).dateOfClaim
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
    }, [props.db])

    if (claims.length > 0) {
        return (
            <Container>
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
                        {claims.map((claim, index) => (
                            <tr key={index}>
                                <td>{claim.id}</td>
                                <td>{claim.insuranceType}</td>
                                <td>{claim.dateOfClaim}</td>
                                <td>{claim.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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

export default ClaimsTab