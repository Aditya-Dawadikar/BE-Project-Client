import React,{useState} from 'react'
import {Form} from 'react-bootstrap'

import {addPatientAction} from '../../redux/actions/patientListActions'

import {useDispatch} from 'react-redux';

const AddPatient = () => {
    const dispatch = useDispatch();

    const [patient,setpatient] = useState({})
    const gender=["none","male","female"]
    const bloodgroup=['A+','A-','B+','B-','AB+','AB-','O+','O-']

    const handlePatientFormOnChange=(e)=>{
        setpatient({...patient,[e.target.name]:e.target.value})
    }

    const addNewPatient=()=>{
        console.log(patient)
        dispatch(addPatientAction(patient))
    }

    return <div>
        <br/>
        <div className="row">
            <div className='col'>
                    <label className="form-label">First Name</label>
                    <input type='text' placeholder='John' className="form-control col" value={patient.firstname} name="firstname" onChange={(e)=>{handlePatientFormOnChange(e)}}></input>  
                </div>
                <div className='col'>
                    <label className="form-label">Last Name</label>
                    <input type='text' placeholder='Doe' className="form-control col" value={patient.lastname} name="lastname" onChange={(e)=>{handlePatientFormOnChange(e)}}></input>  
                </div> 
            </div>
        <br/>
        <div className="row">
            <div className='col'>
                <label className="form-label">Phone</label>
                <input type='text' placeholder='9850xxxxxx' className="form-control col"  value={patient.phone} name="phone" onChange={(e)=>{handlePatientFormOnChange(e)}}></input>  
            </div>
            <div className='col'>
                <label className="form-label">Email</label>
                <input type='email' placeholder='johndoe@gmail.com' className="form-control col" value={patient.email} name="email" onChange={(e)=>{handlePatientFormOnChange(e)}}></input>  
            </div>
        </div>
        <br/>
        <div className="row">
            <div className='col'>
                <label className="form-label">Age</label>
                <input type='number' placeholder='Age' className="form-control col" value={patient.age} name="age" onChange={(e)=>{handlePatientFormOnChange(e)}}></input>  
            </div>

            <div className='col'>
                <label className="form-label">Gender</label>
                <Form.Select aria-label="Default select example" 
                        value={patient.gender} name="gender"
                        onChange={(e)=>{handlePatientFormOnChange(e)}}>
                        {
                            gender.map((sex,index)=>{
                                return <option key={index} value={index} >{sex}</option>
                            })
                        }
                </Form.Select>
            </div>
           
            <div className='col'>
                <label className="form-label">Blood Group</label>
                <Form.Select aria-label="Default select example" 
                        value={patient.bloodgroup} name="bloodgroup"
                        onChange={(e)=>{handlePatientFormOnChange(e)}}>
                        {
                            bloodgroup.map((group,index)=>{
                                return <option key={index} value={index} >{group}</option>
                            })
                        }
                </Form.Select>
            </div> 
            
            <div className='col'>
                <label className="form-label">Weight</label>
                <input type='number' placeholder='Weight' className="form-control col" value={patient.weight} name="weight" onChange={(e)=>{handlePatientFormOnChange(e)}}></input>  
            </div>
        </div>
        <br/>
        <div className='btn btn-success m-1' onClick={()=>{addNewPatient()}}>Save</div>
    </div>
}

export default AddPatient