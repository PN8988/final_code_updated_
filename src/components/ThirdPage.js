// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ResidentialPropAdd from './ResidentialPropAdd';

// import './ThirdPage.css';

// const ThirdPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { propertyType, propertySubtype } = location.state || {};
//   const [showResidentialPropAdd, setShowResidentialPropAdd] = useState(false);

//   const [assetItems, setAssetItems] = useState(() => {
//     const savedItems = localStorage.getItem(`assetItems_${propertyType}_${propertySubtype}`);
//     return savedItems
//       ? JSON.parse(savedItems)
//       : [{ id: 1, assetItem: '', status: true, isEditing: true }];
//   });

//     useEffect(() => {
//     localStorage.setItem(
//       `assetItems_${propertyType}_${propertySubtype}`,
//       JSON.stringify(assetItems)
//     );
//   }, [assetItems, propertyType, propertySubtype]);

//   const handleAssetInputChange = (id, value) => {
//     setAssetItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, assetItem: value } : item
//       )
//     );
//   };

//   const handleAssetEditToggle = (id) => {
//     setAssetItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, isEditing: !item.isEditing } : item
//       )
//     );
//   };

//   const handleUpdateClick = () => {
//   setShowResidentialPropAdd(true);
// };


//   const toggleAssetStatus = (id) => {
//     setAssetItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, status: !item.status } : item
//       )
//     );
//   };

//   // const handleAddAssetItem = () => {
//   //   const newItem = {
//   //     id: assetItems.length + 1,
//   //     assetItem: '',
//   //     status: true,
//   //     isEditing: true,
//   //   };
//   //   setAssetItems((prevItems) => [...prevItems, newItem]);
//   // };

//   const navigateToFirstForm = () => {
//     navigate('/firstform');
//   };

//   const navigateToSecondForm = () => {
//     navigate('/secondform', { state: { propertyType } });
//   };

//   return (
//     <div className="container">
//       <h2>Third Form</h2>
//       <div className="top-right">
//         <button className="nav-first-button" onClick={navigateToFirstForm}>
//           Go to Form-1
//         </button>
//         <button className="nav-second-button" onClick={navigateToSecondForm}>
//           Go to Form-2
//         </button>
        
       
//       </div>
//       <table className="third-form-table">
//         <thead>
//           <tr>
//             <th>Sr. No</th>
//             <th>Dropdown Type</th>
//             <th>SubDropdown Subtype</th>
//             {/* <th>Asset Item</th> */}
//             <th>Actions</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {assetItems.map((item, index) => (
//             <tr key={item.id}>
//               <td>{index + 1}</td>
//               <td>{propertyType || ''}</td>
//               <td>{propertySubtype || ''}</td>
//               {/* <td>
//                 {item.isEditing ? (
//                   <input
//                     type="text"
//                     value={item.assetItem}
//                     onChange={(e) =>
//                       handleAssetInputChange(item.id, e.target.value)
//                     }
//                   />
//                 ) : (
//                   item.assetItem
//                 )}
//               </td> */}
//               <td>
//                 <button onClick={() => handleAssetEditToggle(item.id)}>
//                   {item.isEditing ? 'Save' : 'Edit'}
//                 </button>
//                  <button onClick={handleUpdateClick}>Update</button>
//               </td>
             

//               <td>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={item.status}
//                     onChange={() => toggleAssetStatus(item.id)}
//                   />
//                   {item.status ? 'Active' : 'Inactive'}
//                 </label>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//        {showResidentialPropAdd && <ResidentialPropAdd />}
//     </div>
    
//   );
// };

// export default ThirdPage;



// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ResidentialPropAdd from './ResidentialPropAdd';
// import './ThirdPage.css';

// const ThirdPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { propertyType, propertySubtype } = location.state || {};
//   const [showResidentialPropAdd, setShowResidentialPropAdd] = useState(false);

//   const [assetItems, setAssetItems] = useState(() => {
//     const savedItems = localStorage.getItem(`assetItems_${propertyType}_${propertySubtype}`);
//     return savedItems
//       ? JSON.parse(savedItems)
//       : [{ id: 1, assetItem: '', status: true, isEditing: true }];
//   });

//   useEffect(() => {
//     localStorage.setItem(
//       `assetItems_${propertyType}_${propertySubtype}`,
//       JSON.stringify(assetItems)
//     );
//   }, [assetItems, propertyType, propertySubtype]);

//   const handleAssetInputChange = (id, value) => {
//     setAssetItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, assetItem: value } : item
//       )
//     );
//   };

