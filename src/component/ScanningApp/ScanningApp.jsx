import { useState } from 'react';
import Home from './Home';
import TOMainpage from './TOMainpage';
import ActiveTOPage from './ActiveTOPage';
import ScanningPage from './ScanningPage';
import Reports from "./Reports";
import NoPage from './NoPage';
import ScanningReport from './ScanningReport';
import CartonReport from './CartonReport';
import PrintCarton from "./CartonPrint";
import ComparisonReport from "./ComparisonReport";
import AdminPage from './AdminPage';
import {Routes, Route } from "react-router-dom";
import GoBack  from './GoBack';


function ScanningApp() {
    const [activeOrder, setActiveOrder] = useState('please select Order ')
    const [TotalQty, setTotalQty] = useState(0)
    const [ScanQty, setScanQty] = useState(0)
    const [ProductDetail, setProductDetail] = useState()
    const [TableNumber, setTableNumber] = useState(false)
    const Tables = [
      {name : "Admin",password:"sapphire@warehouse",},
      {name : "Dispatch T-1",password:"Dispatch@1",},
      {name : "Dispatch T-2",password:"Dispatch@2",},
      {name : "Dispatch T-3",password:"Dispatch@3",},
      {name : "Dispatch T-4",password:"Dispatch@4",},
      {name : "Dispatch T-5",password:"Dispatch@5",},
      {name : "Dispatch T-6",password:"Dispatch@6",},
      {name : "Dispatch T-7",password:"Dispatch@7",},
      {name : "Dispatch T-8",password:"Dispatch@8",},
      {name : "Dispatch T-9",password:"Dispatch@9",},
      {name : "Dispatch T-10",password:"Dispatch@10",},
      {name : "Dispatch T-11",password:"Dispatch@11",},
      {name : "Dispatch T-12",password:"Dispatch@12",},
     
  
    ]
  
    function adminPageNavigate() {
      setTableNumber('Admin');
  
    }
  
    return (
      <>
        <div className='project-name'>Welcome to <span>Scanning App</span> </div>
        
      {TableNumber ===false &&
      <div className='TableNum-div'> 
        Please Select Your Table Number
        {
          Tables.map(obj=>(
        <div className='TableNum' onClick={(e) => setTableNumber(obj.name)}>
          {obj.name}
        </div>
  
          ))
  
        }
        </div>
        
        }
        <div className='navbar'><GoBack /><div>{TableNumber}</div></div>
        {TableNumber !==false && <Routes>
              <Route path='/Login' element />
              <Route path='/' element={<Home TableNumber={TableNumber}/>} />
              <Route path='/all-orders' element={<TOMainpage setActiveOrder={setActiveOrder} TableNumber={TableNumber}/>} />
              <Route path='/all-orders/Scanning' element={<ActiveTOPage activeOrder={activeOrder} setTotalQty={setTotalQty} setScanQty={setScanQty}  TableNumber={TableNumber} />} />
              <Route path='/all-orders/StartScanning' element={<ScanningPage activeOrder={activeOrder} TotalQty={TotalQty} ScanQty={ScanQty} TableNumber={TableNumber} />} />
              <Route path='/reports' element={<Reports />} />
              <Route path='/reports/scanning' element={<ScanningReport />} />
              <Route path='/reports/carton' element={<CartonReport />} />
              {/* <Route path='/all-orders/carton-detail' element={<CartonDetailPage activeOrder={activeOrder}/>} /> */}
             {/* <Route path='/all-orders/comparison-report' element={<ComparisonReport activeOrder={activeOrder}/>} /> */}
              <Route path='/admin-page' element={<AdminPage/>} />
  </Routes>
        } 
  
      </>
    );
  }
  
  export default ScanningApp;
  