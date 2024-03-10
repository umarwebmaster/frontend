import axios from "axios";
import React from "react";
import { useNavigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState, useEffect, } from "react";
import { GoBack } from "../GoBack";
import ProductDetail from "../../Static/ProductDetail"
import ScanningPage from "./ScanningPage";
import moment from 'moment'
import BackendAPI from "../../Static/BackendAPI";


function ActiveTOPage({ activeOrder ,setTotalQty,setScanQty, TableNumber}) {
    const [massages, setMassages] = useState('')
    const [massageData, setMassageData]= useState('')
    const [innerData, setInnerdata] = useState([])
    const [entries, setEntries] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [lastPosition, setLastPosition] = useState(0)
    const [loading, setLoading] = useState(false)
    const dated = moment(new Date()).format('YYYYMMDDhhmmss')
    const navigate = useNavigate();

    
    useEffect(() => {
        redirectBack();
        getDataFromServer();

    }, [])

    useEffect(() => {
        getActiveOrderDetail();
    }, [])
    let totalOrderedQty = 0
    let totalScanQty = 0

    for (let i = 0; i < innerData.length; i++) {
        const element = innerData[i];
        totalOrderedQty += element.OrderedQty
        totalScanQty += element.ScanQty

    }
    const redirectBack = async () => {

        if (activeOrder === 'please select Order ') {
            navigate('/all-orders')
        }
    }

    setScanQty(totalScanQty)
    setTotalQty(totalOrderedQty)
    // comparing arrays of objects
    const reconcileCategoryWise = innerData.map((a) => {
        let matchingSKU = ProductDetail.find((b) => b.ItemCode === a.SKU.substring(0, 12));
        if (matchingSKU) {
            return {
                SKU: a.SKU,
                ProductName: matchingSKU.ProductName,
                LineItem: matchingSKU.LineItem,
                Price: matchingSKU.ProductPrice,
                OrderedQty: a.OrderedQty,
                ScanQty: a.ScanQty,
                RemainingQty: a.RemainingQty,
            }
        } else {
            return {
                SKU: a.SKU,
                ProductName: null,
                LineItem: null,
                Price: null,
                OrderedQty: a.OrderedQty,
                ScanQty: a.ScanQty,
                RemainingQty: a.RemainingQty
            }
        }
    })

    async function getDataFromServer() {

        try {
            const response = await axios.get(`${BackendAPI}/orders`)
            setEntries(response.data.alldata)
        } catch (error) {
            console.log(error)
        }

    }

    async function getActiveOrderDetail() {
        try {

            setLoading(true)
            
            const response = await axios.get(`${BackendAPI}/orders/Scanning/${activeOrder}`)
            setInnerdata(response.data.innerData)
            setLoading(false)
        } catch (error) {
            console.log(error)
            
        }
    }

async function StartScanning() {
    let data = {activeOrder:activeOrder,OpenAt:dated, TableNumber:TableNumber};

        if(activeOrder.length === 9){
            if(innerData.length !==0){
                navigate('/all-orders/StartScanning')
                const response = await axios.post(`${BackendAPI}/orders/Scanning/newCarton`,data)                 
            }
            
        }
        else {
            setMassages(true)
            setMassageData('TO Number Invalid.')

        }
    }
  
    function CloseError(){
        setMassages(false)
    }
     function redirectPage(a) {
                    navigate(`/all-orders/${a}`)
            }

    return (
        <> 
            {massages &&  <div id="error">
                <div id="error-massage">
                    <br />{massageData}
                    </div>
                    <button onClick={()=>CloseError()}>close</button>
                </div>}
                <button onClick={()=>StartScanning()} id='start-scanning-btn' className="to-page-btn">Start Scanning</button>
                
                <button onClick={()=>redirectPage('carton-detail')} id='carton-detail-btn' className="to-page-btn">Show All Cartons</button>
                <button onClick={()=>redirectPage('comparison-report')} id='carton-detail-btn' className="to-page-btn">Comparison Report</button>

            <h1>{activeOrder}</h1>
            <section className="Datasection">
                {/* <button id="deleteAll" onClick={()=>DeleteAllEntries()}>Delete All Entries</button> */}

                {loading && <div id="loading-icon"> <span id="loading-bar"></span></div>}
                <table>
                    <thead>
                        <tr>
                            <th width='200rem'>SKU</th>
                            <th width='130rem'>Product Name</th>
                            <th width='150rem'>Line Item</th>
                            <th width='100rem'>Unit Price</th>
                            <th width='100rem'>Order Qty</th>
                            <th width='100rem'>Scan Qty</th>
                            <th width='100rem'>Remaining</th>

                        </tr>
                    </thead>
                    <tbody>
                        {reconcileCategoryWise.map((entry, index) => {

                            return (
                                <tr key={index} id={entry.SKU}>
                                    <td>{entry.SKU}</td>
                                    <td>{entry.ProductName}</td>
                                    <td>{entry.LineItem}</td>
                                    <td>{entry.Price}</td>
                                    <td>{entry.OrderedQty}</td>
                                    <td>{entry.ScanQty}</td>
                                    <td>{entry.OrderedQty - entry.ScanQty}</td>


                                    {/* <button onSubmit={deleteEntry()}>Delete</button> */}
                                </tr>

                            );
                        })}

                    </tbody>

                    <tfoot>
                        <tr className="grand-total-row">
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{totalOrderedQty}</td>
                            <td>{totalScanQty}</td>
                            <td>{totalOrderedQty - totalScanQty}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </>
    )

}

export default ActiveTOPage;