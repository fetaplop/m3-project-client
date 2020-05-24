import axios from "axios"

class Stop {
    constructor() {
        this.stop = axios.create({
            baseURL: "http://localhost:5666", // maybe use env values here :|
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
}

const fetchStopDataFunctions = new Stop()

export default fetchStopDataFunctions