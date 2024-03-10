import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import BackendAPI from "../../Static/BackendAPI";
import moment from "moment";




export default function CartonReport() {
    const [fromDate, setfromDate] = useState()
    const [toDate, settoDate] = useState()
    const [scandata, setScandata] = useState([])
    const [bodyData, setBodyData] = useState('')
    const [headerData, setHeaderData] = useState('')
   const [reportType, setReportType] = useState('0')
   const [alert, setAlert] = useState('')

    
    const createCSVContent = (data) => {
            const header = 'TO Number' +',' + 'Table Number' +','+ 'Caton Number' + ',' + 'Qty' + ',' + 'Carton Status';
            const rows = data.map(obj =>  obj.OrderNumber + ','+ obj.TableNumber+ ','+ obj.CartonNum + ','+ getTotal(obj.CartonData)+','+ checkStatus(obj.Closed) )
            return header + '\n' + rows.join('\n');
        
      };
      
      function checkStatus(status) {
            if (!status) {
                return 'Open'
            }
            else if (status) {
                return 'Closed'
            }
      }

function getTotal (array){
    let total =0
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        total +=element.ScanQty
    }
    return total
}
// function iterateEachCarton(array) {
//     array.forEach((orderData) => {
//         orderData.CartonData.forEach((item) => {
//           formattedData.push({
//             CartonNum: orderData.Order,
//             SKU: item.SKU,
//             Scan: item.Scan,
//           });
//         });
//       });
// }

function allProperties() {
    
}

    const navigate = useNavigate()

    async function FormHandle(e) {
        e.preventDefault()
        try {
            if(reportType==="1"){
                const response = await axios.get(`${BackendAPI}/reports/carton-detail/${fromDate}/${toDate}`)
                setBodyData(response.data.bodyData)
                setHeaderData(response.data.headerData)

                // handleDownloadCartonDetail() 
                

            }
         else if (reportType==="2") {
             const response = await axios.get(`${BackendAPI}/reports/carton-summary/${fromDate}/${toDate}`)
             setBodyData(response.data.bodyData)
             setHeaderData(response.data.headerData)
             
        }  
       else {
            setAlert('Please select report type')
       }
          
        } catch (error) {
            console.log(error)
        }
    }
    

    const handleDownloadCartonDetail = () => {
        const csvContent = createCSVContent(scandata);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Carton Wise Report.csv`;
        link.click();
        URL.revokeObjectURL(url);
      };
     
      console.log(reportType)


      function CloseError(){
        setAlert('')
    }
    return (
        <>
            {/* <button onClick={() => navigate('/scanning_app/reports')}>Go Back</button> */}
            <form className="report-form" onSubmit={(e) =>  FormHandle(e) }>
                {alert !=='' && <div id="error">
                <div id="error-massage">
                    <br />{alert}
                    </div>
                    <button onClick={()=>CloseError()}>close</button>
                </div>}
               <select name="" onChange={(e)=>setReportType(e.target.value)} id="report-select">
                <option value="0">--- Select ---</option>
                <option value="1">Carton Detail Report</option>
                <option value="2">Carton Summary Report</option>

               </select>
                From Date : <input type="date" placeholder="19900101" onChange={(e) => setfromDate(moment(e.target.value).format('YYYYMMDD'))}/>
                To Date : <input type="date" placeholder="19900101" onChange={(e) => settoDate(moment(e.target.value).format('YYYYMMDD'))}/>
                <button type="submit">Export</button>
            </form>
            <table style={{padding:0.5 + 'rem'}}>
            {headerData &&
                <thead dangerouslySetInnerHTML={{__html: headerData}}/>
            }
            {bodyData &&
                <tbody dangerouslySetInnerHTML={{__html: bodyData}}/>
            }
            </table>
        </>
    )
}
