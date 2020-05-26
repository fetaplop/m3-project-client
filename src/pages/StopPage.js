import React, { Component } from 'react';
import stopService from "../lib/stop-service"
import userService from "../lib/user-service"
//import authService from "../lib/auth-service"
import {withAuth} from '../lib/Auth';


class StopPage extends Component {

    state = { // 
        stop: {},
        isFave: null
        //isLoading: true
    }

    handleLike = () => {
        // send POST to server to add or remove this stop from faves
        // use state: is it fave ? yes -> unsave in server : no -> save in server 
        const stopID = this.state.stop._id 
        console.log('stopID', stopID)
        if (this.state.isFave === false) { // if user has not liked already, like this stop!
            stopService.save(stopID)
            .then(saved => {
                console.log('saved from handleLike()', saved)
                this.setState({isFave: true})
            })
        }
        // let's be super explicit about it and use another if block:
        if (this.state.isFave === true) {
            stopService.unsave(stopID)
            .then(unsaved => {
                console.log('unsaved this stop from handleLike()', unsaved)
                this.setState({isFave: false})
            })
        }
    }

    // the BIG QUESTION: how to make my stop only render after I got the data from my server??
    componentDidMount() { // this really eeds to be optimised better..
        const {id} = this.props.match.params
        console.log('id from componentDidMount:', id)

        // if (this.props.isLoggedIn === true) {
        //     console.log('this.props.user.favStops', this.props.user.favStops)
        // }

        stopService.getOne(id)
        .then(stopFromServer => {
            console.log('stopfromServer inside StopPage compoenntDid*Mount:', stopFromServer)
            // trying to add state update here since now we don't get the stop displaying as public user
            this.setState({stop: stopFromServer})
            //this.setState({stop: stopFromServer, isLoading: false}) // !! using isLoading here? is it bad, can I even use it with stop-service?
            userService.favourites()
                .then( userFavourites => {
                console.log('userFavourites', userFavourites)
                console.log('stopFromServer inside userFavourties, ', stopFromServer)
                
                let fave = false; // assume it's not favourite and then check
                if (userFavourites.length > 0) 
                {userFavourites.forEach(favstop => { // look for each stop in user's favourite stops
                 console.log("the type of " + favstop._id + " is: " + typeof(favstop._id))
                 console.log('the id from componentdid mountis this? ', id)
                if (favstop._id === id) {
                    console.log('we found a match')
                    fave = true
                }
                })}
            console.log('fave before setting state', fave)
            this.setState({isFave: fave, stop: stopFromServer})
            })
            .catch(err => {
                console.log('error from trying to update user likes, likely because we are not logged in', err)
            })
        })
        .catch(err => {
            console.log('err from StopService.GetOne in componentDidmount', err)
        })
        
    }
    shouldComponentUpdate(nextProps, nextState) {
        // compare props with next props?
        return (this.state.isFave !== nextState.isFave)
    }
    
    render() {
 
        console.log('this.props.user from render', this.props.user)
        
        let thisStop = this.state.stop
        console.log('thisStop in render comign from this.state', thisStop)
        console.log('this.state', this.state)
        // let buses = thisStop.busLines.map( bus => {
        //     return `${bus}, ` })
        // console.log('buses', buses)

        // FUCKING HELL THIS NOW RENDERS IN LOGIN AND SIGNUP WTF??? update! now only after logging out
        return (
            // (this.state.isLoading? <h2>still loading page...</h2>
            // : 
            <div>
                <h1>{thisStop.stop_name}</h1>
                <p>buses servicing this stop: {} </p> 
                {/* tried using spread to get the bus lines but nah dont work */}
                {this.props.isLoggedIn
                ? (this.state.isFave 
                    ? <button onClick={this.handleLike} style={ {backgroundColor: 'green'} } >is mah fave, unlike?</button>
                    : <button onClick={this.handleLike} style={ {backgroundColor: 'red'} }>not fave, wanna save? </button> )
                : <p>Log in to save this stop to favourites </p> }

            </div>
                
        )    
    }
}

//export default StopPage
export default withAuth(StopPage) // tried if this changes the fact that StopPage fucks up both login and signup