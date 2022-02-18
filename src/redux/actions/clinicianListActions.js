import {actions} from '../constants/clinicianListConstants'

export const clinicianListAction = (clinicianList)=>async(dispatch)=>{
    try{
        // handle get patient list logic here
        dispatch({
            type:actions.GET_ALL_CLINICIANS,
            payload:clinicianList
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