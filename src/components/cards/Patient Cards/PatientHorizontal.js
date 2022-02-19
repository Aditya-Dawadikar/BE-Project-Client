import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePatientAction } from '../../../redux/actions/patientListActions'

const PatientHorizontal = (props) => {

    const dispatch = useDispatch()

    const visitPatientProfile=()=>{
        window.location.href = "/clinic/patient"; 
    }

    const deletePatient=()=>{
        // alert("You are about to delete patient")
        dispatch(deletePatientAction(props.patient))
    }

    return (
        <div className='row'>
            {/* <div className="col">
                <img src={PatientIcon} style={{width:"40px"}}/>
            </div> */}
            <div className="col text-primary">{props.patient.patient_id}</div>
            <div className="col">{props.patient.name}</div>
            <div className="col">
            <div className='btn btn-success m-1'><Link className='text-white text-decoration-none' to={`/clinic/patient?id=${props.patient.patient_id}`}>Visit</Link></div>
                <div className='btn btn-danger m-1' onClick={()=>{deletePatient()}}>delete</div>
            </div>
        </div>
    )
}

export default PatientHorizontal
