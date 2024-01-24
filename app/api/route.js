import { NextResponse } from "next/server";

export async function GET () {
    const apiKey = '8dc91acf-5646-4c5d-abef-5524ea035071';
    const companyName = "apple";
    const apiUrlBase = 'https://api.company-information.service.gov.uk/advanced-search/companies';
    const apiUrl = `${apiUrlBase}?company_name_includes=${companyName}`;

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
      const companyNameArray = itemsArray.map(item => item.company_name);
 


    return NextResponse.json({
       companyNameArray,
    })
}
