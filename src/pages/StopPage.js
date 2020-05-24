import React, { Component } from 'react';
import stopService from "../lib/stop-service"
import authService from "../lib/auth-service"
import {withAuth} from '../lib/Auth';


class StopPage extends Component {

    state = { // the issue seems to be that this state is valid even for login page..
        stop: {},
        //isLoading: true
        //isFave: undefined // should be bool
    }

    // the BIG QUESTION: how to make my stop only render after I got the data from my server??
    componentDidMount() {
        const {id} = this.props.match.params
        console.log('id from componentDidMount:', id)

        
        stopService.getOne(id)
        .then(stopFromServer => {
            console.log('stopfromServer inside StopPage compoenntDid*Mount:', stopFromServer)
            this.setState({stop: stopFromServer, isLoading: false})
        })
        
        // is there a user??
        // authService.me()
        // .then( userdata => {
        //     console.log('userdata from stpPage componentdid mount:', userdata)
        // } ) but this should already be in req.session!!

        
    }

    
    render() {

        
        //console.log('this.props.match is:', this.props.match) // it always prints twice in the console, why?????
        
        
        let mystop = this.state.stop
        console.log('mystop should be now a stop...', mystop)
        // let buses = mystop.busLines.map( bus => {
        //     return `${bus}, ` })
        

        // console.log('buses', buses)

        // FUCKING HELL THIS NOW RENDERS IN LOGIN AND SIGNUP WTF???
        return (
            // (this.state.isLoading? <h2>still loading page...</h2>
            // : 
            <div>
                <h1>heya this is {mystop.name} page</h1>
                <p>buses servicing this stop: {} </p> 
                {/* tried using spread to get the bus lines but nah dont work */}
            </div>
                
        )
        
    }
}

export default StopPage
//export default withAuth(StopPage) tried if this changes the fact that StopPage fucks up both login and signup