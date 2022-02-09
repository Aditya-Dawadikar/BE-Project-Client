import React from 'react';
import DataContainer from '../report_generator/DataContainer'

const AnalysisResult = ({seglist}) => {
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
            seglist.map((segment, index) => {
                return <li key={index} className='list-group-item'>
                    <DataContainer segment={segment} />
                </li>
            })
        }
    </ul>
};

export default AnalysisResult;
