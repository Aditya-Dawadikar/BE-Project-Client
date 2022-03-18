import React, { useState, useRef, useEffect } from 'react';
import { Tooltip, Overlay, Table } from 'react-bootstrap'

import ClinicianIcon from '../../assets/icons/doctor.png'
import HelpIcon from '../../assets/icons/help.png'
import { useSearchParams, Link } from 'react-router-dom';

import { getClinicianById, getClinicianHistory } from '../../services/ClinicDataAPI';

import { useDispatch } from 'react-redux';
import { setCurrentClinician } from '../../redux/actions/consultancyActions'

import { IoReloadCircle } from 'react-icons/io5'
import { AiOutlineLink } from 'react-icons/ai'

const ClinicianInfo = () => {
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    let [searchParams, setSearchParams] = useSearchParams();

    const [clinician, setClinician] = useState({
    })

    const [patients, setpatients] = useState([])

    async function handleLoad() {
        let id = searchParams.get('id')
        let token = JSON.parse(localStorage.getItem('clinicInfo')).token
        let clinician = await getClinicianById(id, token)
        let history = await getClinicianHistory(id, token)
        setClinician(clinician)
        setpatients(history)
        dispatch(setCurrentClinician(clinician))
    }

    useEffect(() => {
        handleLoad()
    }, [])

    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return <div className="container">
        <div className='h4'><img className="m-1" src={ClinicianIcon} style={{ width: "40px" }} />Clinician: Dr. {clinician.name}</div>
        <div><b>Qualification:</b> {clinician.degree}</div>
        <div className="row">
            <div className='col'>
                <div><b>Email:</b> <a href={"mailto:" + clinician.email}>{clinician.email}</a></div>
            </div>
            <div className='col'>
                <div><b>Phone:</b> <a href={"tel:" + clinician.phone}>{clinician.phone}</a></div>
            </div>
        </div>
        <div style={{ width: "100%", height: "2px", "--bs-bg-opacity": ".2" }} className="bg-secondary m-1"></div>
        <br /><br />
        <div className="h4 d-flex">Diagnosed Patients <IoReloadCircle className='m-1 reload-icon' onClick={() => { handleLoad() }} /></div>
        <Table responsive>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Patient Id</th>
                    <th>Patient Name</th>
                    <th>Diagnosis</th>
                    <th>Severity</th>
                </tr>
            </thead>
            <tbody>
                {
                    patients.map((entry, index) => {
                        return <tr>
                            <td>{entry.date}</td>
                            <td>
                                <Link className='text-decoration-none' to={`/clinic/patient?id=${entry.patient_id}`}>
                                    <AiOutlineLink className='m-1' />{entry.patient_id}
                                </Link>
                            </td>
                            <td>{entry.patient_name}</td>
                            <td>{entry.diagnosis}</td>
                            <td>
                                <div className='btn m-1' style={{ 'background': severitycode[severity.indexOf(entry.severity)] }}></div>
                                {entry.severity}
                            </td>
                            {/* <td>{
                                entry.report ? <div className="btn"><a href={entry.report} target='_blank' className='text-decoration-none'><AiOutlineLink className='m-1' />Report</a></div> : "Nothing to show"
                            }</td> */}
                        </tr>
                    })
                }
            </tbody>
        </Table>
    </div>

};

export default ClinicianInfo;
