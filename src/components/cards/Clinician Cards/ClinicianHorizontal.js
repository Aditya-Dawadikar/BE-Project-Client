import React from 'react'
import ClinicianIcon from '../../../assets/icons/doctor.png'
import DeleteIcon from '../../../assets/icons/delete.png'

const ClinicianHorizontal = (props) => {

    const visitClinicianProfile=()=>{
        window.location.href = "/clinic/clinician"; 
    }

    const deleteClinician=()=>{
        alert("You are about to delete clinician")
    }

    return (
        <div className='row'>
            <div className="col">
                <img src={ClinicianIcon} style={{width:"40px"}}/>
            </div>
            <div className="col">{props.clinician.firstname}</div>
            <div className="col">{props.clinician.role}</div>
            <div className="col">
                <div className='btn btn-success m-1'onClick={()=>{visitClinicianProfile()}}> view profile</div>
                <div className='btn btn-danger m-1' onClick={()=>{deleteClinician()}}>  <img src={DeleteIcon} style={{width:"20px"}}/> delete</div>
            </div>
        </div>
    )
}

export default ClinicianHorizontal
