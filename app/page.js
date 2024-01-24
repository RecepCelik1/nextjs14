"use client"

import Link from "next/link";
import { useState } from "react";


export default function Home() {
  const [data , setData] = useState()

  const handleInputChange = (event) => {
    const inputData = event.target.value
    setData(inputData)
  }
  
  async function fetchData () {
    let companyData = await fetch('http://localhost:3000/api')
    companyData = await companyData.json()
    console.log("company data is equal to : " , companyData)
  }
  
  return (
    <main className="bg-gray-900 h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <input onChange={(e) => handleInputChange(e) } className="w-48 h-10 p-2"></input>
        <button className="text-white bg-emerald-800 mt-3 p-1 w-32" onClick={fetchData}>check</button>
      </div>


    </main>
  );
}
