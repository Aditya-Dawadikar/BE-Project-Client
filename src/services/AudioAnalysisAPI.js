import axios from "axios";

export function predict(signaldata, samplingrate) {
    // let obj={signaldata:signaldata,samplingrate:samplingrate}
    // const size = new TextEncoder().encode(JSON.stringify(obj)).length
    // const kiloBytes = size / 1024;
    // const megaBytes = kiloBytes / 1024;

    // console.log(megaBytes)

    let url = 'http://localhost:5000/api/analysis/predict'
    let body = {
        signaldata: signaldata,
        samplingrate: samplingrate
    }
    let config = {}
    return axios.post(url, body, config)
}