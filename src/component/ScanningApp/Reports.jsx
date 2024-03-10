import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";


export default function Reports() {

    const navigate = useNavigate()


    return (
        <>

            <h1> Reports </h1>
            <div id="home">
                {/* <LoginPage /> */}
                <Link className='home-links report-links' to="/scanning_app/reports/carton">Carton Wise Report</Link>
                <Link className='home-links report-links' to="/scanning_app/reports/scanning">Scanning Report</Link>
                {/* <Link className='home-links' to="/inventory">View Inventory</Link> */}
                {/* <Link className='home-links' to="/Login">Log In</Link> */}
            </div>
        </>
    )
}