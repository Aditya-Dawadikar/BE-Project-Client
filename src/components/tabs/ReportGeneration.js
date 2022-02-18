import React, { useState, useEffect} from 'react'
import { Tabs, Tab} from 'react-bootstrap'

import AnalysisResult from './AnalysisResult'
import AutomatedDiagnosis from './AutomatedDiagnosis'
import ManualDiagnosis from './ManualDiagnosis'

import { useSelector } from 'react-redux'

const ReportGeneration = () => {

    const segListFromStore = useSelector((state)=>state.allSegments.allSegments)

    useEffect(()=>{
        setseglist(segListFromStore)
    },[segListFromStore])

    const [seglist, setseglist] = useState([])
    const [summary, setsummary] = useState({
        abnormality: {
            class: "Crackle",
            probability: 97
        }, disorder: {
            class: "COPD",
            probability: 83
        }, severity: 3
    })

    const [note, setnote] = useState("")
    const [symptoms,setsymptoms] = useState("")

    const [activetab, setactivetab] = useState("Analysis")

    function handleNoteChange(e){
        setnote(e.target.value)
    }
    function handleSymptomChange(e){
        setsymptoms(e.target.value)
    }

    function handleSubmit(){}

    return (
        <div className='container'>
            <Tabs activeKey={activetab} onSelect={(k) => setactivetab(k)} id="report-generator" className="mb-3">
                <Tab eventKey="Analysis" title="Analysis">
                    <AnalysisResult />
                    <div className='d-flex'>
                        <div className='btn btn-primary m-1' onClick={() => { setactivetab("AutomatedDiagnosis") }}>Automated Diagnosis</div>
                        <div className='btn btn-primary m-1' onClick={() => { setactivetab("ManualDiagnosis") }}>Manual Diagnosis</div>
                    </div>
                </Tab>
                <Tab eventKey="AutomatedDiagnosis" title="Automated Diagnosis">
                    <AutomatedDiagnosis summary={summary} />
                </Tab>
                <Tab eventKey="ManualDiagnosis" title="Manual Diagnosis">
                    <ManualDiagnosis seglist={seglist} />
                </Tab>
            </Tabs>
            <br />
            <div>
                <div>
                    <label className="form-label">Mention Symptoms *</label>
                    <input
                        className="form-control"
                        type='text'
                        required={true}
                        value={symptoms}
                        onChange={(e)=>{handleSymptomChange(e)}}
                    ></input>
                </div>
                <br />
                <div>
                    <label>Add Note *</label>
                    <br />
                    <textarea id="text-area" className='form-control' value={note} rows="4" cols="100" onChange={(e) => { handleNoteChange(e) }}></textarea>
                </div>
                <br />
                <div className='btn btn-success' onClick={()=>{handleSubmit()}}>Save Data</div>
            </div>
            <div style={{ height: "500px" }}>

            </div>

        </div>
    )
}

export default ReportGeneration
