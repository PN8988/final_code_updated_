import React, { useState } from 'react'

 const AcquisitionFormList = ()=> {

const [aquisitionData, setAquisionData]=useState([]);

    
  return (
    <div className ='container'>
<h2 className='text-center'>Agreement Details</h2>
    <table className='table table-bordederd table-striped'>
<thead>
    <th>Aquisition Id</th>
    <th>No Of Owners</th>
    <th>Date</th>
    <th>Agreement Value</th>
    <th>Stamp Duty</th>
    <th>Registration Fees</th>
    <th>Share Percentage</th>
    <th></th>
</thead>
<tbody>
    {
        aquisitionData.map(
           aquisition=>
            <tr key={aquisition.aquisitionId}>
                <td>{aquisition.aquisitionId}</td>
                <td>{aquisition.date}</td>
                <td>{aquisition.agreementValue}</td>
                <td>{aquisition.stampDuty}</td>
                <td>{aquisition.registrationFees}</td>
                <td>{aquisition.sharePercent}</td>
            </tr> 
        )
    }
</tbody>
    </table>

    
    {/* <div>AcquisitionFormList</div> */}
    </div>
  )
}

export default AcquisitionFormList;