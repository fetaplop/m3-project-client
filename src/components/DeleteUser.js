import React from 'react'
import userService from "../lib/user-service"
import { Redirect } from 'react-router-dom';

// not using this! moved deletion to Auth.js

export default function DeleteUser() {

    const deleteMe = () => {
        return userService.delete()
        .then( deleted => {
            console.log('deleted user, hopefully');
            //<Redirect to="/login" />
        } )
    }
// else if (!isLoggedIn) return <Redirect to="/login" />
    return (
        <div>
            <button onClick={deleteMe}> Click here to confirm deleting user profile </button>
        </div>
    )
}
// one way to do it:
// 1. import AUth (our own stuff) and Redirect (react stuff)
// 2. make this an auth consumer
// 3. render: if this.props.isLoggedIn === false -> redirect to login
// 4. else (our user does not exist but is still logged in): display delete button 
// 5. insede deleteME(), after deleteing inside then() call authService.me
// 6. if authsevrivce.me gives us new props, we should jump back to part 3. ??