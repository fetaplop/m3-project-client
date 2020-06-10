# m3-project-client
<br>

# Oulu Bus Stops

## Description

This is an app that provides all the bus stops within Oulu region. A user can search for bus stops by name and save stops as their favourites if they're logged in. 

Note: there have been some changes to bus stops in Linnanmaa area after seeding the app's database (last seeded in late May 2020) so the data is not 100% up-to-date. I will probably reseed after taking some steps to start using live stop monitoring data.

## Instructions

You need to clone, do npm install and run both the server and client to run this app in dev mode. To see how the app works, check the link at the bottom of this readme to find a link to the deployed version instead! Please note that since the platform (Heroku) is free of charge, it might take a little while for the server to wake up and there is nothing I can do about it.

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

<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions                | Behavior                                                      |
| ------------------------- | -------------------- | -------------------------- | ------------------------------------------------------------- |
| `/home`                   | HomePage             | public `<Route>`           | Home page, where any user can search for bus stops            |
| `/home/:stopID`           | StopPage             | public `<Route>`           | Shows specific bus stop info with fave-btn for user only      |
| `/signup`                 | SignupPage           | anon only `<AnonRoute>`    | Signup form, link to login, navigate to login after signup    |
| `/login`                  | LoginPage            | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login  |
| `/favourites`             | MyPage               | user only `<PrivateRoute>` | Displays list of saved stops                                  |



## Components

- LoginPage

- SignupPage

- HomePage

- Search

- (Results??)

- StopLink

- StopPage

- MyFavourites

- Navbar

 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Stop Service
  - stop.getAll()
  - stop.getOne(id)
  - stop.save(id)
  - stop.unsave(id)

- User Service

  - user.favourites()
  - user.delete()

<br>

# Server / Backend

## Models

User model


```javascript
{
  username: {type: String, required: true},
  password: {type: String, required: true},
  favStops: [{type: mongoose.Schema.Types.ObjectId, ref: "Stop"}]
}
```

Stop model // this is early dev version, updated one on server repo

```javascript
 {
    name: {type: String, required: true},
    stopId: {type: Number, required: true},
    stopCode: {type: String, required: true},
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    busLines: [{type: Number}]
 }
```


<br>


## API Endpoints (backend routes)


| HTTP Method | URL                         | Request Body              | Success status | Error Status | Description                        |
| ----------- | --------------------------- | --------------------------| -------------- | ------------ | ---------------------------------- |
| GET         | `/auth/user `               | Saved session             | 200            | 404          | Check if user is logged in         |
| POST        | `/auth/signup`              | {username, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`               | {username, password}      | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`              | (empty)                   | 204            | 400          | Logs out the user                    |
| GET         | `/stops`                    |                           | 200            | 400          | Get all stops from DB                |
| GET         | `/stops/:id`                | {id}                      | 200            | 400          | Show specific bus stop               |
| POST        | `/stops/:id/favourite`      | {id}                      | 200            | 400          | Add stop to user favourites array    |
| POST        | `/stops/:id/unfavourite`    | {id}                      | 200            | 400          | Delete stop from user favourites     |
| GET         | `/user/favourites`          |                           | 200            | 400          | Show user's favourite bus stops      |
| DELETE      | `/user/delete`              |                           | 201            | 400          | Delete user                          |

<br>


## Links

<!-- ### Trello

[Link to trello board](https://trello.com/b/OGpErkbe/m3-project)  -->

Check here my server repo or find the deployed version in Heroku!

### Git

[Server repository](https://github.com/fetaplop/m3-project-server)

### Heroku

[Deployed App](https://oulu-bus-stops.herokuapp.com/)

<!-- ### Slides

Presesentation would be here

[Slides Link](http://slides.com) -->
