import React from 'react'
import {Navbar,Container,Nav,Button} from 'react-bootstrap'

import HomeIcon from '../../assets/icons/home.png'
import AccountIcon from '../../assets/icons/account.png'
import HelpIcon from '../../assets/icons/help.png'

const ClinicNavigation = () => {

    function logoutHandler(){
        localStorage.clear()
        window.location.href='http://localhost:3000/clinic'
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">App Name</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/clinic/landing"><img style={{width:"20px",margin:"0px 5px 0px 0px"}} src={HomeIcon}/>Home</Nav.Link>
                    {/* <Nav.Link href="/clinic/account"><img style={{width:"20px",margin:"0px 5px 0px 0px"}} src={AccountIcon}/>Account</Nav.Link> */}
                    <Nav.Link href="/clinic/help"><img style={{width:"20px",margin:"0px 5px 0px 0px"}} src={HelpIcon}/>Help</Nav.Link>
                    </Nav>
                    <Nav>
                    <div className="text-center" style={{"width":"6em","height":"auto","borderRadius":"20px","background":"white","color":"black"}}> 
                        <Nav.Link href="/clinic" className="text-primary" onClick={()=>{logoutHandler()}}>
                            Logout
                        </Nav.Link>
                    </div>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default ClinicNavigation
