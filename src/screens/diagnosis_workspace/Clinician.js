import React from 'react'

import ClinicNavigation from '../../components/website_essentials/ClinicNavigation'
import ClinicianInfo from '../../components/tabs/ClinicianInfo'

const Clinician = () => {
    return (
        <div>
            <ClinicNavigation />
            <br />
            <ClinicianInfo></ClinicianInfo>
        </div>
    )
}

export default Clinician
