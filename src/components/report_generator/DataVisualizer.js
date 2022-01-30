import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import BarGraph from './BarGraph';
import LineGraph from './LineGraph';

import Img1 from '../../assets/graphs/img1.png'
import Img2 from '../../assets/graphs/img2.png'
import Img3 from '../../assets/graphs/img3.png'
import Img4 from '../../assets/graphs/img4.png'

import axios from 'axios'

const DataVisualizer = ({ seginfo }) => {

    const [img1, setimg1] = useState()
    const [img2, setimg2] = useState()
    const [img3, setimg3] = useState()
    const [img4, setimg4] = useState()

    useEffect(() => {
        function getTimeSeries() {
            axios.post('http://localhost:5000/api/visualization/timeseries', {
                signaldata: seginfo.signaldata,
                samplingrate: seginfo.samplingrate
            }, {
                responseType: 'blob'
            }).then((res) => {
                let imagesrc = URL.createObjectURL(res.data);
                setimg3(imagesrc)
            }).catch((err) => {
                console.log(err)
            })
        }
        function getSpectrogram() {
            axios.post('http://localhost:5000/api/visualization/spectrogram', {
                signaldata: seginfo.signaldata,
                samplingrate: seginfo.samplingrate
            }, {
                responseType: 'blob'
            }).then((res) => {
                let imagesrc = URL.createObjectURL(res.data);
                setimg4(imagesrc)
            }).catch((err) => {
                console.log(err)
            })
        }

        getTimeSeries()
        getSpectrogram()

    }, [seginfo])

    return <Tabs defaultActiveKey="Abnormality" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="Abnormality" title="Abnormality" style={{ minHeight: "250px" }}>
            <BarGraph labels={Object.keys(seginfo.analysis.abnormality)} data={Object.values(seginfo.analysis.abnormality)} />
        </Tab>
        <Tab eventKey="Diagnosis" title="Diagnosis" style={{ minHeight: "250px" }}>
            <BarGraph labels={Object.keys(seginfo.analysis.disorder)} data={Object.values(seginfo.analysis.disorder)}/>
        </Tab>
        <Tab eventKey="Waveform" title="Waveform" style={{ minHeight: "250px" }}>
            {/* <img src={img3} style={{ height: "275px" }} /> */}
            <LineGraph data={seginfo.signaldata} />
        </Tab>
        <Tab eventKey="Spectrogram" title="Spectrogram" style={{ minHeight: "250px" }}>
            <img src={img4} style={{ height: "275px" }} />
        </Tab>
    </Tabs>

};

export default DataVisualizer;
