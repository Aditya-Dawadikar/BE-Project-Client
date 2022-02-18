import React,{useState} from 'react'

import {useDispatch} from 'react-redux';
import {addClinicianAction} from '../../redux/actions/clinicianListActions'

import {Form} from 'react-bootstrap'

const AddClinician = () => {
    const dispatch = useDispatch();

    const [clinician,setclinician] = useState({})
    const gender=["none","male","female"]
    const role=['r1','r2','r3','r4']

    const handleClinicianFormOnChange=(e)=>{
        setclinician({...clinician,[e.target.name]:e.target.value})
    }

    const addNewClinician=()=>{
        console.log(clinician)
        // dispatch(addClinicianAction(clinician))
        dispatch(addClinicianAction(clinician))
    }

    return <div>
        <br/>
        <div className="row">
            <div className='col'>
                    <label className="form-label">First Name</label>
                    <input type='text' placeholder='John' className="form-control col" value={clinician.firstname} name='firstname' onChange={(e)=>{handleClinicianFormOnChange(e)}}></input>  
                </div>
                <div className='col'>
                    <label className="form-label">Last Name</label>
                    <input type='text' placeholder='Doe' className="form-control col" value={clinician.lastname} name='lastname' onChange={(e)=>{handleClinicianFormOnChange(e)}}></input>  
                </div> 
            </div>
        <br/>
        <div className="row">
            <div className='col'>
                <label className="form-label">Phone</label>
                <input type='text' placeholder='9850xxxxxx' className="form-control col" value={clinician.phone} name='phone' onChange={(e)=>{handleClinicianFormOnChange(e)}}></input>  
            </div>
            <div className='col'>
                <label className="form-label">Email</label>
                <input type='email' placeholder='johndoe@gmail.com' className="form-control col" value={clinician.email} name='email' onChange={(e)=>{handleClinicianFormOnChange(e)}}></input>  
            </div>
        </div>
        <br/>
        <div className="row">
            <div className='col'>
                <label className="form-label">Age</label>
                <input type='number' placeholder='Age' className="form-control col" value={clinician.age} name='age' onChange={(e)=>{handleClinicianFormOnChange(e)}}></input>  
            </div>

            <div className='col'>
                <label className="form-label">Gender</label>
                <Form.Select aria-label="Default select example" 
                         value={clinician.gender} name='gender' onChange={(e)=>{handleClinicianFormOnChange(e)}}>
                        {
                            gender.map((sex,index)=>{
                                return <option key={index} value={index} >{sex}</option>
                            })
                        }
                </Form.Select>
            </div>
            
            <div className='col'>
                <label className="form-label">Role</label>
                <Form.Select aria-label="Default select example" 
                         value={clinician.role} name='role' onChange={(e)=>{handleClinicianFormOnChange(e)}}>
                        {
                            role.map((group,index)=>{
                                return <option key={index} value={index} >{group}</option>
                            })
                        }
                </Form.Select>
            </div> 
        </div>
        <br/>
        <div className='btn btn-success m-1' onClick={()=>{addNewClinician()}}>Save</div>
    </div>
}

export default AddClinician