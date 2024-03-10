import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import BackendAPI from "../../Static/BackendAPI";
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from "react-router";



export default function ComparisonReport({activeOrder}) {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [show, setShow] =useState(false)

    const printComponent = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        getActiveOrderDetail()
        redirectBack()
    }, [])
    
    const generatePdf = useReactToPrint({
        content: () => printComponent.current,
        documentTitle: 'newcarton',
    })

    const redirectBack = async () => {

        if (activeOrder === 'please select Order ') {
            navigate('/all-orders')
        }
    }
    function customAlphanumericSort(a, b) {
        // Extract the numeric part from the codes using regular expressions
        const numA = parseInt(a.SKU.match(/\d+/)[0]);
        const numB = parseInt(b.SKU.match(/\d+/)[0]);

        // Compare the numeric parts
        if (numB < numA) return -1;
        if (numB > numA) return 1;

        // If the numeric parts are equal, compare the full strings
        if (a.SKU < b.SKU) return -1;
        if (a.SKU > b.SKU) return 1;

        return 0;
    }
    async function getActiveOrderDetail() {
        try {

            setLoading(true)
            
            const response = await axios.get(`${BackendAPI}/orders/Scanning/${activeOrder}`)
            setData(response.data.innerData)

            setLoading(false)
            setShow(true)
        } catch (error) {
            console.log(error)
            
        }
    }
    let sortedData = data.sort(customAlphanumericSort)
    let filterData = sortedData.filter(obj => obj.OrderedQty-obj.ScanQty !==0)


  async function print() {
        try {
            generatePdf();
        } catch (error) {
            
        }
        // await axios.get(`${BackendAPI}/orders/Scanning/closeCarton`)

    }

    return (
        <>
            {filterData.length!==0 &&< button onClick={()=>print()} id="Print-btn" >Print report</button>}
            <section className="Datasection height-limit-none overflow-unset" ref={printComponent}>
                <h4>Comparison Report: {activeOrder}</h4>
               {show ===true && <h4>Store Name: {filterData[0].To}</h4>}
                {/* <h4>store name: {data[0].To}</h4> */}
                <div id="hidden-icons">
                    {loading && <div id="loading-icon"> <span id="loading-bar"></span></div>}
                </div>
                    {filterData.length===0 && <h1 id="empty-section">Nothing to show here</h1>}
                <table id="comparison-table">
                    <thead>
                        <tr>
                            <th width='1%'>Sr.#</th>
                            <th width='50%'>SKU </th>
                            <th width='5%'>Remaining QTY</th>

                        </tr>
                    </thead>

                    <tbody>
                        {filterData.map((entry, index) => {

                            return (
                                <tr key={entry._id} id={entry._id}>
                                    <td>{index+1}.</td>
                                    <td>{entry.SKU}</td>
                                    <td>{entry.OrderedQty-entry.ScanQty}</td>
                                </tr>

                            );
                        })}

                    </tbody>
                </table>
            </section>
        </>
    )
}