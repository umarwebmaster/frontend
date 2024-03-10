import React, {useState , useEffect} from "react";
import moment from "moment";
import axios from "axios";
import BackendAPI from "../../Static/BackendAPI";


function AdminPage (){
const [currentdate, setCurrentDate] = useState(moment(new Date).format('dddd, DD MMMM YYYY HH:mm:ss'))
const [entries, setEntries] = useState()
const [fromDate, setfromDate] = useState(moment(new Date).format('YYYYMMDD'))
const [toDate, settoDate] = useState(moment(new Date).format('YYYYMMDD'))
    
    setInterval(() => {
        setCurrentDate(moment(new Date).format('dddd, DD MMMM YYYY HH:mm:ss'))  
        
    }, 1000);
    
    useEffect(() => {
        FormHandle()
    }, [])
    
    
    async function FormHandle(e) {
        try {
                const response = await axios.get(`${BackendAPI}/reports/carton-summary/${fromDate}/${toDate}`)
                setEntries(response.data.foundData)
          
        } catch (error) {
            console.log(error)
        }
    }

    let newArray = []
    let totalScanQty = 0
    if (entries !== undefined) {
        
        for (let i = 0; i < entries.length; i++) {
            const main = entries[i].CartonData;
            for (let j = 0; j < main.length; j++) {
                const element = main[j].ScanQty;
                totalScanQty += element ;      
            }
        }
    }
    return(
    <>
        <div id="date">{currentdate}</div>
        <div className="center-div">{totalScanQty}</div>
        {/* <div>{entries}</div> */}
        
    </>

    )
}

export default AdminPage;