import {actions} from '../constants/patientListConstants'

export const patientListAction = (patientList)=>async(dispatch)=>{
    try{
        // handle get patient list logic here
        dispatch({
            type:actions.GET_ALL_PATIENTS,
            payload:patientList
        })
    }catch(err){
        console.log(err)
    }
}

export const addPatientAction = (patient)=>async(dispatch)=>{
    try{
        dispatch({
            type:actions.ADD_NEW_PATIENT,
            payload:patient
        })
    }catch(err){
        console.log(err)
    }
}

export const deletePatientAction = (patient)=>async(dispatch)=>{
    try{
        dispatch({
            type:actions.DELETE_PATIENT,
            payload:patient
        })
    }catch(err){
        console.log(err)
    }
}