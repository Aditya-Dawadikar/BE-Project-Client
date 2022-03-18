import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import ClinicianHorizontal from '../cards/Clinician Cards/ClinicianHorizontal'
import AddClinician from '../forms/AddClinician'

import { IoCaretBackSharp, IoCaretForwardSharp } from 'react-icons/io5'
import { AiOutlineLink } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'

import { useDispatch } from 'react-redux'
import { deleteClinicianAction } from '../../redux/actions/clinicianListActions'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { ImSearch } from 'react-icons/im'
import { GrFormAdd } from 'react-icons/gr'

const ClinicianList = () => {
  const dispatch = useDispatch()

  const [addClinicianModal, setAddClinicianModal] = useState(false);

  const clinicianListFromStore = useSelector((state) => state.allClinicians.allClinicians)

  useEffect(() => {
    setClinicianList(clinicianListFromStore)
  }, [clinicianListFromStore])

  const [clinicianList, setClinicianList] = useState([])
  const [tempclinicianlist, settempclinicianlist] = useState([])

  const [limit, setlimit] = useState(5)

  const [cliniciancurrentindex, setcliniciancurrentindex] = useState(0)
  const [clinicianpage, setclinicianpage] = useState(cliniciancurrentindex)

  function incrementClinician() {
    if ((cliniciancurrentindex + 1) * limit < clinicianList.length) {
      setcliniciancurrentindex(cliniciancurrentindex + 1)
    }
  }
  function decrementClinician() {
    if (cliniciancurrentindex >= 1) {
      setcliniciancurrentindex(cliniciancurrentindex - 1)
    }
  }

  useEffect(() => {
    function pagination() {
      let pageinfo = (cliniciancurrentindex * limit + 1) + "-" + (Math.min(cliniciancurrentindex * limit + limit, clinicianList.length)) + "/" + clinicianList.length
      setclinicianpage(pageinfo)
      settempclinicianlist(clinicianList.slice(cliniciancurrentindex * limit, cliniciancurrentindex * limit + limit))
    }

    if (clinicianList.length > 0) {
      pagination()
    }

  }, [cliniciancurrentindex, clinicianList])

  const deleteClinician = (clinician) => {
    var result = window.confirm("Are you sure, you want to delete?");
    if (result) {
      dispatch(deleteClinicianAction(clinician))
    }
  }

  return (
    <div>
      <div className='row'>
        <div className='col-lg-9 col-sm-6'>
          <div className='input-group m-1'>
            <input type='text' placeholder='find clinicians' className="form-control"></input>
            <button className='btn bg-dark text-white'><ImSearch /></button>
          </div>
        </div>
        <div className='col-lg-3 col-sm-6'>
          <div className='btn m-1 std-border' onClick={() => setAddClinicianModal(true)}>
            <GrFormAdd /> Add Clinician
          </div>
        </div>
      </div>
      <AddClinician
        show={addClinicianModal}
        onHide={() => setAddClinicianModal(false)}
      />
      <br />
      <div>
        {
          clinicianList.length > 0 ? <div>
            <Table responsive>
              <thead>
                <tr>
                  <th>Patient Id</th>
                  <th>Patient Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tempclinicianlist.map((clinician, index) => {
                  return <tr>
                    <td>
                      <Link className='text-decoration-none' to={`/clinic/clinician?id=${clinician.doctor_id}`}>
                        <AiOutlineLink className='m-1' />
                        {clinician.doctor_id}
                      </Link>
                    </td>
                    <td>{clinician.name}</td>
                    <td>{clinician.degree}</td>
                    <td>
                      <div className='btn m-1' onClick={() => { deleteClinician(clinician) }}>
                        <BsFillTrashFill className='m-1' />Delete
                      </div>
                    </td>
                  </tr>
                })}
              </tbody>
            </Table>
            <br />
            <div className='d-flex justify-content-center'>
              <div className='d-flex'>
                <div className='btn' onClick={() => { decrementClinician() }}><IoCaretBackSharp /></div>
                <b className='my-2'>{clinicianpage}</b>
                <div className='btn' onClick={() => { incrementClinician() }}><IoCaretForwardSharp /></div>
              </div>
            </div>
          </div> : <div>Nothing to show yet</div>
        }
      </div>
    </div>
  )
}

export default ClinicianList