import React, { useEffect } from 'react';
import DataContainer from '../report_generator/DataContainer'

import { useSelector } from 'react-redux';

const AnalysisResult = () => {

    const segListFromStore = useSelector((state)=>state.allSegments.allSegments)

    useEffect(()=>{
        console.log(segListFromStore)
    },[segListFromStore])

    return <ul className='list-group'>
        <li className='list-group-item active'>
            <div className='row'>
                <div className='col'>
                    Segment details
                </div>
                <div className='col'>
                    visualization
                </div>
            </div>
        </li>
        {
            segListFromStore.map((segment, index) => {
                return <li key={index} className='list-group-item'>
                    <DataContainer segid={index} segment={segment} />
                </li>
            })
        }
    </ul>
};

export default AnalysisResult;
