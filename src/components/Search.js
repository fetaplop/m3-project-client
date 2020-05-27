//axios.post('http://localhost:5666/auth/signup', { username, password }, { withCredentials: true })
import React, { Component } from 'react';
import {Link} from "react-router-dom"
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';

import stopService from "../lib/stop-service"
import {connect} from "react-redux"


class Search extends Component {

    state = {
        //data: [],
        searchFor: "",
        searchResults: [],
        //loading: true // USE REDUX!!!
    } 

    componentDidMount() {
        // 1) hard-coded version
        // axios.get("http://localhost:5666/stops/")
        // .then( (response) => {
        //     const serverData = response.data
        //     console.log('serverData', serverData)
        //     this.setState({data: serverData})
        // } )

        // 2) using stopService AND redux

    const stopsDataExists = (this.props.stopsData.length > 0)

    if (stopsDataExists) {
        return //dont try to get the data again!
    }
        stopService.getAll()
        .then( serverData => {
            console.log('serverData with stopService getAll me:', serverData)
            this.props.addAllStops(serverData)
            //this.setState({loading: false})
        })

        .catch((err) => console.log("error while getting data from server",err))
    }

    search = (text) => { // change this to consume data that redux provides
        let filteredStops = this.props.stopsData.filter( stop => {
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
        return ( // add bus animation!!
            <div class="search-field">
                {(this.props.stopsData.length > 0)
                ?(
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Search for bus stops by name"
                        aria-label="Search"
                        value={this.state.searchFor} 
                        onChange={this.handleSearchInput}
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                // <div>
                //     {/* <label>Search: </label> */}
                //     <input 
                //     type="text" 
                //     value={this.state.searchFor} 
                //     onChange={this.handleSearchInput} 
                //     placeholder="Search for bus stops by name" />
                // </div>
                )
                : <p>Loading data...</p>
                }

{/* <Card>
  <Card.Body>This is some text within a card body.</Card.Body>
</Card> */}

                <div>
                    {stopsearch.map(stop => {               
                        return (
                            // using stopCode as key since they will NEVER change unless I purge the whole DB
                            <div key={stop.stop_code}>
                           <Card>
                                <Card.Body style={{padding: "5px 10px"}}>
                                    <Link to={`/stops/${stop._id}`} >
                                        <h4>{stop.stop_name}</h4>
                                    </Link>
                                </Card.Body>
                           </Card>

                            </div> // tried to add this inside first Link tag after to={}:  passingstuff={stop} but did not work
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {stopsData: state}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAllStops: (stopsFromServer) => {
            dispatch({type: "ADD_ALL_STOPS", payload: stopsFromServer})} // add stops to redux
    }
}

// connect redux
export default connect(mapStateToProps, mapDispatchToProps)(Search);