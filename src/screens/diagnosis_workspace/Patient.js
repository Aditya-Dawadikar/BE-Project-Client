import React,{useState,useEffect,useRef} from 'react'
import {Tabs,Tab,Tooltip, Overlay} from 'react-bootstrap'

import PatientIcon from '../../assets/icons/patient.png'
import HelpIcon from '../../assets/icons/help.png'

import ClinicNavigation from '../../components/website_essentials/ClinicNavigation'
import AudioEditor from './AudioEditor'
import ReportGeneration from './ReportGeneration'

const Patient = () => {

    const [patient,setPatient] = useState({
        firstname:"Aditya",
        lastname:"Dawadikar",
        phone:"9850221407",
        email:"adityadawadikar2000@gmail.com",
        bloodgroup:"B+",
        age:"21",
        diagnosis:"Healthy",
        weight:"80",
        gender:"Male"
    })

    const [history,sethistory] = useState([
        {
            date:"1/2/33",
            symptoms:["none"],
            diagnosis:"healthy",
            severity:0,
            report:true,
            clinician:"Dr. abc"
        },{
            date:"3/12/32",
            symptoms:["cough","chest pain"],
            diagnosis:"asthma",
            severity:1,
            report:true,
            clinician:"Dr. abc"
        }
    ])

    const severity=['asymptomatic','moderate manifestation','major manifestation','catastrophic manifestation']
    const severitycode=['#84ff00','#fff222','#ff5e00','#ff0000']

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <div>
            <ClinicNavigation/>
            <Tabs defaultActiveKey="Workspace" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="Information" title="Information">
                    <div className="container">
                        <div className='h4'><img className="m-1" src={PatientIcon} style={{width:"40px"}}/>Patient: {patient.firstname+" "+patient.lastname}</div>
                        <div className="row">
                            <div className='col'>
                                <div>Email: <a href={"mailto:"+patient.email}>{patient.email}</a></div>
                                </div>
                            <div className='col'>
                                <div>Phone: <a href={"tel:"+patient.phone}>{patient.phone}</a></div>
                            </div>        
                        </div>
                        <div style={{width:"100%",height:"2px","--bs-bg-opacity": ".2"}} className="bg-secondary m-1"></div>
                        <div className="row">
                            <div className='col'>
                                <div>Age: {patient.age}</div>
                            </div>
                            <div className='col'>
                                <div>Sex: {patient.gender}</div>
                            </div>
                            <div className='col'>
                                <div>Weight: {patient.weight}</div>
                            </div>
                            <div className='col'>
                                <div>Bloodgroup: {patient.bloodgroup}</div>
                            </div>
                        </div>
                        <br/>
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
                                            style={{width:"20px", margin:"0 0 0 10px",cursor:"pointer"}} 
                                            ref={target} 
                                            onClick={() => setShow(!show)} 
                                            src={HelpIcon}/>
                                        <Overlay target={target.current} show={show} placement="right">
                                            {(props) => (
                                            <Tooltip id="overlay-example" {...props}>
                                                <p className='text-start'>The Severity describes how severe the conditions are, these levels are color coded as follows.</p>
                                                <ul style={{listStyle:"none",padding:"0px"}} className="text-start">
                                                    {severity.map((state,index)=>{
                                                        return <li style={{margin:"5px 0px 0px 0px"}}>
                                                            level {index+1}:<div className='btn' style={{margin:"0px 5px 0px 5px",background:severitycode[index]}}></div>{state}
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
                                history.map((entry,index)=>{
                                    return <li key={index} className="list-group-item">
                                        <div className='row'>
                                            <div className='col'>{entry.date}</div>
                                            <div className='col'>{entry.clinician}</div>
                                            <div className='col' style={{wordWrap: "break-word"}}>{
                                                entry.symptoms.map((symptom,index)=>{
                                                    if(index===entry.symptoms.length-1){
                                                        return symptom
                                                    }
                                                    return symptom+", "
                                                })
                                            }</div>
                                            <div className='col'>{entry.diagnosis}</div>
                                            <div className='col'><div className='btn m-1' style={{'background':severitycode[entry.severity]}}></div>{severity[entry.severity]}</div>
                                            <div className='col'>{
                                                entry.report===true? <div className="btn btn-success">View</div>: "Nothing to show"
                                            }</div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </Tab>
                <Tab eventKey="Workspace" title="Workspace">
                    <AudioEditor/>
                    <br/>
                    <ReportGeneration/>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Patient
