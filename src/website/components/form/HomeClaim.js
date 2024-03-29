import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

const isActive = (claim) => {
    return (claim.status === 'Pending' || claim.status === 'Approved' || claim.status === 'Provide more information')
}
const isPending = (claim) => {
    return (claim.status === 'Pending' || claim.status === 'Provide more information')
}

const selectOptions = ['Fire (including bushfire)', 'Water damage (including flood)', 'Other weather event', 'Theft or attempted theft', 'Non-theft property damage']


const HomeInsuranceForm = (props) => {
    console.log(props)
    const path = props.location.pathname.split('/')
    const claimID = path[2]
    const [claimValues, updateClaimValues] = useState({})
    const [isEditable, updateIsEditable] = useState(false)
    const [requestsInfo, updateRequestsInfo] = useState(false)
    const [isSubmitted, updateIsSubmitted] = useState(false)

    const formValues = {
        id: '',
        status: '',
        staffFeedback: '',
        additionalInfo: '',
        incidentType:'',
        incidentDate: '',
        policeReport: '',
        cost: '',
        incidentDescription: '',
        damageLocation: '',
        contentsList: '',
    }

    useEffect(() => {
        const fetchData = () => {
            props.db.transaction((q) => {
                q.executeSql('SELECT * FROM CLAIM WHERE ID = ?;', [claimID], function (q, results) {
                    formValues.id = results.rows.item(0).ID
                    formValues.status = results.rows.item(0).status
                    formValues.staffFeedback = results.rows.item(0).staff_feedback
                    formValues.additionalInfo = results.rows.item(0).more_info
                    formValues.incidentType = results.rows.item(0).incident_type
                    formValues.incidentDate = results.rows.item(0).incident_date
                    formValues.policeReport = results.rows.item(0).police_report
                    formValues.cost = results.rows.item(0).cost
                    formValues.accidentDescription = results.rows.item(0).description
                    formValues.damageLocation = results.rows.item(0).damage_location
                    formValues.contentsList = results.rows.item(0).contents_list
                    updateClaimValues(formValues)
                }, function (e, q) {
                    console.log(e.message)
                })
            })
        }

        if (props.db.transaction && props.appState.user.id !== 'unknown') {
            fetchData()
        }
    }, [props.appState, props.db])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formValues.additionalInfo) formValues.additionalInfo = claimValues.additionalInfo
        if (!formValues.incidentType) formValues.incidentType = claimValues.incidentType
        if (!formValues.incidentDate) formValues.incidentDate = claimValues.incidentDate
        if (!formValues.policeReport) formValues.policeReport = claimValues.policeReport
        if (!formValues.cost) formValues.cost = claimValues.cost
        if (!formValues.accidentDescription) formValues.accidentDescription = claimValues.accidentDescription
        if (!formValues.damageLocation) formValues.damageLocation = claimValues.damageLocation
        if (!formValues.contentsList) formValues.contentsList = claimValues.contentsList
        if (props.db.transaction) {
            props.db.transaction((q) => {
                q.executeSql('UPDATE CLAIM SET more_info = ?, incident_type = ?, incident_date = ?, police_report = ?, cost = ?, description = ?, damage_location = ?, contents_list = ? WHERE ID = ?;',
                    [formValues.additionalInfo, formValues.incidentType, formValues.incidentDate, formValues.policeReport, formValues.cost, formValues.accidentDescription, formValues.damageLocation, formValues.contentsList, claimValues.id],
                    function (q, results) {
                        updateIsEditable(!isEditable)
                        updateIsSubmitted(true)
                    }
                )
            })
        }
    }

    const updateStatus = (status) => {
        if (props.db.transaction) {
            props.db.transaction((q) => {
                q.executeSql('UPDATE CLAIM SET status = ? WHERE ID = ?;', [status, claimValues.id], function (q, results) {
                    updateIsSubmitted(true)
                })
            })
        }
    }

    const handleRequestForInfo = () => {
        if (props.db.transaction) {
            props.db.transaction((q) => {
                q.executeSql('UPDATE CLAIM SET status = "Provide more information", staff_feedback = ? WHERE ID = ?;', [formValues.staffFeedback, claimValues.id], function (q, results) {
                    updateIsSubmitted(true)
                })
            })
        }
    }

    if (props.appState.isLoggedIn) {
        if (!isSubmitted) {
            return (
                <div className='customer-home-form'>
                    <Container>
                        <Card>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id='homeInsuranceForm.ControlIncidentType'>
                                    <Form.Label>Type of incident</Form.Label>
                                    {!isEditable ? (
                                        <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.incidentType} onChange={(e) => {
                                            formValues.incidentType = e.target.value
                                        }}/>
                                    ) : (
                                        <Form.Control as='select' defaultValue={claimValues.incidentType} onChange={(e) => {
                                            formValues.incidentType = e.target.value
                                        }}>
                                        {selectOptions.map((title, index) => {
                                            return (
                                                <option key={index}>{title}</option>
                                            )
                                        })}
                                        </Form.Control>
                                    )}
                                </Form.Group>
                                <Form.Group id='homeInsuranceForm.ControlIncidentDate'>
                                    <Form.Label>Date of incident</Form.Label>
                                    <Form.Control required type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.incidentDate} onChange={(e) => {
                                        formValues.incidentDate = e.target.value
                                    }}/>
                                </Form.Group>
                                <Form.Group id='homeInsuranceForm.ControlDamageLocation'>
                                    <Form.Label>Location of damage</Form.Label>
                                    <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.damageLocation} onChange={(e) => {
                                        formValues.damageLocation = e.target.value
                                    }}/>
                                </Form.Group>
                                <Form.Group id='homeInsuranceForm.ControlIncidentDescription'>
                                    <Form.Label>Description of incident</Form.Label>
                                    <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.description} onChange={(e) => {
                                        formValues.accidentDescription = e.target.value
                                    }}/>
                                </Form.Group>
                                <Form.Group id='homeInsuranceForm.ControlContentsList'>
                                    <Form.Label>List of damaged contents</Form.Label>
                                    <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.contentsList} onChange={(e) => {
                                        formValues.contentsList = e.target.value
                                    }}/>
                                </Form.Group>
                                <Form.Group id='homeInsuranceForm.ControlCost'>
                                    <Form.Label>Estimated cost of damages (if known)</Form.Label>
                                    <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.cost} onChange={(e) => {
                                        formValues.cost = e.target.value
                                    }}/>
                                </Form.Group>
                                <Form.Group id='homeInsuranceForm.ControlPoliceReport'>
                                    <Form.Label>Police report number</Form.Label>
                                    <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.policeReport} onChange={(e) => {
                                        formValues.policeReport = e.target.value
                                    }}/>
                                </Form.Group>
                                {claimValues.staffFeedback && props.appState.user.type === 'customer' ? (
                                    <Form.Group id='carInsuranceForm.AdditionalInfo'>
                                        <Form.Label>{claimValues.staffFeedback}</Form.Label>
                                        <Form.Control type='text' plaintext {...(!isEditable ? {readOnly:true} : {})} defaultValue={claimValues.additionalInfo} onChange={(e) => {
                                            formValues.additionalInfo = e.target.value
                                        }}/>
                                    </Form.Group>
                                ) : (claimValues.staffFeedback || requestsInfo) && props.appState.user.type === 'staff' ? (
                                    <Form.Group id='carInsuranceForm.RequestInfo'>
                                        <Form.Label>Provide a message to the customer:</Form.Label>
                                        <Form.Control type='text' plaintext defaultValue={claimValues.staffFeedback} onChange={(e) => {
                                            formValues.staffFeedback = e.target.value
                                        }}/>
                                    </Form.Group>
                                ) : (
                                    ''
                                )}
                                {(props.appState.user.type === 'customer' && isActive(claimValues)) ? (
                                    <div>
                                        <Button variant='secondary' onClick={() => updateIsEditable(!isEditable)}>
                                            {!isEditable ? 'Edit details' : 'Cancel'}
                                        </Button>
                                        {isEditable ? (
                                            <Button variant='primary' type='Submit' onClick={(e) => handleSubmit(e)}>
                                                Save changes
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                ) : props.appState.user.type === 'staff' && isPending(claimValues) ? (
                                    <div>
                                        <Row>
                                            <Col sm={8}>
                                                <Button className='button-staff' variant='secondary' onClick={() => {
                                                    if (!formValues.staffFeedback) updateRequestsInfo(true)
                                                    else handleRequestForInfo()
                                                }}>
                                                    {(!requestsInfo ? (<span>Request more information</span>) : (<span>Save changes</span>))}
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button className='button-staff' variant='danger' onClick={() => updateStatus('Denied')}>
                                                    Deny
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button className='button-staff' variant='success' onClick={() => updateStatus('Approved')}>
                                                    Approve
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </Form>
                        </Card>
                    </Container>
                    
                </div>
            )
        }
        else {
            return (
                <div className='customer-home'>
                    <Container>
                        <Card>
                            Your changes have been saved
                            <div>
                                <Button variant='secondary' href={`/${props.appState.user.type}`}>
                                    Return home
                                </Button>
                            </div>
                        </Card>
                    </Container>
                    
                </div>
            )
        }
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

export default HomeInsuranceForm
