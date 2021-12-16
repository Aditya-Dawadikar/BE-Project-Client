import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Landing from './screens/website_essentials/Landing'
import About from './screens/website_essentials/About'

import Clinic from './screens/registration/Clinic'
import Patient from './screens/registration/Patient'

import AudioEditor from './screens/audio_workspace/Audio_editor'
import ReportEditor from './screens/diagnosis_workspace/Report_generation'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/clinic' element={<Clinic/>}></Route>
          <Route path='/clinic/patient' element={<Patient/>}></Route>
          <Route path='/workspace/audio' element={<AudioEditor/>}></Route>
          <Route path='/workspace/report' element={<ReportEditor/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
