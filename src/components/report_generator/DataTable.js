import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'

import { useSelector } from 'react-redux';


const DataTable = ({ index }) => {

    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

    const allSegments = useSelector((state) => state.allSegments.allSegments)

    return <Table striped bordered hover>
        {
            allSegments === null && allSegments.length<=0? <></> : <tbody>
                <tr>
                    <td>Segment Id</td>
                    <td>{allSegments[index].name || ""}</td>
                </tr>
                <tr>
                    <td>Abnormality</td>
                    <td>{allSegments[index].analysis.summary.abnormality || ""}</td>
                </tr>
                <tr>
                    <td>Disorder</td>
                    <td>{allSegments[index].analysis.summary.disorder || ""}</td>
                </tr>
                <tr>
                    <td>Severity</td>
                    <td>
                        <div
                            className='btn m-1'
                            style={{ 'background': severitycode[allSegments[index].analysis.severity] }}>
                        </div>
                        <div>{severity[allSegments[index].analysis.severity] || ""}</div>
                    </td>
                </tr>
            </tbody>
        }
    </Table>
}

export default DataTable;
