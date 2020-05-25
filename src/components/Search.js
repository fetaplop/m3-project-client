//axios.post('http://localhost:5666/auth/signup', { username, password }, { withCredentials: true })
import React, { Component } from 'react';
import {Link} from "react-router-dom"

import axios from "axios"
import stopService from "../lib/stop-service"
import StopPage from '../pages/StopPage';

export default class Search extends Component {

    state = {
        data: [],
        searchFor: ""
    } 

    componentDidMount() {
        // 1) hard-coded version
        // axios.get("http://localhost:5666/stops/")
        // .then( (response) => {
        //     const serverData = response.data
        //     console.log('serverData', serverData)
        //     this.setState({data: serverData})
        // } )
        // 2) using stopService
        stopService.getAll()
        .then( serverData => {
            console.log('serverData with stopService getAll me:', serverData)
            this.setState({data: serverData})
        })

        .catch((err) => console.log("error while getting data from server",err))
    }

    render() {
        const stops = this.state.data
        return (
            <div>
                <form action="" method="get">
                    <label>Search: </label>
                {/* <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} /> */}
            <button type="submit" >oikeesti tää ei ees mittään vaikka submit button onkin</button>
                </form>

                <div>
                    <p>trying to display all stops here:</p>
                    {stops.map(stop => {               
                        return (
                            // using stopCode as key since they will NEVER change unless I purge the whole DB
                            //<h3 key={stop.stopCode}>{stop.name}</h3>
                            <div key={stop.stopCode}>
                            <Link to={`/stops/${stop._id}`} >
                                <h4>{stop.name}</h4>
                            </Link>
                            </div> // tried to add this inside first Link tag after to={}:  passingstuff={stop} but did not work
                        )
                        
                    })}
                </div>
            </div>
        )
    }
}
