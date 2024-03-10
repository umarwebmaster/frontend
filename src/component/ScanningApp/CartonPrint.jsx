import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductDetail from "../../Static/ProductDetail"
import BackendAPI from "../../Static/BackendAPI";


export default function PrintCarton({ activeOrder, mainDetail }) {
    const [carton, setCarton] = useState()
    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        getCartonDetailFromServer();
    }, [])
    
    const reconcileCategoryWise = orderData.map((a) => {
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
                OrderedQty: a.OrderedQty,
                ScanQty: a.ScanQty,
                RemainingQty: a.RemainingQty
            }
        }
    })
    let totalScanQty = 0
    for (let i = 0; i < orderData.length; i++) {
        const element = orderData[i];
        totalScanQty += element.ScanQty

    }

    //Funtion - fetch carton data 
    async function getCartonDetailFromServer() {

        try {
            const response = await axios.get(`${BackendAPI}/orders/Cartons/${activeOrder}`)
            const res = await axios.get(`${BackendAPI}/orders/Scanning/${activeOrder}`)
            setOrderData(res.data.innerData)
            setCarton(response.data.currentCarton)

        } catch (error) {
            console.log('can`t print carton')
        }

    }

    return (
        <>
            <div id="print-carton">
                <div id="flex-center">
                    <div id="head">
                        <h3>Sapphire Retail Limited</h3>
                        <h5>Transfer Order Dispatch</h5>
                    </div>
                    <div>Carton # {orderData.CartonNum}</div>
                </div>
                <div id="main">
                    <div >Transfer Order: {activeOrder}</div>
                    <div>SRL Master: </div>
                    <div>From Warehouse: </div>
                    <div>To Warehouse: </div>
                    <div>Table Number: </div>
                    <div>Open at: </div>
                    <div>Close at: </div>
                    <div>Carton Status: {!orderData.Closed && 'Open' ||orderData.Closed && 'closed' }</div>
                    <div>Comment: </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th width='5%'>SR.</th>
                            <th width='20%'>SKU</th>
                            <th width='15%'>Product Name</th>
                            <th width='15%'>Line Item</th>
                            <th width='10%'>Unit Price</th>
                            <th width='15%'>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orderData.map((entry, index) => {
                        return (
                        <tr id={entry.SKU}>
                            <td>{index+1}</td>
                            <td>{entry.SKU}</td>
                            <td></td>
                            <td>1</td>
                            <td>1</td>
                            <td>{entry.ScanQty}</td>

                        </tr>
                               );
                            })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td ></td>
                            <td></td>
                            <td ></td>
                            <td ></td>
                            <td >Total</td>
                            <td >{totalScanQty}</td>

                        </tr>
                    </tfoot>
                </table>
            </div>
           
        </>
    )
}