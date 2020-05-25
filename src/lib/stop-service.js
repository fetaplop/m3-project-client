import axios from "axios"

class Stop {
    constructor() {
        this.stop = axios.create({
            baseURL: process.env.REACT_APP_API_URL, // maybe use env values here :|
            withCredentials: true // is this needed??? some of these methods will need to know if a user is logged in
        })
    }

    getAll() {
        return this.stop
        .get("/stops")
        .then((response) => response.data)
        // so yeah no error handling here
    }

    getOne(id) {
        return this.stop
        .get(`/stops/${id}`)
        .then((response) => response.data)
    }

    // this one is a POST!
    save(id) {
        return this.stop
        .post(`/stops/${id}/save`) //"/:id/save"
        .then((response) => response.data)
    }

    unsave(id) {
        return this.stop
        .post(`/stops/${id}/unsave`)
        .then(response => response.data)
    }
}

const fetchStopDataFunctions = new Stop()

export default fetchStopDataFunctions