import axios from "axios";

class User {
    constructor() {
        this.user = axios.create({
            baseURL: process.env.REACT_APP_API_URL, // use env values here
            withCredentials: true // need to investigate this further.. 
        })
    }

    favourites() {
        return this.user
        .get("/user/favourites")
        .then((response) => response.data)
    }

    delete() {
        return this.user
        .delete("user/delete") // should work since in backend we get the user from req.session.currentUSer
        .then((response) => response.data)
    }
}

const userFunctions = new User()
export default userFunctions