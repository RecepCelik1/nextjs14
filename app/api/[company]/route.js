import { NextResponse } from "next/server";

export const GET = async (request , {params}) => {

    const {company} = params;
    const apiKey = '8dc91acf-5646-4c5d-abef-5524ea035071';
    let startIndex = 0;
    const pageSize = 500;
    const apiUrlBase = 'https://api.company-information.service.gov.uk/advanced-search/companies';
    let exactMatch = false;

    while(!exactMatch && startIndex <= 9500) {
      let allData = [];
      const apiUrl = `${apiUrlBase}?company_name_includes=${company}&size=${pageSize}&start_index=${startIndex}&company_status=active&company_status=open&company_status=liquidation`;
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Basic ${btoa(apiKey + ':')}`
          }
        });
  
        if (!response.ok) {
          // Handle API request failure
          throw new Error('API request failed');
        }
  
        const data = await response.json();
        const itemsArray = data.items || [];


      exactMatch = itemsArray.some(item => item.company_name === company);

      if (!exactMatch) {
          const companyWithLimited = company + " LIMITED";
          const companyWithLtd = company + " LTD";
          exactMatch = itemsArray.some(item => item.company_name === companyWithLimited) || itemsArray.some(item => item.company_name === companyWithLtd);
      }
       
  
      if (!exactMatch) {
        
        const companyNameArray = itemsArray.map(item => item.company_name); 
        allData = companyNameArray.map(companyName => companyName.replace(/\([^)]*\)/g, '').replace(/\s{2,}/g, ' ').trim());

        let withOutBracket = [];

        withOutBracket = withOutBracket.concat(allData);
    
        exactMatch = withOutBracket.some(item => item === company);

        if(!exactMatch) {
          const companyWithLimited = company + " LIMITED";
          const companyWithLtd = company + " LTD";
          exactMatch = withOutBracket.some(item => item === companyWithLimited) || withOutBracket.some(item => item === companyWithLtd);
        }

    }

    startIndex = pageSize + startIndex
    
    if(startIndex % 500 === 0) {
      startIndex = startIndex - 1
    }

      } catch (error) {
        console.error('API request error:', error.message);
        exactMatch = false
        break;
      } 
    }

    return NextResponse.json({
      exactMatch,
    })
    
  }