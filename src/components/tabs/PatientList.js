import React, { useState, useEffect } from 'react'
import { Collapse } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import PatientHorizontal from '../../components/cards/Patient Cards/PatientHorizontal'
import AddPatient from '../../components/forms/AddPatient'
import FilterPatient from '../../components/forms/FilterPatient'

import FilterButton from '../../assets/icons/filter.png'
import SearchButton from '../../assets/icons/search.png'

const PatientList = () => {
    const [open, setOpen] = useState(false);

    const [patientList, setPatientList] = useState([])
    const [temppatientlist, settemppatientlist] = useState([])

    const [addPatientCollapse, setAddPatientCollapse] = useState(false);
    const patientListFromStore = useSelector((state) => state.allPatients.allPatients)

    const [limit, setlimit] = useState(5)
    const [patientcurrentindex, setpatientcurrentindex] = useState(0)
    const [patientpage, setpatientpage] = useState(patientcurrentindex)

    useEffect(() => {
        console.log(patientListFromStore)
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
            <div className='btn btn-primary'
                onClick={() => setAddPatientCollapse(!addPatientCollapse)}
                aria-controls="add-new-patient"
                aria-expanded={addPatientCollapse}
            >+ Add Patient</div>
            <Collapse in={addPatientCollapse}>
                <div id='add-new-patient'>
                    <form>
                        <AddPatient></AddPatient>
                    </form>
                </div>
            </Collapse>
            <br /><br />
            <div className='d-flex'>
                <input type='text' placeholder='find patients' className="form-control"></input>
                <button className='btn btn-primary m-1'>
                    <img style={{ width: "20px" }} src={SearchButton}></img>
                </button>
                <button
                    className='btn btn-primary m-1'
                    onClick={() => setOpen(!open)}
                    aria-controls="patient-filter"
                    aria-expanded={open}
                >
                    <img style={{ width: "20px" }} src={FilterButton}></img>
                </button>
            </div>
            <Collapse in={open}>
                <div id="patient-filter">
                    <form>
                        <FilterPatient />
                    </form>
                </div>
            </Collapse>
            <br />
            <div>
                {
                    patientList.length > 0 ? <div>
                        <ul className='list-group container-fluid'>
                            <li className='list-group-item active'>
                                <div className='row'>
                                    <div className="col">Avatar</div>
                                    <div className="col">Patient Name</div>
                                    <div className="col">Diagnosis</div>
                                    <div className="col">Action</div>
                                </div>
                            </li>
                            {temppatientlist.map((patient, index) => {
                                return <li className='list-group-item' key={index}><PatientHorizontal patient={patient} /></li>
                            })}
                        </ul>
                        <br />
                        <div className='d-flex justify-content-center'>
                            <div className='btn btn-primary' onClick={() => { decrementPatient() }}>Prev</div>
                            <p className='m-1'>{patientpage}</p>
                            <div className='btn btn-primary' onClick={() => { incrementPatient() }}>Next</div>
                        </div>
                    </div> : <div>Nothing to show yet</div>
                }
            </div>
        </div>
    )
}

export default PatientList