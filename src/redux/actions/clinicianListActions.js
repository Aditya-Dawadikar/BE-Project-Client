import {actions} from '../constants/clinicianListConstants'

import {getClinicians} from '../../services/ClinicDataAPI'

export const clinicianListAction = (page,size)=>async(dispatch)=>{
    try{
        // handle get patient list logic here

        let token = JSON.parse(localStorage.getItem('clinicInfo')).token
        let res_clinicians=[]
        await getClinicians(page,size,token)
            .then(res=>{
                res_clinicians=res
            })
            .catch(err=>{console.log(err)})

        dispatch({
            type:actions.GET_ALL_CLINICIANS,
            payload:res_clinicians
        })
    }catch(err){
        console.log(err)
    }
}

export const addClinicianAction = (clinician)=>async(dispatch)=>{
    try{
        dispatch({
            type:actions.ADD_NEW_CLINICIAN,
            payload:clinician
        })
    }catch(err){
        console.log(err)
    }
}

export const deleteClinicianAction = (clinician)=>async(dispatch)=>{
    try{
        console.log('action',clinician)
        dispatch({
            type:actions.DELETE_CLINICIAN,
            payload:clinician
        })
    }catch(err){
        console.log(err)
    }
}
