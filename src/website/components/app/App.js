import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CustomerHomePage from '../screens/customers/CustomerHomePage'
import { Container } from 'react-bootstrap'

function App() {
    return (
        <Container>
            <h1>Welcome to AllInsure</h1>
            <CustomerHomePage />
        </Container>
    )
}

export default App;
