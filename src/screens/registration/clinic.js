import React,{useState,useEffect} from 'react'

import {Tabs, Tab, Form, Button} from 'react-bootstrap'

import Navbar from '../../components/website_essentials/Navbar'
import Footer from '../../components/website_essentials/Footer'

const Clinic = () => {

    const [loginform,setloginform] = useState({
        email:"",
        password:""
    })
    const [signupform,setsignupform] = useState({
        email:"",
        password:"",
        cpassword:""
    })

    function handleLoginChange(e){
        setloginform({...loginform,[e.target.name]:e.target.value})
    }   

    function handleSignupChange(e){
        setsignupform({...signupform,[e.target.name]:e.target.value})
    }

    const loginButton=()=>{
        window.location.href='/clinic/landing'
        // console.log(loginform)
    }
    const signupButton=()=>{
        window.location.href='/clinic/landing'
        // console.log(signupform)
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
                                <Form.Control type="email" placeholder="Enter email" value={signupform.email} name='email' onChange={(e)=>{handleSignupChange(e)}}/>
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={signupform.password}  name='password' onChange={(e)=>{handleSignupChange(e)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" value={signupform.cpassword}  name='cpassword' onChange={(e)=>{handleSignupChange(e)}} />
                            </Form.Group>

                            <Button variant="primary" onClick={()=>{signupButton()}}>
                                Submit
                            </Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="Login" title="Login">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={loginform.email}  name='email' onChange={(e)=>{handleLoginChange(e)}}/>
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={loginform.password}  name='password' onChange={(e)=>{handleLoginChange(e)}}/>
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

export default Clinic
