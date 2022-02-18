import React, { useState, useEffect } from 'react'

import { Collapse } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import FilterButton from '../../assets/icons/filter.png'
import SearchButton from '../../assets/icons/search.png'

import ClinicianHorizontal from '../cards/Clinician Cards/ClinicianHorizontal'
import AddClinician from '../forms/AddClinician'
import FilterClinician from '../forms/FilterClinician'

const ClinicianList = () => {
  const [open, setOpen] = useState(false);

  const [addClinicianCollapse, setAddClinicianCollapse] = useState(false);

  const clinicianListFromStore = useSelector((state) => state.allClinicians.allClinicians)

  useEffect(() => {
    console.log(clinicianListFromStore)
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
      <br /><br />
      <div className='d-flex'>
        <input type='text' placeholder='find clinicians' className="form-control"></input>
        <button className='btn btn-primary m-1'>
          <img style={{ width: "20px" }} src={SearchButton}></img>
        </button>
        <button className='btn btn-primary m-1'
          onClick={() => setOpen(!open)}
          aria-controls="clinician-filter"
          aria-expanded={open}
        >
          <img style={{ width: "20px" }} src={FilterButton}></img>
        </button>
      </div>
      <Collapse in={open}>
        <div id="clinician-filter">
          <form>
            <FilterClinician />
          </form>
        </div>
      </Collapse>
      <br />
      <div>
        {
          clinicianList.length > 0 ? <div>
            <ul className='list-group container-fluid'>
              <li className="list-group-item  active">
                <div className='row'>
                  <div className="col">Avatar</div>
                  <div className="col">Clinician Name</div>
                  <div className="col">Role</div>
                  <div className="col">Action</div>
                </div>
              </li>
              {tempclinicianlist.map((clinician, index) => {
                return <li className='list-group-item' key={index}><ClinicianHorizontal clinician={clinician} /></li>
              })}
            </ul>
            <br />
            <div className='d-flex justify-content-center'>
              <div className='btn btn-primary' onClick={() => { decrementClinician() }}>Prev</div>
              <p className='m-1'>{clinicianpage}</p>
              <div className='btn btn-primary' onClick={() => { incrementClinician() }}>Next</div>
            </div>
          </div> : <div>Nothing to show yet</div>
        }

      </div>
    </div>
  )
}

export default ClinicianList