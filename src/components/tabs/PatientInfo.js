import React, { useState, useRef,useEffect } from 'react';
import { Tooltip, Overlay } from 'react-bootstrap'

import PatientIcon from '../../assets/icons/patient.png'
import HelpIcon from '../../assets/icons/help.png'
import { useSearchParams,Link } from 'react-router-dom';

import { getPatientById,getPatientHistory } from '../../services/ClinicDataAPI';


const PatientInfo = () => {

    let [searchParams,setSearchParams] =useSearchParams()

    const [patient, setPatient] = useState({
    })

    const [history, sethistory] = useState([
    ])

    useEffect(() => {
        async function handleLoad(){
            let id=searchParams.get('id')
            let token = JSON.parse(localStorage.getItem('clinicInfo')).token
            let patient=await getPatientById(id,token)
            let history=await getPatientHistory(id,token)
            setPatient(patient)
            sethistory(history)
        }
        handleLoad()
    },[])

    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return <div className='container'>
        <div className='h4'><img className="m-1" src={PatientIcon} style={{ width: "40px" }} />Patient: {patient.name}</div>
        <div className="row">
        <div className='col-lg-4 col-sm-6'>
                <div className='d-flex'>Patient ID: <p className='text-primary'>{patient.patient_id}</p></div>
            </div>
            <div className='col-lg-4 col-sm-6'>
                <div>Email: <a href={"mailto:" + patient.email}>{patient.email}</a></div>
            </div>
            <div className='col-lg-4 col-sm-6'>
                <div>Phone: <a href={"tel:" + patient.phone}>{patient.phone}</a></div>
            </div>
        </div>
        <div style={{ width: "100%", height: "2px", "--bs-bg-opacity": ".2" }} className="bg-secondary m-1"></div>
        <div className="row">
            <div className='col-lg-3 col-sm-6 col-6'>
                <div>Age: {patient.age}</div>
            </div>
            <div className='col-lg-3 col-sm-6 col-6'>
                <div>Sex: {patient.gender}</div>
            </div>
            <div className='col-lg-3 col-sm-6 col-6'>
                <div>Weight: {patient.weight}</div>
            </div>
            <div className='col-lg-3 col-sm-6 col-6'>
                <div>Bloodgroup: {patient.bloodGroup}</div>
            </div>
        </div>
        <br />
        <div className="h4">Patient History</div>
        <ul className="list-group">
            <li className="list-group-item active" aria-current="true">
                <div className='row'>
                    <div className='col'>Date</div>
                    <div className='col'>Clinician</div>
                    <div className='col'>Symptoms</div>
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
                    <div className='col'>Report</div>
                </div>
            </li>
            {
                history.map((entry, index) => {
                    return <li key={index} className="list-group-item">
                        <div className='row'>
                            <div className='col'>{entry.date}</div>
                            <div className='col'>{entry.clinician}</div>
                            <div className='col' style={{ wordWrap: "break-word" }}>{entry.symptoms}</div>
                            <div className='col'>{entry.diagnosis}</div>
                            <div className='col'><div className='btn m-1' style={{ 'background': severitycode[severity.indexOf(entry.severity)] }}></div>{entry.severity}</div>
                            <div className='col'>{
                                entry.report ? <div className="btn btn-success"><a href={entry.report} target='_blank' className='text-white text-decoration-none'>Report</a></div> : "Nothing to show"
                            }</div>
                        </div>
                    </li>
                })
            }
        </ul>
    </div>;
};

export default PatientInfo;
