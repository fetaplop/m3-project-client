import React, { Component } from 'react';
import stopService from "../lib/stop-service"
import userService from "../lib/user-service"
import authService from "../lib/auth-service"
import {withAuth} from '../lib/Auth';


class StopPage extends Component {

    state = { // the issue seems to be that this state is valid even for login page..
        stop: {},
        isFave: null
        //isLoading: true
        //isFave: undefined // should be bool
    }

    handleLike = () => {
        // send POST to server to add or remove this stop from faves
        // use state: is it fave ? yes -> unsave in server : no -> save in server 
        const stopID = this.state.stop._id 
        //console.log('its not ID though!!!!!!!!!!!!!!')
        console.log('stopID', stopID)
        if (this.state.isFave === false) { // if user has not liked already, like this stop!
            stopService.save(stopID)
            .then(saved => {
                console.log('saved from handleLike()', saved)
                this.setState({isFave: true})
            } )
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

    // auth and user, should they be combined?
    //user service should post save/unsave a stop. it should get what current favourites are? obviously delete user.
    // can I save stuff from both user and auth to state? maybe it's good to have user favStops array in the (provider) state?
    // what the hell is the relationship between Auth.js and auth-service?

    // the BIG QUESTION: how to make my stop only render after I got the data from my server??
    componentDidMount() {
        const {id} = this.props.match.params
        console.log('id from componentDidMount:', id)

        // if (this.props.isLoggedIn === true) {
        //     console.log('this.props.user.favStops', this.props.user.favStops)
        // }

        stopService.getOne(id)
        .then(stopFromServer => {
            console.log('stopfromServer inside StopPage compoenntDid*Mount:', stopFromServer)
            //this.setState({stop: stopFromServer, isLoading: false}) // !! using isLoading here? is it bad, can I even use it with stop-service?
            userService.favourites().then( userFavourites => {
                console.log('userFavourites', userFavourites)
                console.log('inside userFavourties, stopFromServer', stopFromServer)
                
                let fave = false;
                if (userFavourites.length > 0) 
                {userFavourites.forEach(favstop => { // look for the stop in user's favourite stops
                 console.log("the type of " + favstop._id + " is: " + typeof(favstop._id))
                 console.log('the id from componentdid mountis this? ', id)
                if (favstop._id === id) {
                    console.log('we found a match')
                    fave = true
                }
                else {
                    console.log('not a match')
                    fave = false
                }
                })}
            console.log('fave before setting state', fave)
            this.setState({isFave: fave, stop: stopFromServer})
            })
            .catch(err => {console.log('err from double then', err)})
        })
        .catch(err => {
            console.log('err from StopService.GetOne in componentDidmount', err)
        })

        
        
        // is there a user??
        // authService.me()
        // .then( userdata => {
        //     console.log('userdata from stpPage componentdid mount:', userdata)
        // } ) but this should already be in req.session!!
        
    }

    shouldComponentUpdate(nextProps, nextState) {
        // compare props with next props?
        return (this.state.isFave !== nextState.isFave)
    }

    
    render() {

        //console.log('this.props.match is:', this.props.match) // it always prints twice in the console, why?????
        
        console.log('this.props.user from render', this.props.user)
        
        let mystop = this.state.stop
        console.log('mystop in render comign from this.state', mystop)
        console.log('this.state', this.state)
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
                {this.props.isLoggedIn? <button> Likeee (you see this if ur logged in) </button> : <p>you cant like this </p> }

                {/* { (this.state.isFave === null) // after loading favourites we set state as either true or false
                ? <p> still loading favourites </p> */}
                 {(this.state.isFave 
                    ? <button onClick={this.handleLike} style={ {backgroundColor: 'green'} } >is mah fave, unlike?</button>
                    : <button onClick={this.handleLike} style={ {backgroundColor: 'red'} }>not fave, wanna save? </button> )

            }}

            </div>
                
        )
        
    }
}

//export default StopPage
export default withAuth(StopPage) // tried if this changes the fact that StopPage fucks up both login and signup