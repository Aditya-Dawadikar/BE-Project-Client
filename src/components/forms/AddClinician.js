import React, { useState } from 'react'

import { Form, Modal, Button } from 'react-bootstrap'

import { useDispatch } from 'react-redux';
import { addClinicianAction } from '../../redux/actions/clinicianListActions'

const AddClinician = (props) => {
    const dispatch = useDispatch();

    const formDefault = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        age: "",
        weight: "",
        gender: "",
        role: ""
    }
    const [clinician, setclinician] = useState(formDefault)
    const gender = ["none", "male", "female"]
    const role = ['r1', 'r2', 'r3', 'r4']

    const handleClinicianFormOnChange = (e) => {
        setclinician({ ...clinician, [e.target.name]: e.target.value })
    }

    const addNewClinician = () => {
        console.log(clinician)
        alert("patient saved successfully")
        setclinician(formDefault)
        dispatch(addClinicianAction(clinician))
    }

    return <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter-clinician"
        centered
    > <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter-clinician">
                Add Cliniaian
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <br />
            <div className="row">
                <div className='col'>
                    <label className="form-label">First Name</label>
                    <input type='text' placeholder='John' className="form-control col" value={clinician.firstname} name='firstname' onChange={(e) => { handleClinicianFormOnChange(e) }}></input>
                </div>
                <div className='col'>
                    <label className="form-label">Last Name</label>
                    <input type='text' placeholder='Doe' className="form-control col" value={clinician.lastname} name='lastname' onChange={(e) => { handleClinicianFormOnChange(e) }}></input>
                </div>
            </div>
            <br />
            <div className="row">
                <div className='col'>
                    <label className="form-label">Phone</label>
                    <input type='text' placeholder='9850xxxxxx' className="form-control col" value={clinician.phone} name='phone' onChange={(e) => { handleClinicianFormOnChange(e) }}></input>
                </div>
                <div className='col'>
                    <label className="form-label">Email</label>
                    <input type='email' placeholder='johndoe@gmail.com' className="form-control col" value={clinician.email} name='email' onChange={(e) => { handleClinicianFormOnChange(e) }}></input>
                </div>
            </div>
            <br />
            <div className="row">
                <div className='col'>
                    <label className="form-label">Age</label>
                    <input type='number' placeholder='Age' className="form-control col" value={clinician.age} name='age' onChange={(e) => { handleClinicianFormOnChange(e) }}></input>
                </div>

                <div className='col'>
                    <label className="form-label">Gender</label>
                    <Form.Select aria-label="Default select example"
                        value={clinician.gender} name='gender' onChange={(e) => { handleClinicianFormOnChange(e) }}>
                        {
                            gender.map((sex, index) => {
                                return <option key={index} value={index} >{sex}</option>
                            })
                        }
                    </Form.Select>
                </div>

                <div className='col'>
                    <label className="form-label">Role</label>
                    <Form.Select aria-label="Default select example"
                        value={clinician.role} name='role' onChange={(e) => { handleClinicianFormOnChange(e) }}>
                        {
                            role.map((group, index) => {
                                return <option key={index} value={index} >{group}</option>
                            })
                        }
                    </Form.Select>
                </div>
            </div>
            <br />
        </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" onClick={() => { addNewClinician() }}>Save</Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
}

export default AddClinician