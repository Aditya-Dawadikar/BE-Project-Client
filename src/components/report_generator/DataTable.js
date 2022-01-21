import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap'
import axios from 'axios'

const DataTable = ({segment}) => {

    const [seginfo,setseginfo] = useState({
        name:"",
        abnormality:0,
        diagnosis:0,
        severity:0,
    })

    const abnormality = ["crackle", "none", "wheeze"]
    const diagnosis = ["asthma", "bronchial", "copd", "healthy", "pneumonia"]
    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

    useEffect(()=>{
        function getDiagnosis(datamap) {
            if (typeof datamap !== 'undefined') {
                let values = Object.values(datamap)
                let index = values.indexOf(Math.max(...values))
                if (values[index] !== 0)
                    return diagnosis[index]
            }
            return -1
        }
    
        function getAbnormality(datamap) {
            if (typeof datamap !== 'undefined') {
                let values = Object.values(datamap)
                let index = values.indexOf(Math.max(...values))
                if (values[index] !== 0)
                    return abnormality[index]
            }
            return -1
        }

        function getAnalysis(seg) {
            // pending code for handling unnecessary api call for analysed segment
            if(seg.isAnalysed===false){
                axios.post('http://localhost:5000/api/analysis/predict', {
                    signaldata: seg.data,
                    samplingrate: seg.samplingrate
                }).then((res) => {
                    let results = res.data
                    let seginfoobject = {
                        name: segment.name,
                        abnormality: getAbnormality(results['abnormality']),
                        diagnosis: getDiagnosis(results['disorder']),
                        severity:results['severity'],
                    }
                    setseginfo(seginfoobject)
                }).catch((err) => {
                    console.log(err)
                    return -1
                })
            }
        }

        getAnalysis(segment)

    },[segment])

    

    return <Table striped bordered hover>
        <tbody>
            <tr>
                <td>Segment Id</td>
                <td>{seginfo.name}</td>
            </tr>
            <tr>
                <td>Abnormality</td>
                <td>{seginfo.abnormality}</td>
            </tr>
            <tr>
                <td>Disorder</td>
                <td>{seginfo.diagnosis}</td>
            </tr>
            <tr>
                <td>Severity</td>
                <td>{seginfo.severity}</td>
            </tr>
        </tbody>
    </Table>
}

export default DataTable;
