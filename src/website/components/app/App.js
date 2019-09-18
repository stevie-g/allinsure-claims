import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CustomerHomePage from '../screens/customers/CustomerHomePage'
import StaffHomePage from '../screens/staff/StaffHomePage'
import { Container } from 'react-bootstrap'

function App() {
    return (
        <Container>
            <h1>Welcome to AllInsure</h1>
            <CustomerHomePage />
            <StaffHomePage />
        </Container>
    )
}

export default App;
