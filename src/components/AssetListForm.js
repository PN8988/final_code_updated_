// import React, { useEffect, useState } from 'react'

//  const AssetListForm = () => {

//   const [clientPan, setClientPan] = useState('') 
//   const [assetId, setAssetId] = useState('')
//   const [ledgerNameData, setLedgerNameData ] = useState('')
//   const [govtValueData, setGovtValueData] = useState('')
//   const [amountData, setAmountData] = useState('')
  
//   const saveOrUpdateAssets = (e) => {
//     e.preventDefault();

//     const assets = {clientPan, assetId, ledgerNameData, govtValueData, amountData}
//     if(assetId){
//         AssetListService.updateAssets(assetId, assets).then((response) => {
//             history.pushState('/update');
//         }).catch(error =>{
//             console.log(error)

//         })
//     }else{
//         AssetListService.createAssets(assets).then((response) =>{
//             console.log(response.data)
//             history.pushState('/assets');
//         }).catch(error => {
//             console.log(error)
//         })
//     }
//   }
//   useEffect(() =>{
//     AssetListService.getAssetListById(assetId).then((response) =>{
//         setClientPan(response.data.clientPan)
//         setAssetId(response.data.assetId)
//         setLedgerNameData(response.data.ledgerNameData)
//         setGovtValueData(response.data.govtValueData)
//         setAmountData(response.data.amountData)
//     }).catch(error => {
//         console.log(error)
//     })

//   }, [])

//   const title = () =>{
//     if(assetId){
//         return <h2 className='text-center'>Update Assets</h2>

//     }else{
//         return <h2 className='text-center'>Add Assets</h2>

//     }
//   }
//   return (
     
//      <div className='container'>
//         <div className='row'>
//             <div className='card col-md-6 offset-md-3 offset-md-3'>
//                 {
//                     title()
//                 }
//                 <div className='card-body'>
//                     <form>
//                         <div className='form-group mb-2'>
//                             <label className='form-label'>Client PAN:</label>
//                             <input type='text' placeholder='enter client PAN'
//                             name='clientPan' className='form-control' value={clientPan} onChange={(e) => setClientPan(e.target.value)}></input>
//                         </div>
//                          <div className='form-group mb-2'>
//                             <label className='form-label'>Asset ID:</label>
//                             <input type='text' placeholder='Asset ID '
//                             name='assetId' className='form-control' value={assetId} onChange={(e) => setAssetId(e.target.value)}></input>
//                         </div>
//                          <div className='form-group mb-2'>
//                             <label className='form-label'>LedgerName:</label>
//                             <input type='text' placeholder='LedgerName'
//                             name='ledgerNameData' className='form-control' value={ledgerNameData} onChange={(e) => setClientPan(e.target.value)}></input>
//                         </div>
//                          <div className='form-group mb-2'>
//                             <label className='form-label'>Govt Value:</label>
//                             <input type='text' placeholder='Govt Value'
//                             name='govtValueData' className='form-control' value={govtValueData} onChange={(e) => setClientPan(e.target.value)}></input>
//                         </div>
//                          <div className='form-group mb-2'>
//                             <label className='form-label'>Amount:</label>
//                             <input type='text' placeholder='Amount'
//                             name='amountData' className='form-control' value={amountData} onChange={(e) => setClientPan(e.target.value)}></input>
//                         </div>
                        
//                                 <button className = "btn btn-success" onClick = {(e) => saveOrUpdateAssets(e)} >Submit </button>
//                                 <Link to="/update" className="btn btn-danger"> Cancel </Link>

//                     </form>
//                 </div>
//             </div>
//         </div>
//      </div>
   
//   )
// };
// export default AssetListForm;