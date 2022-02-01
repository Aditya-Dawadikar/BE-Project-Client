import React,{useState,useEffect} from 'react'
import {Tabs, Tab, Form, Button,Collapse} from 'react-bootstrap'

import ClinicNavigation from '../../components/website_essentials/ClinicNavigation'

import PatientHorizontal from '../../components/cards/Patient Cards/PatientHorizontal'
import ClinicianHorizontal from '../../components/cards/Clinician Cards/ClinicianHorizontal'

import FilterButton from '../../assets/icons/filter.png'
import SearchButton from '../../assets/icons/search.png'

const AdminPanel = () => {

    const [open, setOpen] = useState(false);
    const [addPatientCollapse,setAddPatientCollapse] = useState(false);
    const [addClinicianCollapse,setAddClinicianCollapse] = useState(false);

    const gender=["none","male","female"]
    const diagnosis=["all","healthy","asthma", "pneumonia", "copd","bronchial"]
    const role=['r1','r2','r3','r4']
    const bloodgroup=['A+','A-','B+','B-','AB+','AB-','O+','O-']


    const defaultPatientFilter={
        min_age:0,
        max_age:100,
        gender:0, // Male, Female, none
        diagnosis:0, // Asthma, Pneumonia, COPD, healthy,....
    }
    const [patientFilterData, setPatientFilterData] = useState({
        min_age:0,
        max_age:100,
        gender:0, // Male, Female, none
        diagnosis:0, // Asthma, Pneumonia, COPD, healthy,....
    });
    const defaultClinicianFilter={
        min_age:0,
        max_age:100,
        gender:0, // Male, Female, none
        role:0, 
    }
    const [clinicianFilterData, setClinicianFilterData] = useState({
        min_age:0,
        max_age:100,
        gender:0, // Male, Female, none
        role:0, 
    });

    const [patientGender,setPatientGender] = useState(patientFilterData.gender)
    const [patientDiagnosis,setPatientDiagnosis] = useState(patientFilterData.diagnosis)
    const [clinicianGender,setClinicianGender] = useState(clinicianFilterData.gender)
    const [clinicianRole,setClinicianRole] = useState(clinicianFilterData.role)

    useEffect(()=>{
        setPatientGender(patientFilterData.gender)
        setPatientDiagnosis(patientFilterData.diagnosis)
    },[patientFilterData])
    useEffect(()=>{
        setClinicianGender(clinicianFilterData.gender)
        setClinicianRole(clinicianFilterData.role)
    },[clinicianFilterData])

    const clearPatientFilter=()=>{
        console.log(patientFilterData)
        setPatientFilterData(defaultPatientFilter)
    }
    const clearClinicianFilter=()=>{
        console.log(clinicianFilterData)
        setClinicianFilterData(defaultClinicianFilter)
    }
    
    const [patientList,setPatientList] = useState([{
        firstname:"a",
        lastname:"",
        phone:"",
        email:"",
        age:0,
        weight:0,
        bloodgroup:0,
        gender:0,
        diagnosis: "abc"
    }])
    const [temppatientlist,settemppatientlist] = useState([])
    const [clinicianList,setClinicianList] = useState([{
        firstname:"aa",
        lastname:"",
        phone:"",
        email:"",
        age:0,
        role:"saf",
        gender:0
    }])
    const [tempclinicianlist,settempclinicianlist] = useState([])

    const PatientFilterForm=()=>{

        function handlePatientFilterChange(e){
            setPatientFilterData({...patientFilterData,[e.target.name]:e.target.value})
        }

        return <div className='m-2'>
                <div className='row'>
                    <div className='col'>
                        <label className="form-label">Minimum Age</label>
                        <div className='d-flex'>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                className='m-1'
                                name="min_age"
                                value={patientFilterData.min_age}
                                onChange={(e)=>{handlePatientFilterChange(e)}}
                                ></input>
                            <div className='btn bg-light'>{patientFilterData.min_age}</div>
                        </div>
                        <label className="form-label">Maximum Age</label>
                        <div className='d-flex'>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                className='m-1'
                                name="max_age"
                                value={patientFilterData.max_age}
                                onChange={(e)=>{handlePatientFilterChange(e)}}
                                ></input>
                            <div className='btn bg-light'>{patientFilterData.max_age}</div>
                        </div>
                    </div>
                    <div className='col'>
                        <label className="form-label">Gender</label>
                        <Form.Select aria-label="Default select example" 
                            name="gender"
                            value={patientFilterData.gender}
                            onChange={(e)=>{
                                handlePatientFilterChange(e)
                            }}>
                            {
                                gender.map((sex,index)=>{
                                    return <option key={index} value={index} >{sex}</option>
                                })
                            }
                        </Form.Select>
                    </div>
                    <div className='col'>
                        <label className="form-label">Diagnosis</label>
                        <Form.Select aria-label="Default select example"
                            name="diagnosis"
                            value={patientFilterData.diagnosis}
                            onChange={(e)=>{handlePatientFilterChange(e)}}>
                        {
                            diagnosis.map((disease,index)=>{
                                return <option key={index} value={index} >{disease}</option>
                            })
                        }
                        </Form.Select>
                    </div>
                </div>
                <button className='btn btn-secondary m-2' onClick={()=>{clearPatientFilter()}}>clear</button>
            </div>
    }

    const ClinicianFilterForm=()=>{

        function handleClinicianFilterChange(e){
            setClinicianFilterData({...clinicianFilterData,[e.target.name]:e.target.value})
        }

        return <div className='m-2'>
                <div className='row'>
                    <div className='col'>
                        <label className="form-label">Minimum Age</label>
                        <div className='d-flex'>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                className='m-1'
                                name='min_age'
                                value={clinicianFilterData.min_age}
                                onChange={(e)=>{handleClinicianFilterChange(e)}}
                                ></input>
                            <div className='btn bg-light'>{clinicianFilterData.min_age}</div>
                        </div>
                        <label className="form-label">Maximum Age</label>
                        <div className='d-flex'>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                className='m-1'
                                name="max_age"
                                value={clinicianFilterData.max_age}
                                onChange={(e)=>{handleClinicianFilterChange(e)}}
                                ></input>
                            <div className='btn bg-light'>{clinicianFilterData.max_age}</div>
                        </div>
                    </div>
                    <div className='col'>
                        <label className="form-label">Gender</label>
                        <Form.Select aria-label="Default select example" 
                            name='gender'
                            value={clinicianFilterData.gender}
                            onChange={(e)=>{handleClinicianFilterChange(e)}}>
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
                            name='role'
                            value={clinicianFilterData.role}
                            onChange={(e)=>{handleClinicianFilterChange(e)}}>
                        {
                            role.map((r,index)=>{
                                return <option key={index} value={index} >{r}</option>
                            })
                        }
                        </Form.Select>
                    </div>
                </div>
                <button className='btn btn-secondary m-2' onClick={()=>{clearClinicianFilter()}}>clear</button>
            </div>
    }

    const AddPatient=()=>{

        const [patient,setpatient] = useState({})

        const handlePatientFormOnChange=(e)=>{
            setpatient({...patient,[e.target.name]:e.target.value})
        }

        const addNewPatient=()=>{
            setPatientList((patientList)=>[...patientList,patient])
            console.log(patient)
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

    const AddClinician=()=>{
        const [clinician,setclinician] = useState({})

        const handleClinicianFormOnChange=(e)=>{
            setclinician({...clinician,[e.target.name]:e.target.value})
        }

        const addNewClinician=()=>{
            setClinicianList((clinicianList)=>[...clinicianList,clinician])
            console.log(clinician)
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

    // Pagination Logic for Clinician and Patient Tab
    const [limit,setlimit] = useState(5)
    const [patientcurrentindex,setpatientcurrentindex] = useState(0)
    const [patientpage,setpatientpage]=useState(patientcurrentindex)

    const [cliniciancurrentindex,setcliniciancurrentindex] = useState(0)
    const [clinicianpage,setclinicianpage]=useState(cliniciancurrentindex)

    function incrementPatient(){
        if((patientcurrentindex+1)*limit<patientList.length){
            setpatientcurrentindex(patientcurrentindex+1)
        }
    }
    function decrementPatient(){
        if(patientcurrentindex>=1){
            setpatientcurrentindex(patientcurrentindex-1)
        }
    }    
    function incrementClinician(){
        if((cliniciancurrentindex+1)*limit<clinicianList.length){
            setcliniciancurrentindex(cliniciancurrentindex+1)
        }
    }
    function decrementClinician(){
        if(cliniciancurrentindex>=1){
            setcliniciancurrentindex(cliniciancurrentindex-1)
        }
    }

    useEffect(()=>{
        function pagination(){
            let pageinfo = (patientcurrentindex*limit+1)+"-"+(Math.min(patientcurrentindex*limit+limit,patientList.length))+"/"+patientList.length
            setpatientpage(pageinfo)
            settemppatientlist(patientList.slice(patientcurrentindex*limit,patientcurrentindex*limit+limit))
        }

        pagination()
    },[patientcurrentindex,patientList])

    useEffect(()=>{
        function pagination(){
            let pageinfo = (cliniciancurrentindex*limit+1)+"-"+(Math.min(cliniciancurrentindex*limit+limit,clinicianList.length))+"/"+clinicianList.length
            setclinicianpage(pageinfo)
            settempclinicianlist(clinicianList.slice(cliniciancurrentindex*limit,cliniciancurrentindex*limit+limit))
        }

        pagination()
    },[cliniciancurrentindex,clinicianList])

    return (
        <div>
            <ClinicNavigation/>
            <Tabs defaultActiveKey="Patients" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Patients" title="Patients">
                        <div className='container'>
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
                            <br/><br/>
                            <div className='d-flex'>
                                <input type='text' placeholder='find patients' className="form-control"></input>
                                <button className='btn btn-primary m-1'>
                                    <img style={{width:"20px"}} src={SearchButton}></img>
                                </button>
                                <button 
                                    className='btn btn-primary m-1'
                                    onClick={() => setOpen(!open)}
                                    aria-controls="patient-filter"
                                    aria-expanded={open}
                                >
                                    <img style={{width:"20px"}} src={FilterButton}></img>
                                </button>
                            </div>
                            <Collapse in={open}>
                                <div id="patient-filter">
                                    <form>
                                        <PatientFilterForm/>
                                    </form>
                                </div>
                            </Collapse>
                            <br/>
                            <div>
                                <ul className='list-group container-fluid'>
                                    <li className='list-group-item active'>
                                        <div className='row'>
                                            <div className="col">Avatar</div>
                                            <div className="col">Patient Name</div>
                                            <div className="col">Diagnosis</div>
                                            <div className="col">Action</div>
                                        </div>
                                    </li>
                                    {temppatientlist.map((patient,index)=>{
                                        return <li className='list-group-item' key={index}><PatientHorizontal patient={patient}/></li>
                                    })}
                                </ul>
                                <br/>
                                <div className='d-flex justify-content-center'>
                                    <div className='btn btn-primary' onClick={()=>{decrementPatient()}}>Prev</div>
                                    <p className='m-1'>{patientpage}</p>
                                    <div className='btn btn-primary' onClick={()=>{incrementPatient()}}>Next</div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="Clinicians" title="Clinicians">
                        <div className='container'>
                            <div className='btn btn-primary'
                                onClick={() => setAddClinicianCollapse(!addClinicianCollapse)}
                                aria-controls="add-new-clinician"
                                aria-expanded={addClinicianCollapse}
                            >+ Add Clinician</div>
                            <Collapse in={addClinicianCollapse}>
                                <div id='add-new-clinician'>
                                    <form>
                                        <AddClinician></AddClinician>
                                    </form>
                                </div>
                            </Collapse>
                            <br/><br/>
                            <div className='d-flex'>
                                <input type='text' placeholder='find clinicians' className="form-control"></input>
                                <button className='btn btn-primary m-1'>
                                    <img style={{width:"20px"}} src={SearchButton}></img>
                                </button>
                                <button className='btn btn-primary m-1'
                                    onClick={() => setOpen(!open)}
                                    aria-controls="clinician-filter"
                                    aria-expanded={open}
                                >
                                    <img style={{width:"20px"}} src={FilterButton}></img>
                                </button>
                            </div>
                            <Collapse in={open}>
                                <div id="clinician-filter">
                                    <form>
                                        <ClinicianFilterForm/>
                                    </form>
                                </div>
                            </Collapse>
                            <br/>
                            <div>
                                <ul className='list-group container-fluid'>
                                    <li className="list-group-item  active">
                                        <div className='row'>
                                            <div className="col">Avatar</div>
                                            <div className="col">Clinician Name</div>
                                            <div className="col">Role</div>
                                            <div className="col">Action</div>
                                        </div>
                                    </li>
                                    {tempclinicianlist.map((clinician,index)=>{
                                        return <li className='list-group-item' key={index}><ClinicianHorizontal clinician={clinician}/></li>
                                    })}
                                </ul>
                                <br/>
                                <div className='d-flex justify-content-center'>
                                    <div className='btn btn-primary' onClick={()=>{decrementClinician()}}>Prev</div>
                                    <p className='m-1'>{clinicianpage}</p>
                                    <div className='btn btn-primary' onClick={()=>{incrementClinician()}}>Next</div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
                <div style={{width:"100%",height:"200px"}}></div>
        </div>
    )
}

export default AdminPanel
