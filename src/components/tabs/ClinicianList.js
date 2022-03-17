import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import ClinicianHorizontal from '../cards/Clinician Cards/ClinicianHorizontal'
import AddClinician from '../forms/AddClinician'

import {IoCaretBackSharp,IoCaretForwardSharp} from 'react-icons/io5'

const ClinicianList = () => {

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

  return (
    <div>
      <div className='row'>
        <div className='col-lg-9 col-sm-6'>
          <div className='input-group m-1 standard-shadow'>
            <input type='text' placeholder='find clinicians' className="form-control"></input>
            <button className='btn btn-primary'>Q</button>
          </div>
        </div>
        <div className='col-lg-3 col-sm-6'>
          <div className='btn m-1 standard-shadow' onClick={() => setAddClinicianModal(true)}>
            + Add Clinician
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
            <ul className='list-group container-fluid'>
              <li className="list-group-item  active">
                <div className='row'>
                  <div className="col">ID</div>
                  <div className="col">Clinician Name</div>
                  <div className="col">Qualification</div>
                  <div className="col">Action</div>
                </div>
              </li>
              {tempclinicianlist.map((clinician, index) => {
                return <li className='list-group-item' key={index}><ClinicianHorizontal clinician={clinician} /></li>
              })}
            </ul>
            <br />
            <div className='d-flex justify-content-center'>
              <div className='d-flex standard-shadow'>
                <div className='btn' onClick={() => { decrementClinician() }}><IoCaretBackSharp /></div>
                <p className='my-2'>{clinicianpage}</p>
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