import React from 'react'
import styles from './App.css'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

const Home = (props) => {
    return (
        <div className='home'>
            <Row>
                <Col>
                    <Link to='/login' onClick={() => {
                        props.updateAppState({
                            isLoggedIn: false,
                            userType: 'customer',
                            username: ''
                        })
                    }}>Customers</Link>
                </Col>
                <Col>
                    <Link to='/login' onClick={() => {
                        props.updateAppState({
                            isLoggedIn: false,
                            userType: 'staff',
                            username: ''
                        })
                    }}>Staff</Link>
                </Col>
            </Row>
        </div>
    )
}

export default Home