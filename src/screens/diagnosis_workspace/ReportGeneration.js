import React, { useState, useEffect, useContext } from 'react'
import { Tabs,Tab,Table,Form } from 'react-bootstrap'

import DataContainer from '../../components/report_generator/DataContainer'

const ReportGeneration = ({ segments }) => {

    const [seglist, setseglist] = useState(segments)

    const [note, setnote] = useState()
    const abnormality = ["crackle", "none", "wheeze"]
    const diagnosis = ["asthma", "bronchial", "copd", "healthy", "pneumonia"]
    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

    const [activetab, setactivetab] = useState("Analysis")

    useEffect(() => {
        setseglist(segments)
    }, [segments])

    return (
        <div className='container'>
            <Tabs activeKey={activetab} onSelect={(k) => setactivetab(k)} id="report-generator" className="mb-3">
                <Tab eventKey="Analysis" title="Analysis">
                    <ul className='list-group'>
                        <li className='list-group-item active'>
                            <div className='row'>
                                <div className='col'>
                                    Segment details
                                </div>
                                <div className='col'>
                                    visualization
                                </div>
                            </div>
                        </li>
                        {
                            seglist.map((segment, index) => {
                                return <li key={index} className='list-group-item'>
                                    <DataContainer segment={segment}/>
                                </li>
                            })
                        }
                    </ul>
                    <div className='d-flex'>
                        <div className='btn btn-primary m-1' onClick={() => { setactivetab("AutomatedDiagnosis") }}>Automated Diagnosis</div>
                        <div className='btn btn-primary m-1' onClick={() => { setactivetab("ManualDiagnosis") }}>Manual Diagnosis</div>
                    </div>
                </Tab>
                <Tab eventKey="AutomatedDiagnosis" title="Automated Diagnosis">
                    The system suggested Diagnosis Summary is as follows:
                    <br/>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Factor</th>
                                <th>Output</th>
                                <th>Probability</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Abnormality</td>
                                <td>Crackle</td>
                                <td>87% surity</td>
                            </tr>
                            <tr>
                                <td>Disorder</td>
                                <td>COPD</td>
                                <td>77% surity</td>
                            </tr>
                            <tr>
                                <td>Severity</td>
                                <td>Moderate manifestation</td>
                                <td>NA</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div>
                        <label>Add Note</label>
                        <br />
                        <textarea id="text-area" rows="4" cols="100" onChange={(e) => { setnote(e.target.value) }}></textarea>
                        <br />
                        <div className='btn btn-success'>Save Data</div>   
                    </div>

                </Tab>
                <Tab eventKey="ManualDiagnosis" title="Manual Diagnosis">
                    <div id="manual-annotation">
                        <p className='bg-warning text-center p-1'>
                            The custom diagnosis data will be recorded and used to further improve the model. Wrong diagnosis will have catastrophic effects on future automated diagnosis
                        </p>
                        <ul className='list-group'>
                            <li className='list-group-item active'>
                                <div className='row'>
                                    <div className='col'>Segment Name</div>
                                    <div className='col'>Custom diagnosis</div>
                                </div>
                            </li>
                            {
                                seglist.map((segment, index) => {
                                    return <li key={index} className='list-group-item'>
                                        <div className='row'>
                                            <div className='col'>{segment.name}</div>
                                            <div className='col'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <label className="form-label">Abnormality Detected *</label>
                                                        <Form.Select required>
                                                            {
                                                                abnormality.map((state, index) => {
                                                                    return <option key={index} value={index} >{state}</option>
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </div>
                                                    <div className='col'>
                                                        <label className="form-label">Disorder *</label>
                                                        <Form.Select required>
                                                            {
                                                                diagnosis.map((state, index) => {
                                                                    return <option key={index} value={index} >{state}</option>
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </div>
                                                    <div className='col'>
                                                        <label className="form-label">Severity *</label>
                                                        <Form.Select required>
                                                            {
                                                                severity.map((state, index) => {
                                                                    return <option key={index} value={index} >{state}</option>
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                        <br />
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
                </Tab>
            </Tabs>
            <div style={{ height: "500px" }}>

            </div>

        </div>
    )
}

export default ReportGeneration
