import React, { useState, useRef, useEffect } from 'react';
import { Tooltip, Overlay } from 'react-bootstrap'

import ClinicianIcon from '../../assets/icons/doctor.png'
import HelpIcon from '../../assets/icons/help.png'
import { useSearchParams } from 'react-router-dom';

import { getClinicianById, getClinicianHistory } from '../../services/ClinicDataAPI';

import { useDispatch } from 'react-redux';
import { setCurrentClinician } from '../../redux/actions/consultancyActions'

import {IoReloadCircle} from 'react-icons/io5'
import {AiOutlineLink} from 'react-icons/ai'

const ClinicianInfo = () => {
    const dispatch = useDispatch()

    let [searchParams, setSearchParams] = useSearchParams();

    const [clinician, setClinician] = useState({
    })

    const [patients, setpatients] = useState([])

    async function handleLoad() {
        let id = searchParams.get('id')
        let token = JSON.parse(localStorage.getItem('clinicInfo')).token
        let clinician = await getClinicianById(id, token)
        let history = await getClinicianHistory(id, token)
        setClinician(clinician)
        setpatients(history)
        dispatch(setCurrentClinician(clinician))
    }

    useEffect(() => {
        handleLoad()
    }, [])

    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return <div className="container">
        <div className='h4'><img className="m-1" src={ClinicianIcon} style={{ width: "40px" }} />Clinician: Dr. {clinician.name}</div>
        <div>Qualification: {clinician.degree}</div>
        <div className="row">
            <div className='col'>
                <div>Email: <a href={"mailto:" + clinician.email}>{clinician.email}</a></div>
            </div>
            <div className='col'>
                <div>Phone: <a href={"tel:" + clinician.phone}>{clinician.phone}</a></div>
            </div>
        </div>
        <div style={{ width: "100%", height: "2px", "--bs-bg-opacity": ".2" }} className="bg-secondary m-1"></div>
        <br /><br />
        <div className="h4 d-flex">Diagnosed Patients <IoReloadCircle className='m-1 reload-icon' onClick={() => { handleLoad() }} /></div>
        <ul className="list-group">
            <li className="list-group-item active" aria-current="true">
                <div className='row'>
                    <div className='col'>Date</div>
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
                            <div className='col'>{entry.date}</div>
                            <div className='col'>{entry.patient_id}</div>
                            <div className='col'>{entry.patient_name}</div>
                            <div className='col'>{entry.diagnosis}</div>
                            <div className='col'><div className='btn m-1' style={{ 'background': severitycode[severity.indexOf(entry.severity)] }}></div>{entry.severity}</div>
                            <div className='col'><div className='btn m-1 text-primary' onClick={() => { window.location.href = `/clinic/patient?id=${entry.patient_id}` }}><AiOutlineLink className='m-1'/>Visit</div></div>
                        </div>
                    </li>
                })
            }
        </ul>
    </div>

};

export default ClinicianInfo;
