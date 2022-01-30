import React, { useState, useEffect } from 'react';
import axios from 'axios'

import DataTable from './DataTable';
import DataVisualizer from './DataVisualizer';

const DataContainer = ({ segment }) => {

    const [seginfo,setseginfo] = useState({
        name:"",
        abnormality:0,
        diagnosis:0,
        severity:0,
        signaldata:[],
        samplingrate:0,
        analysis:{}
    })

    const abnormality = ["crackle", "none", "wheeze"]
    const diagnosis = ["asthma", "bronchial", "copd", "healthy", "pneumonia"]
    
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
                        signaldata:seg.data,
                        samplingrate:seg.samplingrate,
                        analysis:results
                    }
                    // console.log(seginfoobject)
                    setseginfo(seginfoobject)
                }).catch((err) => {
                    console.log(err)
                    return -1
                })
            }
        }

        getAnalysis(segment)

    },[segment])

    return <div className='row'>
        <div className='col'>
            {/* Segment details */}
            <DataTable seginfo={seginfo} />
        </div>
        <div className='col'>
            <DataVisualizer seginfo={seginfo}/>
        </div>
    </div>

};

export default DataContainer;
