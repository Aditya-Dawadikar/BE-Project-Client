import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Form } from 'react-bootstrap'

import ClinicNavigation from '../../components/website_essentials/ClinicNavigation'
import AudioEditor from '../../components/tabs/AudioEditor'
import PatientInfo from '../../components/tabs/PatientInfo'
import ReportGeneration from '../../components/tabs/ReportGeneration'
import ClinicianVertical from '../../components/cards/Clinician Cards/ClinicianVertical'

import WaveIcon from '../../assets/icons/wave.png'

import AudioEditorContext from '../../contexts/AudioEditorContext'

const Patient = () => {

    const [contextseglist, setcontextseglist] = useState([])

    const [showreport, setshowreport] = useState(false);

    const ReportViewControl = () => {
        return <div>
            <button
                className={contextseglist.length > 0 ? 'btn btn-success mx-2' : 'btn btn-secondary'}
                onClick={() => {
                    if (contextseglist.length > 0) {
                        setshowreport(!showreport)
                    }
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
        return <div className='btn btn-primary back-to-top standard-shadow' onClick={()=>{scrollToTop()}}>Back to Top</div>
    }


    return (
        <AudioEditorContext.Provider value={{ contextseglist, setcontextseglist }}>
            <div>
                <ClinicNavigation />
                <Tabs defaultActiveKey="Workspace" id="uncontrolled-tab-example" className="mb-3">
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
        </AudioEditorContext.Provider>
    )
}

export default Patient
