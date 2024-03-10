import React from "react";
import { useState, useEffect, } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom';
import { GoBack } from "../GoBack";
import moment from "moment";
import BackendAPI from "../../Static/BackendAPI";


 function TOMainpage({setActiveOrder, TableNumber}) {
    const  [entries, setEntries] = useState([]);
    const [massages, setMassages] = useState(false)
    const [err, setErr] = useState(null)
    const [searchedOrder, setSearchedOrder] = useState('')
    const [file, setFile] = useState(null);
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(false)
    const [searchOrder, setSearchOrder]= useState(' ')
    const navigate = useNavigate();
    let currentDate = new Date();
    let dateFormat = moment(currentDate).format('YYYYMMDD')
    let lastSevenDay = moment(currentDate.setDate(currentDate.getDate()-7)).format('YYYYMMDD')
    const [filterDate, setFilterDate] = useState(parseInt(dateFormat+lastSevenDay)) 
    let lastMonthDay = moment(currentDate.setDate(currentDate.getDate()-30)).format('YYYYMMDD')
    let lastThreeMonth = moment(currentDate.setDate(currentDate.getDate()-60)).format('YYYYMMDD')
    // shortcut define
    // const firstDate = filterDate.substring(0,8)
    // const lastDate = filterDate.substring(9,17)

    // console.log(firstDate + lastDate)
    // new object for showing main data like Number, totalQty , etc
    //by using arrayreduce method
    let mainData = Object.values(entries.reduce((acc, obj)=>{
        const _OrderNumber = obj.OrderNumber
        const _SRLNumber = obj.SRLNumber
        const _Detail = obj.Detail
        const _TotalQty = obj.OrderedQty
        const _From = obj.From
        const _To = obj.To

        if (!acc[_OrderNumber]) {
            acc[_OrderNumber] = {
                OrderNumber:_OrderNumber,
                SRLNumber:_SRLNumber,
                Detail:_Detail, 
                TotalQTY:_TotalQty,
                CreatedAt:obj.CreatedAt,
                From:_From,
                To:_To,
            }
        } else {
            acc[_OrderNumber].TotalQTY += _TotalQty;
        }
        return acc;
    }, {}))
    function customAlphanumericSort(a, b) {
        // Extract the numeric part from the codes using regular expressions
        const numA = parseInt(a.OrderNumber.match(/\d+/)[0]);
        const numB = parseInt(b.OrderNumber.match(/\d+/)[0]);
      
        // Compare the numeric parts
        if (numB < numA) return -1;
        if (numB > numA) return 1;
      
        // If the numeric parts are equal, compare the full strings
        if (a.OrderNumber < b.OrderNumber) return -1;
        if (a.OrderNumber > b.OrderNumber) return 1;
      
        return 0;
      }
      
      

    let sortedMainData = mainData.sort(customAlphanumericSort)

    //

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        getDataFromServer();
    }, [])


    // gnerating total 
    let TotalQtyOfTO = 0

    for (let i = 0; i < entries.length; i++) {
        const element = entries[i];
        TotalQtyOfTO += element.Qty
        
    }
    

    // funtion does Data import
    const handleImportSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object
        const formData = new FormData();
        formData.append('file', file);

        if (file !== null) {
            // Send a POST request to the server with the CSV file
          await axios.post(`http://172.16.41.29:5000/orders`, formData)
                .then((response) => setResult(response.data))
                .then(()=>getDataFromServer())
                .then(setFile(null))
        }
        getDataFromServer()
        console.log(result)
    };


    // Getting Data from server / Database

    async function getDataFromServer() {
        await axios.get(`${BackendAPI}/orders`)
        .then((setLoading(true)))
        .then ((response)=> setEntries(response.data.alldata.sort()))
        .then(()=>setLoading(false))
        .catch((error)=>{setErr(AxiosError.message)})
    }

    // const DeleteAllEntries = async ()=>{
    //         await axios.delete("${BackendAPI}/OrderPage/DeleteAll")
    // }


    async function deleteEntireRow(OrderNumber, e) {
        try {
            await axios.delete(`${BackendAPI}/orders/deleteTO/${OrderNumber}`)
            await getDataFromServer();
        } catch (error) {
            console.log(error)
        }
       
    }

    //check if object exits or not
    function doesObjectExist(array, key, value) {
        return array.some(obj => obj[key] === value);
      }

    function handleSearchOrder() {    
            

        const checkOrderNumber = doesObjectExist(entries, 'OrderNumber', searchOrder)
        if (checkOrderNumber) {
            setActiveOrder(searchOrder)
            navigate('/all-orders/Scanning'); // Navigate to the new page

        } else {
                setMassages(true)
                
        }

        
    }
    
    async function handleOrderNumberClicked(OrderNumber) {
        navigate('/all-orders/Scanning'); // Navigate to the new page
        setActiveOrder(OrderNumber);
    }

        function CloseError(){
                setMassages(false)
        }

    return (

        <>
        {/* import form */}
            {massages &&  <div id="search-error">
                <div id="error-massage">
                    {searchOrder } <br />Not Found Try Again
                    </div>
                    <button onClick={()=>CloseError()}>close</button>
                </div>}
               

                <h3>Orders</h3>
            <div id="import-file-box">
                <form onSubmit={handleImportSubmit} encType="multipart/form-data">
                <h5>Import new Orders</h5>
                    <input type="file" name="file" accept=".csv" onChange={handleFileChange} />
                    <button type="submit" >Upload</button>
                </form>
                <div className="search-bar">
                    <h5>Search Order Number</h5>
                <input type="text" name="searchOrder" maxLength='9' onChange={(e)=>setSearchOrder(e.target.value)}/>
                <button onClick={()=>{handleSearchOrder()}}>Search</button>
            </div>
            <div id="filter">
                <div><h5>Filter By Date</h5></div>
                <div>
                <button className="filter-button" onClick={()=>setFilterDate(dateFormat+' '+lastMonthDay)}>Last Month</button>
                <button className="filter-button" onClick={()=>setFilterDate(dateFormat+' '+lastThreeMonth)}>Last Three Month</button>
                <button className="filter-button" onClick={()=>setFilterDate()}>All</button>
                </div>
            </div>
            </div>

            
            <section className="Datasection">
                {/* <button id="deleteAll" onClick={()=>DeleteAllEntries()}>Delete All Entries</button> */}

                        <div id="hidden-icons">
                    {loading && <div id="loading-icon"> <span id="loading-bar"></span></div>}
                    </div>
                <table>
                    <thead>
                        <tr>
                            <th width='200rem'>Number</th>
                            <th width='150rem'>SRL Number</th>
                            <th width='130rem'>From</th>
                            <th width='100rem'>To</th>
                            <th width='100rem'>QTY</th>
                            <th width='100rem'>Created Date</th>
                            <th width='500rem'>Detail</th>
                            <th width=''>Progress</th>

                        </tr>
                    </thead>
                    
                    <tbody>
                        {sortedMainData.map((entry) => {
                            
                                return (
                                    <tr  key={entry.OrderNumber} id={entry.OrderNumber}>    
                                    <td className='links' onDoubleClick={(e)=>handleOrderNumberClicked(entry.OrderNumber, e)}>{entry.OrderNumber}</td>
                                    <td>{entry.SRLNumber}</td>
                                    <td>{entry.From}</td>
                                    <td>{entry.To}</td>
                                    <td>{entry.TotalQTY}</td>
                                    <td>{(entry.CreatedAt).toString().slice(0,4)+'-'+(entry.CreatedAt).toString().slice(4,6)+'-'+(entry.CreatedAt).toString().slice(6,8)}</td>
                                    <td>{entry.Detail}</td>
                                    <td>{TableNumber==="Admin" && <button className="deleteEntry" id={entry._id} onClick={(e) => deleteEntireRow(entry.OrderNumber, e)} value='Delete'>Delete</button>}</td>
                                    {/* <button onSubmit={deleteEntry()}>Delete</button> */}
                                </tr>

);
                        })}

                    </tbody>
                    
                    {/* <tfoot>
                        <tr className="grand-total-row">
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{TotalQtyOfTO}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot> */}
                </table>
            </section>
            
        </>
    )
}





export default TOMainpage;