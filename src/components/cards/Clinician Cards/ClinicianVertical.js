import React from 'react';
import ClinicianIcon from '../../../assets/icons/doctor.png'

const ClinicianVertical = (props) => {

    return <div className='p-2' style={{width:"500px"}}>
        <div className='row'>
            <div className="col-2">
                <img src={ClinicianIcon} style={{ width: "40px" }} />
            </div>
            <div className="col-10">
                <div>Name: {props.clinician.firstname}</div>
                <div>Role: {props.clinician.role}</div>
            </div>
        </div>
        
    </div>;
};

export default ClinicianVertical;
