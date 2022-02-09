import React from 'react';
import {Table} from 'react-bootstrap'

const AutomatedDiagnosis = ({summary}) => {
    return <div>
        The system suggested Diagnosis Summary is as follows:
        <br />
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Factor</th>
                    <th>Output</th>
                    <th>Probability</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Abnormality</td>
                    <td>{summary.abnormality.class}</td>
                    <td>{summary.abnormality.probability}% surity</td>
                </tr>
                <tr>
                    <td>Disorder</td>
                    <td>{summary.disorder.class}</td>
                    <td>{summary.disorder.probability}% surity</td>
                </tr>
                <tr>
                    <td>Severity</td>
                    <td>{summary.severity}</td>
                    <td>NA</td>
                </tr>
            </tbody>
        </Table>
        
    </div>;
};

export default AutomatedDiagnosis;
