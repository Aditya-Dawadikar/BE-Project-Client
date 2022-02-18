import React from 'react'

import { Tabs, Tab } from 'react-bootstrap'

import ClinicNavigation from '../../components/website_essentials/ClinicNavigation'
import ClinicHorizontal from '../../components/cards/Clinic Cards/ClinicHorizontal'
import PatientList from '../../components/tabs/PatientList'
import ClinicianList from '../../components/tabs/ClinicianList'

const AdminPanel = () => {
    return (
        <div>
            <ClinicNavigation />
            <div className='container'>
                <br />
                <ClinicHorizontal />
                <br />
                <Tabs defaultActiveKey="Patients" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Patients" title="Patients">
                        <div className='container'>
                            <PatientList />
                        </div>
                    </Tab>
                    <Tab eventKey="Clinicians" title="Clinicians">
                        <div className='container'>
                            <ClinicianList />
                        </div>
                    </Tab>
                </Tabs>
                <div style={{ width: "100%", height: "200px" }}></div>
            </div>
        </div>
    )
}

export default AdminPanel
