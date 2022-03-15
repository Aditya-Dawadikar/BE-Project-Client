import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import AnalysisResult from './AnalysisResult'
import AutomatedDiagnosis from './AutomatedDiagnosis'
import ManualDiagnosis from './ManualDiagnosis'

import { useSelector } from 'react-redux'

const ReportGeneration = () => {

    const segListFromStore = useSelector((state) => state.allSegments.allSegments)

    useEffect(() => {

        function getSummary() {
            let abnormalitySummary = {}
            let disorderSummary = {}
            let severitySummary = 0

            let abnormalityClasses = Object.keys(segListFromStore[0].analysis.abnormality)
            let disorderClasses = Object.keys(segListFromStore[0].analysis.disorder)

            let severityArray = []
            let abnormalityMatrix = []
            let disorderMatrix = []

            for (let i = 0; i < segListFromStore.length; i++) {
                abnormalityMatrix.push(Object.values(segListFromStore[i].analysis.abnormality))
                disorderMatrix.push(Object.values(segListFromStore[i].analysis.disorder))
                severityArray.push(segListFromStore[i].analysis.severity)
            }

            function average(list) {
                let sum=0
                for (let i = 0; i < list.length; i++) {
                    sum += list[i]
                }
                return sum / list.length;
            }

            function getSeveritySummary() {
                return average(severityArray)
            }

            function makeArrayFromMatrix(index,matrix){
                let arr = []
                for(let i=0;i<matrix.length;i++){
                    arr.push(matrix[i][index]);
                }
                return arr
            }

            function getAbnormalityAverage() {
                let abnormalityAverage=[]
                for(let i=0;i<abnormalityClasses.length;i++){
                    let reqArr = makeArrayFromMatrix(i,abnormalityMatrix)
                    let avg = average(reqArr)
                    abnormalityAverage.push(avg)
                }
                return abnormalityAverage
            }
            function getDisorderAverage() {
                let disorderAverage=[]
                for(let i=0;i<disorderClasses.length;i++){
                    let reqArr = makeArrayFromMatrix(i,disorderMatrix)
                    let avg = average(reqArr)
                    disorderAverage.push(avg)
                }
                return disorderAverage
            }

            function getMaxClassValue(classes,values){
                let max = Math.max(...values);
                let index = values.indexOf(max);
                let reqClass = classes[index]
                return {
                    "class":reqClass,
                    "probability":max
                }
            }

            abnormalitySummary=getMaxClassValue(abnormalityClasses,getAbnormalityAverage())
            disorderSummary=getMaxClassValue(disorderClasses,getDisorderAverage())
            severitySummary=getSeveritySummary()

            return {
                abnormality:abnormalitySummary,
                disorder:disorderSummary,
                severity:severitySummary
            }
        }

        if(segListFromStore[0].isAnalysed===true){
            console.log(getSummary())
        }
        setseglist(segListFromStore)
    }, [segListFromStore])

    const [seglist, setseglist] = useState([])
    const [summary, setsummary] = useState({
        abnormality: {
            class: "Crackle",
            probability: 97
        }, disorder: {
            class: "COPD",
            probability: 83
        }, severity: 3
    })

    const [note, setnote] = useState("")
    const [symptoms, setsymptoms] = useState("")

    const [activetab, setactivetab] = useState("Analysis")

    function handleNoteChange(e) {
        setnote(e.target.value)
    }
    function handleSymptomChange(e) {
        setsymptoms(e.target.value)
    }

    function handleSubmit() { }

    return (
        <div className='container'>
            <Tabs activeKey={activetab} onSelect={(k) => setactivetab(k)} id="report-generator" className="mb-3">
                <Tab eventKey="Analysis" title="Analysis">
                    <AnalysisResult />
                    <div className='d-flex'>
                        <div className='btn btn-primary m-1' onClick={() => { setactivetab("AutomatedDiagnosis") }}>Automated Diagnosis</div>
                        <div className='btn btn-primary m-1' onClick={() => { setactivetab("ManualDiagnosis") }}>Manual Diagnosis</div>
                    </div>
                </Tab>
                <Tab eventKey="AutomatedDiagnosis" title="Automated Diagnosis">
                    <AutomatedDiagnosis summary={summary} />
                </Tab>
                <Tab eventKey="ManualDiagnosis" title="Manual Diagnosis">
                    <ManualDiagnosis />
                </Tab>
            </Tabs>
            <br />
            <div>
                <div>
                    <label className="form-label">Mention Symptoms *</label>
                    <input
                        className="form-control"
                        type='text'
                        required={true}
                        value={symptoms}
                        onChange={(e) => { handleSymptomChange(e) }}
                    ></input>
                </div>
                <br />
                <div>
                    <label>Add Note *</label>
                    <br />
                    <textarea id="text-area" className='form-control' value={note} rows="4" cols="100" onChange={(e) => { handleNoteChange(e) }}></textarea>
                </div>
                <br />
                <div className='btn btn-success' onClick={() => { handleSubmit() }}>Save Data</div>
            </div>
            <div style={{ height: "500px" }}>

            </div>

        </div>
    )
}

export default ReportGeneration
