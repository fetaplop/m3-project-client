import React, { Component } from 'react';
import stopService from "../lib/stop-service"

export default class StopPage extends Component {

    state = {
        stop: null,
        isLoading: true
    }

    componentDidMount() {
        const {id} = this.props.match.params
        console.log('id from componentDidMount:', id)
        stopService.getOne(id)
        .then(stopFromServer => {
            console.log('stopfromServer:', stopFromServer)
            this.setState({stop: stopFromServer, isLoading: false})
        })

    }

    
    render() {

        
        console.log('this.props.match is:', this.props.match) // it always prints twice in the console, why?????
        
        const stopID = this.props.match.params
        console.log('stopID is:', stopID)
        // const {id} = this.props.match.params
        // console.log('id:', id)
        
        let mystop = this.state.stop
        console.log('mystop should be now a stop...', mystop)

        // FUCKING HELL THIS NOW RENDERS IN LOGIN AND SIGNUP WTF???
        return (
            (this.state.isLoading? <h2>still loading page...</h2>
            : 
            <div>
                <h1>heya this is {mystop.name} page</h1>
            </div>
                
        )
        // <h1>stop page: {mystop.name} </h1>
        )
    }
}
