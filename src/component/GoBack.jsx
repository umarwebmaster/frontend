import React , {useState, useEffect} from "react";
import { useNavigate } from "react-router";



export function GoBack () {

    const navigate = useNavigate();

    function handleScanningForm() {
        navigate(-1);
        
    }
    return (
    <>   
     <button onClick={()=>handleScanningForm()}>Go Back</button>
</>
    )
}
