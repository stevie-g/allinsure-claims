import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'

const NavMenu = (props) => {
    if (props.appState.user.type === 'customer') {
        return (
            <Navbar>
                <Navbar.Brand>AllInsure Claims</Navbar.Brand>
                <Nav>
                    <Nav.Link href='/customer'>Home</Nav.Link>
                    <Nav.Link href='/customer/account'>Account Details</Nav.Link>
                    <Nav.Link href='/customer/claims'>My Claims</Nav.Link>
                    <Nav.Link href='/customer/newclaim'>Make a Claim</Nav.Link>
                </Nav>
                <Button variant='secondary' href='/' onClick={() => {
                    localStorage.clear()
                }}>
                    Log out
                </Button>
            </Navbar>
        )
    }
    else if (props.appState.user.type === 'staff') {
        return (
            <Navbar>
                <Navbar.Brand>AllInsure Claims</Navbar.Brand>
                <Nav>
                    <Nav.Link href='/staff'>Home</Nav.Link>
                    <Nav.Link href='/staff/claims'>Assigned Claims</Nav.Link>
                </Nav>
                <Button variant='secondary' href='/' onClick={() => {
                    localStorage.clear()
                }}>
                    Log out
                </Button>
            </Navbar>
        )
    }
    else { //place holder
        return <div></div>
    }
}

export default NavMenu