import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import BarGraph from './graphs/BarGraph';
import LineGraph from './graphs/LineGraph';

import Img1 from '../../assets/graphs/img1.png'
import Img2 from '../../assets/graphs/img2.png'
import Img3 from '../../assets/graphs/img3.png'
import Img4 from '../../assets/graphs/img4.png'

import { useSelector } from 'react-redux';

const DataVisualizer = ({ seginfo, segid }) => {

    const segmentFromStore = useSelector((state) => state.allSegments.allSegments[segid])

    const [img1, setimg1] = useState()
    const [img2, setimg2] = useState()
    const [img3, setimg3] = useState(Img3)
    const [img4, setimg4] = useState(Img4)

    const [currseg, setcurrseg] = useState(segmentFromStore)
    const [abnormality, setabnormality] = useState({labels:[],data:[]})
    const [disorder, setdisorder] = useState({labels:[],data:[]})

    useEffect(() => {
        // console.log(currseg)
        if (typeof currseg !== 'undefined') {
            setabnormality({
                labels: Object.keys(currseg.analysis.abnormality),
                data: Object.values(currseg.analysis.abnormality)
            })
            setdisorder({
                labels: Object.keys(currseg.analysis.disorder),
                data: Object.values(currseg.analysis.disorder)
            })
        }

    }, [currseg])

    return <Tabs defaultActiveKey="Abnormality" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="Abnormality" title="Abnormality" style={{ minHeight: "250px" }}>
            <BarGraph
                labels={abnormality.labels}
                data={abnormality.data}
            />
        </Tab>
        <Tab eventKey="Diagnosis" title="Diagnosis" style={{ minHeight: "250px" }}>
            <BarGraph
                labels={disorder.labels}
                data={disorder.data}
            />
        </Tab>
        <Tab eventKey="Waveform" title="Waveform" style={{ minHeight: "250px" }}>
            {
                typeof currseg!=='undefined'?<LineGraph data={currseg.data} />:<></>
            }
            
        </Tab>
        <Tab eventKey="Spectrogram" title="Spectrogram" style={{ minHeight: "250px" }}>
            <img src={img4} style={{ height: "275px" }} />
        </Tab>
    </Tabs>
};

export default DataVisualizer;
