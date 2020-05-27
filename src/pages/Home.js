import React from 'react'
import Search from '../components/Search'
import '../App.css';

function Home() {
  return (
    <div class="greeting"> 
      <h1>Welcome, traveller! </h1>
        <Search/>
    </div>
  )
}

export default Home;