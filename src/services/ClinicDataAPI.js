import axios from 'axios'

const base_url = process.env.REACT_APP_LOCAL_APPLICATION_SERVER

export const getClinicians = async (page, size, token) => {

    let url = base_url + `api/doctors?page=${page}&size=${size}`
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return new Promise((resolve, reject) => {
        axios.get(url, config).then(res => {
            if (res["data"] && res['data']['content']) {
                resolve(res['data']['content'])
            } else {
                throw (new Error("no data received"))
            }
        }).catch(err => {
            console.log(err)
        })
    })
}

export const getClinicianById = async (id, token) => {

    let url = base_url + `api/doctors/${id}`
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return new Promise((resolve, reject) => {
        axios.get(url, config).then(res => {
            if (res["data"] && res['data']['content']) {
                resolve(res['data']['content'])
            } else {
                throw (new Error("no data received"))
            }
        }).catch(err => {
            console.log(err)
        })
    })
}

export const getPatients = (page, size, token) => {
    let url = base_url + `api/patients?page=${page}&size=${size}`
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return new Promise((resolve, reject) => {
        axios.get(url, config).then(res => {
            if (res["data"] && res['data']['content']) {
                resolve(res['data']['content'])
            } else {
                throw (new Error("no data received"))
            }
        }).catch(err => {
            console.log(err)
        })
    })
}

export const getPatientById = async (id, token) => {

    let url = base_url + `api/patients/${id}`
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return new Promise((resolve, reject) => {
        axios.get(url, config).then(res => {
            if (res["data"] && res['data']['content']) {
                console.log(res.data.content)
                resolve(res['data']['content'])
            } else {
                throw (new Error("no data received"))
            }
        }).catch(err => {
            console.log(err)
        })
    })
}

export const getPatientHistory = async (id, token) => {
    let url = base_url + `api/history/${id}`
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return new Promise((resolve, reject) => {
        axios.get(url, config).then(res => {
            if (res["data"] && res['data']) {
                if (res['data']['rows'].length > 0) {
                    let required_array = []

                    res['data']['rows'].map((record) => {
                        let required_object = {}
                        required_object["date"] = record.date
                        required_object["clinician"] = record.doctorDetails.name
                        required_object["symptoms"] = record.symptoms
                        required_object["diagnosis"] = record.diagnosis
                        required_object["severity"] = record.severity
                        required_object["report"] = record.reportUrl
                        required_array.push(required_object)
                    })

                    resolve(required_array)
                } else {
                    resolve([])
                }
            } else {
                throw (new Error("no data received"))
            }
        }).catch(err => {
            console.log(err)
        })
    })
}