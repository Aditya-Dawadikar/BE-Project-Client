import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Form } from 'react-bootstrap'

import ClinicNavigation from '../../components/website_essentials/ClinicNavigation'
import AudioEditor from '../../components/tabs/AudioEditor'
import PatientInfo from '../../components/tabs/PatientInfo'
import ReportGeneration from '../../components/tabs/ReportGeneration'
import ClinicianVertical from '../../components/cards/Clinician Cards/ClinicianVertical'

import WaveIcon from '../../assets/icons/wave.png'

import { useSelector } from 'react-redux'

const Patient = () => {

    const segListFromStore = useSelector((state)=>state.allSegments.allSegments)

    const [reportinput,setreportinput] = useState({
        doctor_info:{
            name:"",
            qualification:"",
            clinic_address:"",
            id:""
        },patient_info:{
            name:"",
            age:"",
            blood_group:"",
            contact:"",
            sex:"",
            id:""
        },report_summary:{
            abnormality:{
                name:"",
                probability:0
            },
            disorder:{
                name:"",
                probability:0
            },
            severity:{
                name:"",
                probability:0
            }
        },report_note:"",
        symptoms:"",
        audio_segments:[]
    })
    // Schema for audio_segment
    // {
    //     "id":"",
    //     "abnormality":{
    //         "classes":["crackle","wheeze"],
    //         "probability":[91,32]
    //     },
    //     "disorder":{
    //         "classes":["pneumoia","asthma","bronchiolitis","healthy","fibrosis"],
    //         "probability":[67.3,91.87,32.2,0.34,21.3]
    //     }
    // }

    const [showreport, setshowreport] = useState(false);

    const ReportViewControl = () => {
        return <div>
            <button
                className={segListFromStore.length>0?'btn btn-primary':'btn btn-secondary'}
                onClick={() => {
                    setshowreport(!showreport)
                }}>
                <img src={WaveIcon} className='m-1' style={{ width: "20px" }} />
                Analyse
            </button>
            <br /><br />
            <p className='bg-warning p-1 text-center'>All the segments available in the segment list will be analysed</p>
            <br />
            {
                showreport === true ? <ReportGeneration /> : <></>
            }
        </div>

    }

    const SelectClinician = () => {
        const [clinician, setclinician] = useState({
            firstname: "Aditya Dawadikar",
            role: "r1"
        })

        return <div className='row'>
            <div className='col-3'>
                <h5>Select Operating Clinician</h5>
                <Form.Select required>
                    <option value={0} >clinician 1</option>
                    <option value={1} >clinician 2</option>
                    <option value={2} >clinician 3</option>
                </Form.Select>
            </div>
            <div className='col-9'>
                {clinician.firstname !== "" ? <div>
                    <h5>Operating Clinician:</h5>
                    <ClinicianVertical clinician={clinician} />
                </div> : <></>}
            </div>
            <br />
        </div>
    }

    const BackToTop=()=>{
        function scrollToTop(){
            window.scrollTo(0,0)
        }
        return <div className='btn btn-primary back-to-top standard-shadow' onClick={()=>{scrollToTop()}}>
            <img src="https://img.icons8.com/external-those-icons-fill-those-icons/24/FFFFFF/external-up-arrows-those-icons-fill-those-icons-1.png"/>
        </div>
    }

    return (<div>
            <div>
                <ClinicNavigation />
                <Tabs defaultActiveKey="Information" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Information" title="Information">
                        <PatientInfo></PatientInfo>
                    </Tab>
                    <Tab eventKey="Workspace" title="Workspace" className='container'>
                        <SelectClinician />
                        <AudioEditor />
                        <ReportViewControl />
                    </Tab>
                </Tabs>
            </div>
            <BackToTop/>
        </div>
    )
}

export default Patient
