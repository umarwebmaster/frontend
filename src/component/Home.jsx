import React from "react";
import {Link} from "react-router-dom"

function Home(){

    //apps_routes array for routing
  const apps_routes = ['/scanning_app','/todo_app']

    return (
        <div>
            <div>

    <h1>My Projects</h1>
  </div>
  {
    apps_routes.map(ele=>(
        <a href={ele}> {ele} </a>
    ))
      
  }
        </div>
    )
}

export default Home;