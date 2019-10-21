import React from 'react'
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap'

const NavMenu = (props) => {
    if (props.appState.user.type === 'customer') {
        return (
            <div className='navMenu'>
                <Container>
                    <Navbar variant='dark'>
                        <Row>
                            <Col sm={2}>
                                <Navbar.Brand>AllInsure Claims</Navbar.Brand>
                            </Col>
                            <Col sm={8}>
                                <Nav>
                                    <Nav.Link href='/customer'>Home</Nav.Link>
                                    <Nav.Link href='/customer/account'>Account Details</Nav.Link>
                                    <Nav.Link href='/customer/claims'>My Claims</Nav.Link>
                                    <Nav.Link href='/customer/newclaim'>Make a Claim</Nav.Link>
                                </Nav>
                            </Col>
                            <Col>
                                <Button variant='secondary' href='/' onClick={() => {
                                    localStorage.clear()
                                }}>
                                    Log out
                                </Button>
                            </Col>
                        </Row>
                    </Navbar>
                </Container>
            </div>
        )
    }
    else if (props.appState.user.type === 'staff') {
        return (
            <div className='navMenu'>
                <Container>
                    <Navbar variant='dark'>
                        <Row>
                            <Col sm={2}>
                                <Navbar.Brand>AllInsure Claims</Navbar.Brand>
                            </Col>
                            <Col sm={8}>
                                <Nav>
                                    <Nav.Link href='/staff'>Home</Nav.Link>
                                    <Nav.Link href='/staff/claims'>Assigned Claims</Nav.Link>
                                </Nav>
                            </Col>
                            <Col>
                                <Button variant='secondary' href='/' onClick={() => {
                                    localStorage.clear()
                                }}>
                                    Log out
                                </Button>
                            </Col>
                        </Row>
                    </Navbar>
                </Container>
            </div>
        )
    }
    else { //place holder
        return <div></div>
    }
}

export default NavMenu