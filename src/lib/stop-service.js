import axios from "axios"

class Stop {
    constructor() {
        this.stop = axios.create({
            baseURL: "http://localhost:5666", // maybe use env values here :|
            withCredentials: true // is this needed??? some of these methods will need to know if a user is logged in
        })
    }

    getAll() {
        return this.stop("/stops")
        .then((response) => response.data)
        // so yeah no error handling here
    }
}

const fetchStopDataFunctions = new Stop()

export default fetchStopDataFunctions