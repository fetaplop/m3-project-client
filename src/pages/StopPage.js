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

    handleLike() {
        // send POST to server to add this stop to user faves
        // use state: is it fave ? yes -> unsave in server : no -> save in server 
        

    }

    // auth and user, should they be combined?
    //user service should post save/unsave a stop. it should get what current favourites are? obviously delete user.
    // can I save stuff from both user and auth to state? maybe it's good to have user favStops array in the (provider) state?
    // what the hell is the relationship between Auth.js and auth-service?

    // the BIG QUESTION: how to make my stop only render after I got the data from my server??
    componentDidMount() {
        const {id} = this.props.match.params
        console.log('id from componentDidMount:', id)

        if (this.props.isLoggedIn === true) {
            console.log('this.props.user.favStops', this.props.user.favStops)

            userService.favourites()
            .then(userFavourites => {
                console.log('userFavourites', userFavourites)
                // if (userFavourites.includes(id)) return this.setState({isFave: true})
                // else {
                //     console.log('this stop is not user favourite')
                // }
                console.log('do i see this clo?')
                userFavourites.forEach(favstop => { // look for the stop in user's favourite stops
                    console.log("the type of " + favstop._id + " is: " + typeof(favstop._id))
                    console.log('the id from componentdid mountis this? ', id)
                    if (favstop._id === id) {
                        console.log('we found a match')
                        this.setState({isFave: true})
                    }
                    else {
                        console.log('not a match')
                        this.setState({isFave: false})

                    }
                // if (favstop._id === id) {
                    //     return this.setState({isFave: true}) // if it was there, set this page state to isFave true
                    // }
                    // else {
                    //     return this.setState({isFave: false}) 
                    //     // wait but now we render the page as many times as the user has fave stops THIS IS NOT OPTIMAL
                    // }
                })

                // if (this id is in user favourties) {setState usFave true}
                // else {setsate isFave false}
            })
        }

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

        console.log('this.props.user', this.props.user)
         
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
                {this.props.isLoggedIn? <button> Likeee </button> : <p>you cant like this </p> }

                {this.state.isFave === null
                ? <p> still loading favourites </p>
                : (this.state.isFave? <p> is mah fave </p> : <p>not fave </p> )

            }

            </div>
                
        )
        
    }
}

//export default StopPage
export default withAuth(StopPage) // tried if this changes the fact that StopPage fucks up both login and signup