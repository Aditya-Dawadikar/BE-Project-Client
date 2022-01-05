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

    const [newPatient,setNewPatient] = useState({
        firstname:"",
        lastname:"",
        phone:"",
        email:"",
        age:0,
        weight:0,
        bloodgroup:0,
        gender:0
    })
    const [newClinician,setNewClinician] = useState({
        firstname:"",
        lastname:"",
        phone:"",
        email:"",
        age:0,
        role:"",
        gender:0
    })

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
    },{
        firstname:"a",
        lastname:"",
        phone:"",
        email:"",
        age:0,
        weight:0,
        bloodgroup:0,
        gender:0,
        diagnosis: "abc"
    },{
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
    const [clinicianList,setClinicianList] = useState([{
        firstname:"aa",
        lastname:"",
        phone:"",
        email:"",
        age:0,
        role:"saf",
        gender:0
    },{
        firstname:"afw",
        lastname:"",
        phone:"",
        email:"",
        age:0,
        role:"fwe",
        gender:0
    },{
        firstname:"vsehr",
        lastname:"",
        phone:"",
        email:"",
        age:0,
        role:"sag",
        gender:0
    }])

    const PatientFilterForm=()=>{

        const setMinAge=(minage)=>{
            setPatientFilterData({...patientFilterData,min_age:minage})
        }
        const setMaxAge=(maxage)=>{
            setPatientFilterData({...patientFilterData,max_age:maxage})
        }
        const setGender=(id)=>{
            console.log(gender[id])
            setPatientFilterData({...patientFilterData,gender:id})
        }
        const setDiagnosis=(id)=>{
            setPatientFilterData({...patientFilterData,diagnosis:id})
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
                                value={patientFilterData.min_age}
                                onChange={(e)=>{setMinAge(e.target.value)}}
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
                                value={patientFilterData.max_age}
                                onChange={(e)=>{setMaxAge(e.target.value)}}
                                ></input>
                            <div className='btn bg-light'>{patientFilterData.max_age}</div>
                        </div>
                    </div>
                    <div className='col'>
                        <label className="form-label">Gender</label>
                        <Form.Select aria-label="Default select example" 
                            value = {patientGender}
                            onChange={(e)=>{
                                setGender(e.target.value)
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
                            value = {patientDiagnosis}
                            onChange={(e)=>{setDiagnosis(e.target.value)}}>
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

        const setMinAge=(minage)=>{
            setClinicianFilterData({...clinicianFilterData,min_age:minage})
        }
        const setMaxAge=(maxage)=>{
            setClinicianFilterData({...clinicianFilterData,max_age:maxage})
        }
        const setGender=(id)=>{
            console.log(gender[id])
            setClinicianFilterData({...clinicianFilterData,gender:id})
        }
        const setRole=(id)=>{
            setClinicianFilterData({...clinicianFilterData,role:id})
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
                                value={clinicianFilterData.min_age}
                                onChange={(e)=>{setMinAge(e.target.value)}}
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
                                value={clinicianFilterData.max_age}
                                onChange={(e)=>{setMaxAge(e.target.value)}}
                                ></input>
                            <div className='btn bg-light'>{clinicianFilterData.max_age}</div>
                        </div>
                    </div>
                    <div className='col'>
                        <label className="form-label">Gender</label>
                        <Form.Select aria-label="Default select example" 
                            value = {clinicianGender}
                            onChange={(e)=>{setGender(e.target.value)}}>
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
                            value = {clinicianRole}
                            onChange={(e)=>{setRole(e.target.value)}}>
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

        const [firstname,setfirstname] = useState("")
        const [lastname,setlastname] = useState("")
        const [phone,setphone] = useState("")
        const [email,setemail] = useState("")
        const [age,setage] = useState(0)
        const [weight,setweight] = useState(0)
        const [pgender,setgender] = useState(0)
        const [pbloodgroup,setbloodgroup] = useState(0)

        const addNewPatient=()=>{
            setNewPatient({
                firstname:firstname,
                lastname:lastname,
                phone:phone,
                email:email,
                age:age,
                weight:weight,
                gender:pgender,
                bloodgroup:pbloodgroup
            })

            let newpatientlist = patientList
            newpatientlist.push(newPatient)
            setPatientList(newpatientlist)

            console.log(newPatient)
        }

        return <div>
            <br/>
            <div className="row">
                <div className='col'>
                        <label className="form-label">First Name</label>
                        <input type='text' placeholder='John' className="form-control col" onChange={(e)=>{setfirstname(e.target.value)}}></input>  
                    </div>
                    <div className='col'>
                        <label className="form-label">Last Name</label>
                        <input type='text' placeholder='Doe' className="form-control col" onChange={(e)=>{setlastname(e.target.value)}}></input>  
                    </div> 
                </div>
            <br/>
            <div className="row">
                <div className='col'>
                    <label className="form-label">Phone</label>
                    <input type='text' placeholder='9850xxxxxx' className="form-control col" onChange={(e)=>{setphone(e.target.value)}}></input>  
                </div>
                <div className='col'>
                    <label className="form-label">Email</label>
                    <input type='email' placeholder='johndoe@gmail.com' className="form-control col" onChange={(e)=>{setemail(e.target.value)}}></input>  
                </div>
            </div>
            <br/>
            <div className="row">
                <div className='col'>
                    <label className="form-label">Age</label>
                    <input type='number' placeholder='Age' className="form-control col"  onChange={(e)=>{setage(e.target.value)}}></input>  
                </div>

                <div className='col'>
                    <label className="form-label">Gender</label>
                    <Form.Select aria-label="Default select example" 
                            value = {pgender}
                            onChange={(e)=>{setgender(e.target.value)}}>
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
                            value = {pbloodgroup}
                            onChange={(e)=>{setbloodgroup(e.target.value)}}>
                            {
                                bloodgroup.map((group,index)=>{
                                    return <option key={index} value={index} >{group}</option>
                                })
                            }
                    </Form.Select>
                </div> 
                
                <div className='col'>
                    <label className="form-label">Weight</label>
                    <input type='number' placeholder='Weight' className="form-control col" onChange={(e)=>{setweight(e.target.value)}}></input>  
                </div>
            </div>
            <br/>
            <div className='btn btn-success m-1' onClick={()=>{addNewPatient()}}>Save</div>
        </div>
    }

    const AddClinician=()=>{
        const [firstname,setfirstname] = useState("")
        const [lastname,setlastname] = useState("")
        const [phone,setphone] = useState("")
        const [email,setemail] = useState("")
        const [age,setage] = useState(0)
        const [prole,setrole] = useState(0)
        const [pgender,setgender] = useState(0)

        const addNewClinician=()=>{
            setNewClinician({
                firstname:firstname,
                lastname:lastname,
                phone:phone,
                email:email,
                age:age,
                role:prole,
                gender:pgender,
            })

            let newclinicianlist = clinicianList
            newclinicianlist.push(newClinician)
            setPatientList(newclinicianlist)

            console.log(newClinician)
        }

        return <div>
            <br/>
            <div className="row">
                <div className='col'>
                        <label className="form-label">First Name</label>
                        <input type='text' placeholder='John' className="form-control col" onChange={(e)=>{setfirstname(e.target.value)}}></input>  
                    </div>
                    <div className='col'>
                        <label className="form-label">Last Name</label>
                        <input type='text' placeholder='Doe' className="form-control col" onChange={(e)=>{setlastname(e.target.value)}}></input>  
                    </div> 
                </div>
            <br/>
            <div className="row">
                <div className='col'>
                    <label className="form-label">Phone</label>
                    <input type='text' placeholder='9850xxxxxx' className="form-control col" onChange={(e)=>{setphone(e.target.value)}}></input>  
                </div>
                <div className='col'>
                    <label className="form-label">Email</label>
                    <input type='email' placeholder='johndoe@gmail.com' className="form-control col" onChange={(e)=>{setemail(e.target.value)}}></input>  
                </div>
            </div>
            <br/>
            <div className="row">
                <div className='col'>
                    <label className="form-label">Age</label>
                    <input type='number' placeholder='Age' className="form-control col"  onChange={(e)=>{setage(e.target.value)}}></input>  
                </div>

                <div className='col'>
                    <label className="form-label">Gender</label>
                    <Form.Select aria-label="Default select example" 
                            value = {pgender}
                            onChange={(e)=>{setgender(e.target.value)}}>
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
                            value = {prole}
                            onChange={(e)=>{setrole(e.target.value)}}>
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
                            <div className='d-flex'>
                                <ul className='list-group container-fluid'>
                                    <li className='list-group-item active'>
                                        <div className='row'>
                                            <div className="col">Avatar</div>
                                            <div className="col">Patient Name</div>
                                            <div className="col">Diagnosis</div>
                                            <div className="col">Action</div>
                                        </div>
                                    </li>
                                    {patientList.map((patient,index)=>{
                                        return <li className='list-group-item' key={index}><PatientHorizontal patient={patient}/></li>
                                    })}
                                </ul>
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
                            <div className='d-flex'>
                                <ul className='list-group container-fluid'>
                                    <li className="list-group-item  active">
                                        <div className='row'>
                                            <div className="col">Avatar</div>
                                            <div className="col">Clinician Name</div>
                                            <div className="col">Role</div>
                                            <div className="col">Action</div>
                                        </div>
                                    </li>
                                    {clinicianList.map((clinician,index)=>{
                                        return <li className='list-group-item' key={index}><ClinicianHorizontal clinician={clinician}/></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
        </div>
    )
}

export default AdminPanel
