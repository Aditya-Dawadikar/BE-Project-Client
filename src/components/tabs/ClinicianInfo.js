import React, { useState, useRef } from 'react';
import { Tabs, Tab, Tooltip, Overlay } from 'react-bootstrap'

import ClinicianIcon from '../../assets/icons/doctor.png'
import HelpIcon from '../../assets/icons/help.png'

const ClinicianInfo = () => {
    const [clinician, setClinician] = useState({
        firstname: "Aditya",
        lastname: "Dawadikar",
        phone: "9850221407",
        email: "adityadawadikar2000@gmail.com",
        age: "21",
        gender: "Male",
        role: "r1"
    })

    const [patients, setpatients] = useState([
        {
            patient_id: "121415",
            patient_name: "aknfbaiw wubdabu",
            diagnosis: "healthy",
            severity: 0,
        }, {
            patient_id: "1241515",
            patient_name: "awgwghw wetabu",
            diagnosis: "asthma",
            severity: 3,
        }
    ])

    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

    const [show, setShow] = useState(false);
    const target = useRef(null);
    
    return <div className="container">
                <div className='h4'><img className="m-1" src={ClinicianIcon} style={{ width: "40px" }} />Clinician: {clinician.firstname + " " + clinician.lastname}</div>
                <div className="row">
                    <div className='col'>
                        <div>Email: <a href={"mailto:" + clinician.email}>{clinician.email}</a></div>
                    </div>
                    <div className='col'>
                        <div>Phone: <a href={"tel:" + clinician.phone}>{clinician.phone}</a></div>
                    </div>
                </div>
                <div style={{ width: "100%", height: "2px", "--bs-bg-opacity": ".2" }} className="bg-secondary m-1"></div>
                <div className="row">
                    <div className='col'>
                        <div>Age: {clinician.age}</div>
                    </div>
                    <div className='col'>
                        <div>Sex: {clinician.gender}</div>
                    </div>
                    <div className='col'>
                        <div>Role: {clinician.role}</div>
                    </div>
                </div>
                <br /><br />
                <div className="h4">Diagnosed Patients</div>
                <ul className="list-group">
                    <li className="list-group-item active" aria-current="true">
                        <div className='row'>
                            <div className='col'>Patient Id</div>
                            <div className='col'>Name</div>
                            <div className='col'>Diagnosis</div>
                            <div className='col'>
                                Severity
                                <img
                                    style={{ width: "20px", margin: "0 0 0 10px", cursor: "pointer" }}
                                    ref={target}
                                    onClick={() => setShow(!show)}
                                    src={HelpIcon} />
                                <Overlay target={target.current} show={show} placement="right">
                                    {(props) => (
                                        <Tooltip id="overlay-example" {...props}>
                                            <p className='text-start'>The Severity describes how severe the conditions are, these levels are color coded as follows.</p>
                                            <ul style={{ listStyle: "none", padding: "0px" }} className="text-start">
                                                {severity.map((state, index) => {
                                                    return <li style={{ margin: "5px 0px 0px 0px" }} key={index}>
                                                        level {index + 1}:<div className='btn' style={{ margin: "0px 5px 0px 5px", background: severitycode[index] }}></div>{state}
                                                    </li>
                                                })}
                                            </ul>
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </div>
                            <div className='col'>Action</div>
                        </div>
                    </li>
                    {
                        patients.map((entry, index) => {
                            return <li key={index} className="list-group-item">
                                <div className='row'>
                                    <div className='col'>{entry.patient_id}</div>
                                    <div className='col'>{entry.patient_name}</div>
                                    <div className='col'>{entry.diagnosis}</div>
                                    <div className='col'><div className='btn m-1' style={{ 'background': severitycode[entry.severity] }}></div>{severity[entry.severity]}</div>
                                    <div className='col'><div className='btn btn-success' onClick={() => { window.location.href = '/clinic/patient' }}>visit profile</div></div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
    
};

export default ClinicianInfo;