//   const handleAssetEditToggle = (id) => {
//     setAssetItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, isEditing: !item.isEditing } : item
//       )
//     );
//   };

//   const handleUpdateClick = () => {
//     setShowResidentialPropAdd(true);
//   };

//   const toggleAssetStatus = (id) => {
//     setAssetItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, status: !item.status } : item
//       )
//     );
//   };

//   const navigateToFirstForm = () => {
//     navigate('/firstform');
//   };

//   const navigateToSecondForm = () => {
//     navigate('/secondform', { state: { propertyType } });
//   };

//   return (
//     <div className="container">
//       {showResidentialPropAdd ? (
//         <ResidentialPropAdd />
//       ) : (
//         <>
//           <h2>Third Form</h2>
//           <div className="top-right">
//             <button className="nav-first-button" onClick={navigateToFirstForm}>
//               Go to Form-1
//             </button>
//             <button className="nav-second-button" onClick={navigateToSecondForm}>
//               Go to Form-2
//             </button>
//           </div>
//           <table className="third-form-table">
//             <thead>
//               <tr>
//                 <th>Sr. No</th>
//                 <th>Dropdown Type</th>
//                 <th>SubDropdown Subtype</th>
//                 <th>Actions</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assetItems.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{index + 1}</td>
//                   <td>{propertyType || ''}</td>
//                   <td>{propertySubtype || ''}</td>
//                   <td>
//                     <button onClick={() => handleAssetEditToggle(item.id)}>
//                       {item.isEditing ? 'Save' : 'Edit'}
//                     </button>
//                     <button onClick={handleUpdateClick}>Update_ChildName</button>
//                   </td>
//                   <td>
//                     <label>
//                       <input
//                         type="checkbox"
//                         checked={item.status}
//                         onChange={() => toggleAssetStatus(item.id)}
//                       />
//                       {item.status ? 'Active' : 'Inactive'}
//                     </label>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// export default ThirdPage;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResidentialPropAdd from './ResidentialPropAdd';
import './ThirdPage.css';

const ThirdPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { propertyType, propertySubtype, panId } = location.state || {};

  const [showResidentialPropAdd, setShowResidentialPropAdd] = useState(false);

  const [assetItems, setAssetItems] = useState(() => {
    const savedItems = localStorage.getItem(`assetItems_${propertyType}_${propertySubtype}`);
    return savedItems
      ? JSON.parse(savedItems)
      : [{ id: 1, assetItem: '', status: true, isEditing: true }];
  });

  useEffect(() => {
    localStorage.setItem(
      `assetItems_${propertyType}_${propertySubtype}`,
      JSON.stringify(assetItems)
    );
  }, [assetItems, propertyType, propertySubtype]);

  const handleAssetInputChange = (id, value) => {
    setAssetItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, assetItem: value } : item
      )
    );
  };

  const handleAssetEditToggle = (id) => {
    setAssetItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const handleUpdateClick = () => {
    setShowResidentialPropAdd(true);
  };

  const toggleAssetStatus = (id) => {
    setAssetItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const navigateToFirstForm = () => {
    navigate('/property-master');
  };

  const navigateToSecondForm = () => {
    navigate('/secondform', {
      state: { propertyType, panId }  // keep panId while navigating back
    });
  };

  return (
    <div className="container">
      {showResidentialPropAdd ? (
        <ResidentialPropAdd
          // panId={panId}
          propertyType={propertyType}
          propertySubtype={propertySubtype}
        />
      ) : (
        <>
          <h2>Third Form</h2>
          <div className="top-right">
            <button className="nav-first-button" onClick={navigateToFirstForm}>
              Go to Form-1
            </button>
            <button className="nav-second-button" onClick={navigateToSecondForm}>
              Go to Form-2
            </button>
          </div>
          <table className="third-form-table">
            <thead>
              <tr>
                <th>Sr. No</th>
                {/* <th>PAN Number</th> */}
                <th>Dropdown Type</th>
                <th>SubDropdown Subtype</th>
                <th>Actions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assetItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  {/* <td>{panId || ''}</td> */}
                  <td>{propertyType || ''}</td>
                  <td>{propertySubtype || ''}</td>
                  <td>
                    <button onClick={() => handleAssetEditToggle(item.id)}>
                      {item.isEditing ? 'Save' : 'Edit'}
                    </button>
                    <button onClick={handleUpdateClick}>Update</button>
                  </td>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        checked={item.status}
                        onChange={() => toggleAssetStatus(item.id)}
                      />
                      {item.status ? 'Active' : 'Inactive'}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ThirdPage;
