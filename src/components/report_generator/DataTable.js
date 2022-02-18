import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'

const DataTable = ({seginfo}) => {

    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

    const [currseg, setcurrseg] = useState(seginfo)

    useEffect(() => {
        setcurrseg(seginfo)
    },[seginfo])

    return <Table striped bordered hover>
        <tbody>
            <tr>
                <td>Segment Id</td>
                <td>{currseg.name}</td>
            </tr>
            <tr>
                <td>Abnormality</td>
                <td>{currseg.analysis.summary.abnormality}</td>
            </tr>
            <tr>
                <td>Disorder</td>
                <td>{currseg.analysis.summary.disorder}</td>
            </tr>
            <tr>
                <td>Severity</td>
                <td>
                    <div 
                        className='btn m-1' 
                        style={{ 'background': severitycode[currseg.analysis.severity] }}>
                    </div>
                    <div>{severity[currseg.analysis.severity]}</div>
                </td>
            </tr>
        </tbody>
    </Table>
}

export default DataTable;
