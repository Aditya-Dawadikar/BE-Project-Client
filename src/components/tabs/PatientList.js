import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import PatientHorizontal from '../../components/cards/Patient Cards/PatientHorizontal'
import AddPatient from '../../components/forms/AddPatient'

import { IoCaretBackSharp, IoCaretForwardSharp } from 'react-icons/io5'
import { AiOutlineLink } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import { ImSearch } from 'react-icons/im'
import { GrFormAdd } from 'react-icons/gr'

import { useDispatch } from 'react-redux'
import { deletePatientAction } from '../../redux/actions/patientListActions'

import { Link } from 'react-router-dom'

const PatientList = () => {
    const dispatch = useDispatch()

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

    const deletePatient = (patient) => {
        var result = window.confirm("Are you sure, you want to delete?");
        if (result) {
            dispatch(deletePatientAction(patient))
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-lg-9 col-sm-6'>
                    <div className='input-group m-1'>
                        <input type='text' placeholder='find patients...' className="form-control"></input>
                        <button className='btn bg-dark text-white'><ImSearch /></button>
                    </div>
                </div>
                <div className='col-lg-3 col-sm-6'>
                    <div className='btn m-1 std-border' onClick={() => setAddPatientModal(true)}>
                        <GrFormAdd /> Add patient
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
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Patient Id</th>
                                    <th>Patient Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {temppatientlist.map((patient, index) => {
                                    return <tr>
                                        <td>
                                            <Link className='text-decoration-none' to={`/clinic/patient?id=${patient.patient_id}`}>
                                                <AiOutlineLink className='m-1' />
                                                {patient.patient_id}
                                            </Link>
                                        </td>
                                        <td>{patient.name}</td>
                                        <td>
                                            <div className='btn m-1' onClick={() => { deletePatient(patient) }}>
                                                <BsFillTrashFill className='m-1' />Delete
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                        <br />
                        <div className='d-flex justify-content-center'>
                            <div className='d-flex'>
                                <div className='btn' onClick={() => { decrementPatient() }}><IoCaretBackSharp /></div>
                                <b className='my-2'>Showing Patients {patientpage}</b>
                                <div className='btn' onClick={() => { incrementPatient() }}><IoCaretForwardSharp /></div>
                            </div>
                        </div>
                    </div> : <div>Nothing to show yet</div>
                }
            </div>
        </div>
    )
}

export default PatientList