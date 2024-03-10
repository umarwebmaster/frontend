import React , {useState, useEffect} from "react";
import { useNavigate } from "react-router";



export default function GoBack () {

    const navigate = useNavigate();

    function handleScanningForm() {
        navigate(-1);
        
    }
    return (
    <>   
     <button className="go-back" onClick={()=>handleScanningForm()}> Go Back</button>
</>
    )
}
