import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

const ManualDiagnosis = ({ seglist }) => {

    const abnormality = ["crackle", "none", "wheeze"]
    const diagnosis = ["asthma", "bronchial", "copd", "healthy", "pneumonia"]
    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

    return <div id="manual-annotation">
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
                            <div className='col-3'>{segment.name}</div>
                            <div className='col-9'>
                                <div className='row'>
                                    <div className='col'>
                                        <label className="form-label">Abnormality Detected *</label>
                                        <Form.Select required>
                                            {
                                                abnormality.map((state, indx) => {
                                                    return <option key={indx} value={indx} >{state}</option>
                                                })
                                            }
                                        </Form.Select>
                                    </div>
                                    <div className='col'>
                                        <label className="form-label">Disorder *</label>
                                        <Form.Select required>
                                            {
                                                diagnosis.map((state, indx) => {
                                                    return <option key={indx} value={indx} >{state}</option>
                                                })
                                            }
                                        </Form.Select>
                                    </div>
                                    <div className='col'>
                                        <label className="form-label">Severity *</label>
                                        <Form.Select required>
                                            {
                                                severity.map((state, indx) => {
                                                    return <option key={indx} value={indx} >{state}</option>
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
    </div>
};

export default ManualDiagnosis;
