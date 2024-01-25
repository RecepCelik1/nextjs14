import { NextResponse } from "next/server";

export const GET = async (request , {params}) => {

    const {company} = params;
    const apiKey = '8dc91acf-5646-4c5d-abef-5524ea035071';
    const startIndex = 0;
    const pageSize = 5000;
    //let allData = [];
    let exactMatch = false;
    const apiUrlBase = 'https://api.company-information.service.gov.uk/advanced-search/companies';

    const apiUrl = `${apiUrlBase}?company_name_includes=${company}&size=${pageSize}&company_status=active&company_status=open&company_status=liquidation&start_index=${startIndex}`;
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
       // const companyNameArray = itemsArray.map(item => item.company_name);
       // allData = allData.concat(companyNameArray); 

        exactMatch = itemsArray.some(item => item.company_name === company);

      if (!exactMatch) {
          const companyWithLimited = company + " LIMITED";
          exactMatch = itemsArray.some(item => item.company_name === companyWithLimited);
      }
       
      if (!exactMatch) {
        const companyWithLtd = company + " LTD";
        exactMatch = itemsArray.some(item => item.company_name === companyWithLtd);
      }  

      if (!exactMatch) {
        const companyWithLtd = company + " (UK) LIMITED";
        exactMatch = itemsArray.some(item => item.company_name === companyWithLtd);
      }  

      if (!exactMatch) {
        const companyWithLtd = company + " (UK) LTD";
        exactMatch = itemsArray.some(item => item.company_name === companyWithLtd);
      }  

      } catch (error) {
        console.error('API request error:', error.message);
        exactMatch = false
      } 


    return NextResponse.json({
      exactMatch,
    })
    
}