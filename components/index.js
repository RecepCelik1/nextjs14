"use client"

import React, { useState } from 'react';
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IconContext } from 'react-icons';


export default function NameCheck() {
  const [CompanyName , setCompanyName] = useState("")
  const [dataValue , setDataValue] = useState()
  const [result , setResult] = useState("")

  const handleInputChange = (event) => {
    setCompanyName(event.target.value.toUpperCase())
  }

  
  async function fetchData () {
    
    const ltdRegex = /\bLTD\b|\bLIMITED\b/g;
    const clearedSTR = CompanyName.replace(ltdRegex, '').replace(/\s{2,}/g, ' ').trim();
    const apiUrl = `http://localhost:3000/api/${clearedSTR}`
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('API request failed man');
      }

      let res = await response.json();
      console.log(res)
      res = res.exactMatch
      setDataValue(res)
      
    } catch (error) {
      console.error('Error:', error.message);
    }
    setResult(CompanyName)

    
  }


  return (
    <main className="bg-gray-800 h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">

          <input className='h-8 p-2 rounded-sm' onChange={(e)=> handleInputChange(e)}/>
            <button className={`text-white mt-4 bg-emerald-700 h-8 w-32 rounded-sm
            ${!CompanyName && 'opacity-50 cursor-not-allowed'}`} onClick={fetchData} disabled={!CompanyName}>Check</button>


          {dataValue === false && (
            <IconContext.Provider value={{ color: "#14532d", className: "global-class-name", size: "5em" }}>
              <div className='mt-3 flex'>
                <FaRegCircleCheck />
                <div className='text-white ml-2 mt-1'>CONGRATULATIONS! {result} IS AVAILABLE</div>
              </div>
            </IconContext.Provider>
                                    )}


          {dataValue === true && (
      
            <IconContext.Provider value={{ color: "red", className: "global-class-name", size: "2em" }}>
              <div className='mt-3 flex'>
                <FaRegCircleXmark />
                <div className='text-white ml-2 mt-1'>SORRY! {result} IS NOT AVAILABLE</div>
              </div>
            </IconContext.Provider>
                                    )}


      </div>
    </main>
  );
}