import React, { useEffect } from 'react';

const AutomatedDiagnosis = ({ summary }) => {

    console.log(summary)

    return <div>
        The system suggested Diagnosis Summary is as follows:
        <br /><br />
        <div className='row'>
            <div className='col'>
                <p className='h4'>Disorder Analysis</p>
                <ul className='list-group'>
                    {
                        summary.disorder.class.map((ele, index) => {
                            return <li className='list-group-item'>
                                <div className='row'>
                                    <div className='col text-end'>{ele} :</div>
                                    <div className='col'>{summary.disorder.probabilities[index]}</div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className='col'>
                <p className='h4'>Abnormality Analysis</p>
                <ul className='list-group'>
                    {
                        summary.abnormality.class.map((ele, index) => {
                            return <li className='list-group-item row'>
                                <div className='row'>
                                    <div className='col text-end'>{ele} :</div>
                                    <div className='col'>{summary.abnormality.probabilities[index]}</div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    </div>;
};

export default AutomatedDiagnosis;
