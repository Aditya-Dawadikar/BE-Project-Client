import React, { useState, useEffect } from 'react';

import DataTable from './DataTable';
import DataVisualizer from './DataVisualizer';

import { useDispatch,useSelector } from 'react-redux';
import {updateSegmentAction} from '../../redux/actions/audioEditorActions'

import { predict } from '../../services/AudioAnalysisAPI'

const DataContainer = ({ segment,segid }) => {

    const dispatch = useDispatch()

    // {
    //     name:"",
    //     abnormality:0,
    //     diagnosis:0,
    //     severity:0,
    //     signaldata:[],
    //     samplingrate:0,
    //     analysis:{}
    //     isAnalysed:false
    // }
    const [seginfo, setseginfo] = useState(segment)

    const abnormality = ["crackle", "none", "wheeze"]
    const disorder = ["asthma", "bronchial", "copd", "healthy", "pneumonia"]

    const segListFromStore = useSelector((state)=>state.allSegments.allSegments)

    useEffect(() => {
        function getDisorder(datamap) {
            if (typeof datamap !== 'undefined') {
                let values = Object.values(datamap)
                let index = values.indexOf(Math.max(...values))
                if (values[index] !== 0)
                    return disorder[index]
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

        function getAnalysis() {
            if (segment.isAnalysed === false) {
                predict(segment.data, segment.samplingrate)
                    .then(res => {
                        let updatedSegments = segListFromStore
                        
                        updatedSegments[segid].analysis.summary.abnormality = getAbnormality(res.data.abnormality)
                        updatedSegments[segid].analysis.summary.disorder = getDisorder(res.data.disorder)
                        updatedSegments[segid].analysis.abnormality = res.data.abnormality
                        updatedSegments[segid].analysis.disorder = res.data.disorder
                        updatedSegments[segid].analysis.severity = res.data.severity
                        updatedSegments[segid].isAnalysed = true

                        dispatch(updateSegmentAction(updatedSegments))
                    }).catch(err => {
                        console.log(err)
                    })
            }
        }

        getAnalysis()

    }, [seginfo])

    return <div className='row'>
        <div className='col'>
            {/* Segment details */}
            {seginfo !== null ? <DataTable seginfo={seginfo} index={segid}/> : <></>}
        </div>
        <div className='col'>
            {seginfo !== null ? <DataVisualizer seginfo={seginfo} index={segid} /> : <></>}
        </div>
    </div>

};

export default DataContainer;
