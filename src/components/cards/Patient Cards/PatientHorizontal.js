import React from 'react'
import PatientIcon from '../../../assets/icons/patient.png'
import DeleteIcon from '../../../assets/icons/delete.png'

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
            <div className="col">
                <img src={PatientIcon} style={{width:"40px"}}/>
            </div>
            <div className="col">{props.patient.firstname}</div>
            <div className="col">{props.patient.diagnosis}</div>
            <div className="col">
                <div className='btn btn-success m-1' onClick={()=>{visitPatientProfile()}}>view profile</div>
                <div className='btn btn-danger m-1' onClick={()=>{deletePatient()}}> <img src={DeleteIcon} style={{width:"20px"}}/> delete</div>
            </div>
        </div>
    )
}

export default PatientHorizontal
