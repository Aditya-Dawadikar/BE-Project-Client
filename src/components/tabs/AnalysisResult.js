import React from 'react';
import DataContainer from '../report_generator/DataContainer'

import { useSelector } from 'react-redux';

const AnalysisResult = () => {

    const segListFromStore = useSelector((state)=>state.allSegments.allSegments)

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
                    <DataContainer segid={index} />
                </li>
            })
        }
    </ul>
};

export default AnalysisResult;
