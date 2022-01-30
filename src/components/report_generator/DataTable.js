import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap'


const DataTable = ({seginfo}) => {

    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

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
                <td><div className='btn m-1' style={{'background':severitycode[seginfo.severity]}}></div>{severity[seginfo.severity]}<div></div></td>
            </tr>
        </tbody>
    </Table>
}

export default DataTable;
