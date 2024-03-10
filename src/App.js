import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoApp from './component/Todo_App/TodoApp'
import ScanningApp from './component/ScanningApp/ScanningApp';
import Home from './component/Home'


function App() {
  const [activeOrder, setActiveOrder] = useState('please select Order ')
  const [TotalQty, setTotalQty] = useState(0)
  const [ScanQty, setScanQty] = useState(0)
  const [ProductDetail, setProductDetail] = useState()
  const [TableNumber, setTableNumber] = useState(false)

  

  function adminPageNavigate() {
    setTableNumber('Admin');

  }
 

  return (
    <>     
     
        <Router>
          <Routes>
            
            <Route path='/' element={<Home />}></Route>
            <Route path='/todo_app' element={< TodoApp />} />
            <Route path='/scanning_app//*'  element={<ScanningApp />}/>

            
          </Routes>
        </Router>
        </> 

  );
}

export default App;
