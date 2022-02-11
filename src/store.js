import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { clinicLoginReducer, clinicRegisterReducer } from './reducers/clinicReducers';

const reducer = combineReducers({
    clinicLogin: clinicLoginReducer,
    clinicRegister: clinicRegisterReducer
})

const clinicInfoFromStorage = localStorage.getItem('clinicInfo') ? JSON.parse(localStorage.getItem('clinicInfo')) :  null

const initialState = {
    clinicLogin: { clinicInfo: clinicInfoFromStorage }
 }
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
