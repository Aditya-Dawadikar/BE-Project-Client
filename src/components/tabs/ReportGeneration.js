import React, { useState, useEffect, useContext } from 'react'
import { Tabs, Tab, Form } from 'react-bootstrap'

import AudioEditorContext from '../../contexts/AudioEditorContext'
import AnalysisResult from './AnalysisResult'
import AutomatedDiagnosis from './AutomatedDiagnosis'
import ManualDiagnosis from './ManualDiagnosis'

const ReportGeneration = () => {

    const { contextseglist, setcontextseglist } = useContext(AudioEditorContext)

    const [seglist, setseglist] = useState(contextseglist)
    const [summary, setsummary] = useState({
        abnormality: {
            class: "Crackle",
            probability: 97
        }, disorder: {
            class: "COPD",
            probability: 83
        }, severity: 3
    })

    const [note, setnote] = useState()


    const [activetab, setactivetab] = useState("Analysis")

    useEffect(() => {
        setseglist(contextseglist)
    }, [contextseglist])

    return (
        <div className='container'>
            <Tabs activeKey={activetab} onSelect={(k) => setactivetab(k)} id="report-generator" className="mb-3">
                <Tab eventKey="Analysis" title="Analysis">
                    <AnalysisResult seglist={seglist} />
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
                    ></input>
                </div>
                <br />
                <div>
                    <label>Add Note *</label>
                    <br />
                    <textarea id="text-area" rows="4" cols="100" onChange={(e) => { setnote(e.target.value) }}></textarea>
                </div>
                <br />
                <div className='btn btn-success'>Save Data</div>
            </div>
            <div style={{ height: "500px" }}>

            </div>

        </div>
    )
}

export default ReportGeneration
