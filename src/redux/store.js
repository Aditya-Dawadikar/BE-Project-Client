import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { clinicLoginReducer, clinicRegisterReducer } from './reducers/clinicReducers';
import {patientListReducer} from './reducers/patientListReducer'
import {clinicianListReducer} from './reducers/clinicianListReducer'
import { audioEditorReducer } from './reducers/audioEditorReducer';

const reducer = combineReducers({
    clinicLogin: clinicLoginReducer,
    clinicRegister: clinicRegisterReducer,
    allPatients:patientListReducer,
    allClinicians: clinicianListReducer,
    allSegments: audioEditorReducer
})

const clinicInfoFromStorage = localStorage.getItem('clinicInfo') ? JSON.parse(localStorage.getItem('clinicInfo')) :  null

const initialState = {
    clinicLogin: { clinicInfo: clinicInfoFromStorage },
    allPatients:{allPatients:[]},
    allClinicians:{allClinicians:[]},
    allSegments:{allSegments:[]}
}
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store

// {
//     firstname: "a",
//     lastname: "",
//     phone: "",
//     email: "",
//     age: 0,
//     weight: 0,
//     bloodgroup: 0,
//     gender: 0,
//     diagnosis: "abc"
// }

// {
//     firstname: "aa",
//     lastname: "",
//     phone: "",
//     email: "",
//     age: 0,
//     role: "saf",
//     gender: 0
// }