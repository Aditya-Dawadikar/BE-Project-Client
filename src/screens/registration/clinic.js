import React from 'react'

import {Tabs, Tab, Form, Button} from 'react-bootstrap'

import Navbar from '../../components/website_essentials/Navbar'
import Footer from '../../components/website_essentials/Footer'

const clinic = () => {

    const loginButton=()=>{
        window.location.href='/clinic/landing'
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className='container'>
            <div  className='m-2'>
                <Tabs defaultActiveKey="Login" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Signup" title="Signup">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="Login" title="Login">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" onClick={()=>{loginButton()}}>
                                Submit
                            </Button>
                        </Form>
                    </Tab>
                </Tabs>
            </div>
            </div>
            
            <Footer></Footer>
        </div>
    )
}

export default clinic
