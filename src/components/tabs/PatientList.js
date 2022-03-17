import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import PatientHorizontal from '../../components/cards/Patient Cards/PatientHorizontal'
import AddPatient from '../../components/forms/AddPatient'

import {IoCaretBackSharp,IoCaretForwardSharp} from 'react-icons/io5'

const PatientList = () => {

    const [patientList, setPatientList] = useState([])
    const [temppatientlist, settemppatientlist] = useState([])

    const [addPatientModal, setAddPatientModal] = useState(false);
    const patientListFromStore = useSelector((state) => state.allPatients.allPatients)

    const [limit, setlimit] = useState(5)
    const [patientcurrentindex, setpatientcurrentindex] = useState(0)
    const [patientpage, setpatientpage] = useState(patientcurrentindex)

    useEffect(() => {
        setPatientList(patientListFromStore)
    }, [patientListFromStore])

    function incrementPatient() {
        if ((patientcurrentindex + 1) * limit < patientList.length) {
            setpatientcurrentindex(patientcurrentindex + 1)
        }
    }
    function decrementPatient() {
        if (patientcurrentindex >= 1) {
            setpatientcurrentindex(patientcurrentindex - 1)
        }
    }

    useEffect(() => {
        function pagination() {
            let pageinfo = (patientcurrentindex * limit + 1) + "-" + (Math.min(patientcurrentindex * limit + limit, patientList.length)) + "/" + patientList.length
            setpatientpage(pageinfo)
            settemppatientlist(patientList.slice(patientcurrentindex * limit, patientcurrentindex * limit + limit))
        }

        if (patientList.length > 0) {
            pagination()
        }

    }, [patientcurrentindex, patientList])

    return (
        <div>
            <div className='row'>
                <div className='col-lg-9 col-sm-6'>
                    <div className='input-group m-1 standard-shadow'>
                        <input type='text' placeholder='find patients...' className="form-control"></input>
                        <button className='btn btn-primary'>Q</button>
                    </div>
                </div>
                <div className='col-lg-3 col-sm-6'>
                    <div className='btn m-1 standard-shadow' onClick={() => setAddPatientModal(true)}>
                        + Add patient
                    </div>
                </div>
            </div>
            <AddPatient
                show={addPatientModal}
                onHide={() => setAddPatientModal(false)}
            ></AddPatient>
            <br />
            <div>
                {
                    patientList.length > 0 ? <div>
                        <ul className='list-group container-fluid'>
                            <li className='list-group-item active'>
                                <div className='row'>
                                    {/* <div className="col">Avatar</div> */}
                                    <div className="col">ID</div>
                                    <div className="col">Patient Name</div>
                                    <div className="col">Action</div>
                                </div>
                            </li>
                            {temppatientlist.map((patient, index) => {
                                return <li className='list-group-item' key={index}><PatientHorizontal patient={patient} /></li>
                            })}
                        </ul>
                        <br />
                        <div className='d-flex justify-content-center'>
                            <div className='d-flex standard-shadow'>
                                <div className='btn' onClick={() => { decrementPatient() }}><IoCaretBackSharp/></div>
                                <p className='my-2'>{patientpage}</p>
                                <div className='btn' onClick={() => { incrementPatient() }}><IoCaretForwardSharp/></div>
                            </div>
                        </div>
                    </div> : <div>Nothing to show yet</div>
                }
            </div>
        </div>
    )
}

export default PatientList