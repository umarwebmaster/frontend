import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import moment from "moment";
import BackendAPI from "../../Static/BackendAPI";



export default function ScanningReport() {
    const [fromDate, setfromDate] = useState()
    const [toDate, settoDate] = useState()
    const [scandata, setScandata] = useState([])

    const createCSVContent = (data) => {
        const header = 'TO Number' + ',' + 'SKU' + ',' + 'TO Qty' + ',' + 'Scan Qty' + ',' + 'Scan Date' + ','+ 'To Store';
        const rows = data.map(obj => obj.OrderNumber + ',' + obj.SKU + ',' + obj.OrderedQty + ',' + obj.ScanQty + ',' + moment(obj.StartAt.toString().slice(0,8)).format('DD-MMM-YYYY')+','+ obj.To +','+obj.Detail );
        return header + '\n' + rows.join('\n');
    };


    const navigate = useNavigate()

    async function FormHandle(e) {
        e.preventDefault()
        try {
            const response = await axios.get(`${BackendAPI}/reports/scanning/${fromDate}/${toDate}`)

            setScandata(response.data.foundData)
        } catch (error) {

        }
    }
    const handleDownload = () => {
        const csvContent = createCSVContent(scandata);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ScanningReport.csv';
        link.click();
        URL.revokeObjectURL(url);
    };


    return (
        <>
            <form className="report-form" onSubmit={(e) => FormHandle(e)}>
                From Date : <input type="date" placeholder="19900101" onChange={(e) => setfromDate(moment(e.target.value).format('YYYYMMDD'))} />
                To Date : <input type="date" placeholder="19900101" onChange={(e) => settoDate(moment(e.target.value).format('YYYYMMDD'))} />
                <button onClick={handleDownload}>Download CSV</button>
            </form>

        </>
    )
}
