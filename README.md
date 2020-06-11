# m3-project-client
<br>

# Oulu Bus Stops

## Description

This is an app that provides all the bus stops within Oulu region. A user can search for bus stops by name and save stops as their favourites if they're logged in. 

Note: there have been some changes to bus stops in Linnanmaa area after seeding the app's database (last seeded in late May 2020) so the data is not 100% up-to-date. I will probably reseed after taking some steps to start using live stop monitoring data.

## Instructions

There is no easy way to run this app since you need to clone both the server (which has its own repo, check the links at the bottom) and the client and then you would need to seed the database. To see how the app works, go to the [deployed version](https://oulu-bus-stops.herokuapp.com/) instead! Please note that since the platform (Heroku) is free of charge, it might take a little while for the server to wake up.

If you are still determined to run this on your machine, go to the server repo and start with those instructions. Now these are for the client end:

- Make sure you did the steps listed in the server repo and then follow these
- Clone the client repository
- run `npm install`
- create a new file on root level and name it ```.env```
- paste inside the following and save it:
```REACT_APP_API_URL=http://localhost:5666```
- run `npm run start`
- Now the app should run in local and open in your browser. If not for some reason, open chrome and type in the url `localhost:3000` and hit enter

## How to use the app once it's running (in Heroku or locally)

- On the landing page, type text in the search bar to search for bus stops. Try "Yliopisto" for example.
- Once you see the results appear, you can click on them to see the bus stop page.
- Go to "Signup" to create a user profile.
- Go to "Login" and log in with your credentials
- After logging in, you land on your page. Here you can find your favourite bus stops if you have any. Click "My page" in the nav bar to navigate here later
- To add new favourites, go to "Search for stops", find a stop and click on it to see its page
- On the bus stop page, now you can click the favourite button to add the stop to your favourites. You can also unfavourite it.
- On My Page, you will see your added stops. Click "Delete user" if you want to delete your profile or "Logout" to log out of your profile

## User Stories

-  **Home:** As an anon/user I can search for bus stops by name
-  **Signup:** As an anon I can can sign up as a user so that I will be able to save my favourite bus stops
-  **Login:** As a user I can log in
-  **Logout:** As a user I can log out
-  **Favourite bus stops** As a user I can save bus stops to my favourites and also unfavourite them
-  **View saved bus stops** As a user I can look at all my favourite stops

## Backlog

- Reseed DB after recent changes to Linnanmaa but stops!
- Tap into SIRI stop monitoring data:
	- Request bus stop information by stop ID using correct GTFS and SIRI formats
	- Receive data back 
	- Convert data to a format compatible with my database
- Filter relevant data: buses servicing this stop and their respective arrival times
- Display received data continuously on the bus stop page
- Dark theme (as default)
- Confirm if user really wants to delete their account to avoid accidents
- Display error messages in frontend too for bad login/signup requests !
- Bug fix for refreshing stop page
- Write installation instructions

<br>


# Client / Frontend

## React Router Routes (React App) (note-to-self check these)
| Path                      | Component            | Permissions                | Behavior                                                      |
| ------------------------- | -------------------- | -------------------------- | ------------------------------------------------------------- |
| `/`                       | Home                 | public `<Route>`           | Home page, where any user can search for bus stops            |
| `/stops/:stopID`          | StopPage             | public `<Route>`           | Shows specific bus stop info with fave-btn for user only      |
| `/signup`                 | Signup               | anon only `<AnonRoute>`    | Signup form, link to login, redirect to my page after signup  |
| `/login`                  | Login                | anon only `<AnonRoute>`    | Login form, redirect to my page after login                   |
| `/private`                | Private              | user only `<PrivateRoute>` | Displays list of saved stops                                  |


## File structure

Where to find the most important React components or services

### src/pages

- Home.js

- Login.js

- Private.js

- Signup.js

- StopPage.js

### src/components

- Search.js

- NavbarComp.js

- PrivateRoute.js

- PublicRoute.js


### src/lib

These services are responsible for all the calls to the backend using axios. Auth.js is a HOC (higher-order component) that provides authentication state to all the components that need to know it (the consumers) and it is using auth service to do that.

- Authentication HOC in Auth.js
  - withAuth(WrappedComponent)

- Auth Service in auth-service.js
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Stop Service in stop-service.js
  - stop.getAll()
  - stop.getOne(id)
  - stop.save(id)
  - stop.unsave(id)

- User Service in user-service.js
  - user.favourites()
  - user.delete()

<br>


## Links

<!-- ### Trello

[Link to trello board](https://trello.com/b/OGpErkbe/m3-project)  -->

Check here my [server repo on GitHub](https://github.com/fetaplop/m3-project-server) or find the [deployed version in Heroku](https://oulu-bus-stops.herokuapp.com/)


<!-- ### Slides

Presesentation would be here

[Slides Link](http://slides.com) -->
