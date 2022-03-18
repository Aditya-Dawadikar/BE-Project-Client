import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Form } from 'react-bootstrap'

import ClinicNavigation from '../../components/website_essentials/ClinicNavigation'
import AudioEditor from '../../components/tabs/AudioEditor'
import PatientInfo from '../../components/tabs/PatientInfo'
import ReportGeneration from '../../components/tabs/ReportGeneration'
import ClinicianVertical from '../../components/cards/Clinician Cards/ClinicianVertical'

import WaveIcon from '../../assets/icons/wave.png'

import { useDispatch, useSelector } from 'react-redux'

import { getClinicians } from '../../services/ClinicDataAPI'
import { isAuthenticated } from '../../services/Auth'

import { setCurrentClinician } from '../../redux/actions/consultancyActions'

const Patient = () => {
    const dispatch = useDispatch()

    isAuthenticated()

    const segListFromStore = useSelector((state) => state.allSegments.allSegments)

    // const [allclinicians, setallclinicians] = useState([])
    // useEffect(() => {
    //     async function handleLoad() {
    //         let token = JSON.parse(localStorage.getItem('clinicInfo')).token
    //         let temp = await getClinicians(token)
    //         setallclinicians(temp)
    //     }

    //     handleLoad()
    // }, [])

    const [reportinput, setreportinput] = useState({
        doctor_info: {
            name: "",
            qualification: "",
            clinic_address: "",
            id: ""
        }, patient_info: {
            name: "",
            age: "",
            blood_group: "",
            contact: "",
            sex: "",
            id: ""
        }, report_summary: {
            abnormality: {
                name: "",
                probability: 0
            },
            disorder: {
                name: "",
                probability: 0
            },
            severity: {
                name: "",
                probability: 0
            }
        }, report_note: "",
        symptoms: "",
        audio_segments: []
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
                className={segListFromStore.length > 0 ? 'btn btn-primary' : 'btn btn-secondary'}
                onClick={() => {
                    setshowreport(!showreport)
                    // window.scrollTo(0,1000)
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

    const BackToTop = () => {
        function scrollToTop() {
            window.scrollTo(0, 0)
        }
        return <div className='btn btn-primary back-to-top standard-shadow' onClick={() => { scrollToTop() }}>
            <img src="https://img.icons8.com/external-those-icons-fill-those-icons/24/FFFFFF/external-up-arrows-those-icons-fill-those-icons-1.png" />
        </div>
    }

    return (<div>
        <div>
            <ClinicNavigation />
            <br/>
            <div className='container'>
                <Tabs defaultActiveKey="Information" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Information" title="Information">
                        <PatientInfo></PatientInfo>
                    </Tab>
                    <Tab eventKey="Workspace" title="Workspace" className='container'>
                        <AudioEditor />
                        <ReportViewControl />
                    </Tab>
                </Tabs>
            </div>

        </div>
        <BackToTop />
    </div>
    )
}

export default Patient
