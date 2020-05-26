//axios.post('http://localhost:5666/auth/signup', { username, password }, { withCredentials: true })
import React, { Component } from 'react';
import {Link} from "react-router-dom"

import axios from "axios"
import stopService from "../lib/stop-service"
import StopPage from '../pages/StopPage';

export default class Search extends Component {

    state = {
        data: [],
        searchFor: "",
        searchResults: []
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

    search = (text) => {
        let filteredStops = this.state.data.filter( stop => {
            return stop.stop_name.toLowerCase().includes(text.toLowerCase())
        } )
        this.setState({searchResults: filteredStops})
    }

    handleSearchInput = (e) => {
        let {value} = e.target;
        //console.log('value from search:', value) // it works! no need to log this anymore
        this.setState({searchFor: value}, () => {this.search(value)})
    }

    render() {
        const stopsearch = this.state.searchResults
        return (
            <div>

                <label>Search: </label>
                <input 
                type="text" 
                value={this.state.searchFor} 
                onChange={this.handleSearchInput} 
                placeholder="Search for stops" />

                <div>
                    <p>trying to display search results here:</p>
                    {stopsearch.map(stop => {               
                        return (
                            // using stopCode as key since they will NEVER change unless I purge the whole DB
                            <div key={stop.stop_code}>
                            <Link to={`/stops/${stop._id}`} >
                                <h4>{stop.stop_name}</h4>
                            </Link>
                            </div> // tried to add this inside first Link tag after to={}:  passingstuff={stop} but did not work
                        )
                    })}
                </div>
            </div>
        )
    }
}
