import React, { useState, useEffect } from 'react';
import "./style.css";
import { FaListOl } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { BsDatabaseFillX } from "react-icons/bs";




export default function TodoApp() {

    const [array, setArray]= useState([]);
    const [taskDesc, setTaskDesc] = useState('')


        let task = {
            id:(array.length+1),
            desc:taskDesc
        }


    useEffect(() => {
        getItems()
        
    }, [])
    
    let db = 0
    
    function getItems(){
        db = JSON.parse(localStorage.getItem('db'))
       
        if(db===null){
        setArray([...array])
            
        }else{
            setArray(db)

        }
        console.log(db)
    }


     function addItem() {
     let newArray = setArray([...array, task])

     console.log(array)
     localStorage.setItem('db',JSON.stringify(array))
    }
    
    function deleteTask(e) {
        let id = parseInt(e.target.id)
        let filter = array.filter((ele,index)=>ele.id!==id)
        console.log(filter)
        console.log(array)

       localStorage.setItem('db',JSON.stringify(filter))
       db = JSON.parse(localStorage.getItem('db'))

       if(db===null){
        setArray([...array])
            
        }else{
            setArray(db)

        }
       }

       // clear local storage
    //    localStorage.removeItem('db')

    return (
        <>
            <div className="to-do">
                <div className='main'>
                    <div className="header"><FaListAlt /><h2>To Do List</h2></div>
                    <div className="writer"><i><FaPen /></i><input type="text" name="" id="" placeholder='Add your task here ...' onChange={(e)=>{setTaskDesc(e.target.value)}}/><button onClick={()=>{addItem()}}>Add</button></div>
                    <div className="body">
                        {
                           array.length===0 ? <div className='empty-body'><span><BsDatabaseFillX />        No Data Found ... <br /></span></div> : <ol>
                            {   
                                array.map((ele,index)=>(
                                    <li key={index}>{ele.desc} <button id={ele.id} onClick={(e)=>{deleteTask(e)}}>DEL</button></li>
                                ))
                            }

                            </ol>
                        }
                    </div>

                </div>

            </div>

        </>
    )

}
