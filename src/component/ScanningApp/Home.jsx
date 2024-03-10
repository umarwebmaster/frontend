import React from "react";
import { Link } from "react-router-dom";
import { GoBack } from "../GoBack";
import LoginPage from "./LoginPage";


function Home({TableNumber}) {
    
    return (
<>
<h1> Dashboard</h1>
<div id="home">
{/* <LoginPage /> */}
<Link className='home-links' to="/scanning_app/all-orders">View All Orders</Link>
<Link className='home-links' to="/scanning_app/reports">Download Reports</Link>
<Link className='home-links' to="/scanning_app/admin-page">Admin Dashboard</Link>
{/* <Link className='home-links' to="/inventory">View Inventory</Link> */}
{/* <Link className='home-links' to="/Login">Log In</Link> */}
</div>
</>

    )
}


export default Home;