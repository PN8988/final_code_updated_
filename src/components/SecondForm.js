


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './SecondPage.css';

// const SecondForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { propertyType } = location.state || {};

//   const LOCAL_STORAGE_KEY = `subPropertyEntries_${propertyType}`;

//   const [entries, setEntries] = useState(() => {
//     const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
//     return saved ? JSON.parse(saved) : [{ id: 1, subPropertyType: '', status: true, isEditing: true }];
//   });

//   useEffect(() => {
//     if (!propertyType) {
//       navigate('/');
//     }
//   }, [propertyType, navigate]);

//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
//   }, [entries, LOCAL_STORAGE_KEY]);

//   const handleBackForm1=()=>{
//     navigate('./firstform');
//   }
//   const handleAddSubProperty = () => {
//     const newEntry = {
//       id: entries.length + 1,
//       subPropertyType: '',
//       status: true,
//       isEditing: true,
//     };
//     setEntries([...entries, newEntry]);
//   };

//   const handleInputChange = (index, value) => {
//     const updatedEntries = [...entries];
//     updatedEntries[index].subPropertyType = value;
//     setEntries(updatedEntries);
//   };

//   const toggleStatus = (index) => {
//     const updatedEntries = [...entries];
//     updatedEntries[index].status = !updatedEntries[index].status;
//     setEntries(updatedEntries);
//   };

//   const handleEditToggle = (index) => {
//     const updatedEntries = [...entries];
//     updatedEntries[index].isEditing = !updatedEntries[index].isEditing;
//     setEntries(updatedEntries);
//   };

//   const handleSave = (index) => {
//     const updatedEntries = [...entries];
//     updatedEntries[index].isEditing = false;
//     setEntries(updatedEntries);
//   };

//   const handlePropSubTypeUpdate = (entry) => {
//     if (!entry.subPropertyType) return;

//     navigate('/thirdform', {
//       state: {
//         propertyType: propertyType,
//         propertySubtype: entry.subPropertyType,
//       },
//     });
//   };

//   return (
//     <div className="second-form-container">
//       <div className='second-form-wrapper'>
//         <h2 className='second-form-heading'>Add/Edit SubDropDown Master_Form2</h2>
//         <div className="top-right">
//           <button className='btn-back' onClick={handleBackForm1}>Go To Form1</button>
//           <button className="add-button" onClick={handleAddSubProperty}>
//             Add
//           </button>
//         </div>

//         <table className="sub-property-table">
//           <thead>
//             <tr>
//               <th>Sr. No</th>
//               <th>DropDown Type</th>
//               <th>Sub-DropDown Type</th>
//               <th>Actions</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {entries.map((entry, index) => (
//               <tr key={entry.id}>
//                 <td>{index + 1}</td>
//                 <td>{propertyType}</td>
//                 <td>
//                   {entry.isEditing ? (
//                     <input
//                       type="text"
//                       value={entry.subPropertyType}
//                       onChange={(e) => handleInputChange(index, e.target.value)}
//                     />
//                   ) : (
//                     entry.subPropertyType
//                   )}
//                 </td>
//                 <td>
//                   {entry.isEditing ? (
//                     <button
//                       className="save-btn"
//                       onClick={() => handleSave(index)}
//                     >
//                       Save
//                     </button>
//                   ) : (
//                     <button
//                       className="edit-btn"
//                       onClick={() => handleEditToggle(index)}
//                     >
//                       Edit
//                     </button>
//                   )}
//                   <button
//                     className='update-btn'
//                     onClick={() => handlePropSubTypeUpdate(entry)}
//                     disabled={!entry.subPropertyType}
//                   >
//                     Update
//                   </button>
//                 </td>
//                 <td>
//                   <label>
//                     <input
//                       type="checkbox"
//                       checked={entry.status}
//                       onChange={() => toggleStatus(index)}
//                     />
//                     {entry.status ? 'Active' : 'Inactive'}
//                   </label>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SecondForm;




// SecondForm.js
// import React, { useState, useEffect, createContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './SecondPage.css';

// const SecondForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { propertyType } = location.state || {};
//   const {panId}=createContext();
//   const LOCAL_STORAGE_KEY = `subPropertyEntries_${propertyType}`;

//   const [entries, setEntries] = useState(() => {
//     const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
//     return saved
//       ? JSON.parse(saved)
//       : [{ id: 1, subPropertyType: '', status: true, isEditing: true }];
//   });

//   useEffect(() => {
//     if (!propertyType) {
//       navigate('/');
//     }
//   }, [propertyType, navigate]);

//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
//   }, [entries, LOCAL_STORAGE_KEY]);

//   const handleBackForm1 = () => {
//     navigate('/firstform');
//   };

//   const handleNextForm = () => {
//     const firstValidEntry = entries.find((entry) => entry.subPropertyType);
//     if (firstValidEntry) {
//       navigate('/thirdform', {
//         state: {
//           propertyType: propertyType,
//           propertySubtype: firstValidEntry.subPropertyType,
//         },
//       });
//     } else {
//       alert('Please enter at least one Sub Property Type before proceeding.');
//     }
//   };

//   const handleAddSubProperty = () => {
//     const newEntry = {
//       id: entries.length + 1,
//       panId:'',
//       subPropertyType: '',
//       status: true,
//       isEditing: true,
//     };
//     setEntries([...entries, newEntry]);
//   };

//   const handleInputChange = (index, value) => {
//     const updatedEntries = [...entries];
//     updatedEntries[index].subPropertyType = value;
//     setEntries(updatedEntries);
//   };

//   const toggleStatus = (index) => {
//     const updatedEntries = [...entries];
//     updatedEntries[index].status = !updatedEntries[index].status;
//     setEntries(updatedEntries);
//   };

//   const handleEditToggle = (index) => {
//     const updatedEntries = [...entries];
//     updatedEntries[index].isEditing = !updatedEntries[index].isEditing;
//     setEntries(updatedEntries);
//   };

//   const handleSave = (index) => {
//     const updatedEntries = [...entries];
//     updatedEntries[index].isEditing = false;
//     setEntries(updatedEntries);
//   };

//   const handlePropSubTypeUpdate = (entry) => {
//     if (!entry.subPropertyType) return;

//     navigate('/thirdform', {
//       state: {
//         propertyType: propertyType,
//         propertySubtype: entry.subPropertyType,
//       },
//     });
//   };
// const handleRemoveSecondForm = (id) =>{

//   const updatedEntries = entries.filter((entry) => entry.id !== id);
//   setEntries(updatedEntries);
// };


//   return (
//     <div className="second-form-container">
//       <div className="second-form-wrapper">
//         <h2 className="second-form-heading">Add/Edit SubDropdown Master - Form 2</h2>
//         <div className="top-right">
          
//            <button className="add-button" onClick={handleAddSubProperty}>Add</button>
//           <button className="btn-back" onClick={handleBackForm1}>Go to Form-1</button>
//          <button className="btn-next" onClick={handleNextForm}>Go to Form-3</button>
//         </div>
//         <table className="sub-property-table">
//           <thead>
//             <tr>
//               <th>Sr. No</th>
//               <th>PAN Number</th>
//               <th>Dropdown Type</th>
//               <th>Sub-Dropdown Type</th>
//               <th className='col-four'>Actions</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             <td>
              
//             </td>
//             {entries.map((entry, index) => (
//               <tr key={entry.id}>
//                 <td>{index + 1}</td>
//                 <td>{panId}</td>
//                 <td>{propertyType}</td>
//                 <td>
//                   {entry.isEditing ? (
//                     <input
//                       type="text"
//                       value={entry.subPropertyType}
//                       onChange={(e) => handleInputChange(index, e.target.value)}
//                     />
//                   ) : (
//                     entry.subPropertyType
//                   )}
//                 </td>
                
//                 <td>
//                   <div className='btn-group'>
//                   {entry.isEditing ? (
//                     <button className="save-btn" onClick={() => handleSave(index)}>Save</button>
//                   ) : (
//                     <button className="edit-btn" onClick={() => handleEditToggle(index)}>Edit</button>
//                   )}
//                   <button
//                     className="update-btn"
//                     onClick={() => handlePropSubTypeUpdate(entry)}
//                     disabled={!entry.subPropertyType}
//                   >Update
//                   </button>
//                    <button className="remove-btn-1" onClick={() => handleRemoveSecondForm(entry.id)}>Remove</button>
//                     </div>
//                 </td>
             
//                 <td>
//                   <label>
//                     <input
//                       type="checkbox"
//                       checked={entry.status}
//                       onChange={() => toggleStatus(index)}
//                     />
//                     {entry.status ? 'Active' : 'Inactive'}
//                   </label>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//     </div>
//   );
// };

// export default SecondForm;


import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SecondPage.css';
import { AppContext } from '../Client/context/AppContext';


const SecondForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { propertyType } = location.state || {};
  // const { panId } = useContext(AppContext);
  const LOCAL_STORAGE_KEY = `subPropertyEntries_${propertyType}`;

  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [{ id: 1, subPropertyType: '', status: true, isEditing: true }];
  });

  useEffect(() => {
    if (!propertyType) {
      navigate('/');
    }
  }, [propertyType, navigate]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries, LOCAL_STORAGE_KEY]);

  const handleBackForm1 = () => {
    navigate('/property-master');
  };

  const handleNextForm = () => {
    const firstValidEntry = entries.find((entry) => entry.subPropertyType);
    if (firstValidEntry) {
      navigate('/thirdform', {
        state: {
          propertyType: propertyType,
          propertySubtype: firstValidEntry.subPropertyType,
          // panId: panId,
        },
      });
    } else {
      alert('Please enter at least one Sub Property Type before proceeding.');
    }
  };

  const handleAddSubProperty = () => {
    const newEntry = {
      id: entries.length + 1,
      subPropertyType: '',
      status: true,
      isEditing: true,
    };
    setEntries([...entries, newEntry]);
  };

  const handleInputChange = (index, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index].subPropertyType = value;
    setEntries(updatedEntries);
  };

  const toggleStatus = (index) => {
    const updatedEntries = [...entries];
    updatedEntries[index].status = !updatedEntries[index].status;
    setEntries(updatedEntries);
  };

  const handleEditToggle = (index) => {
    const updatedEntries = [...entries];
    updatedEntries[index].isEditing = !updatedEntries[index].isEditing;
    setEntries(updatedEntries);
  };

  const handleSave = (index) => {
    const updatedEntries = [...entries];
    updatedEntries[index].isEditing = false;
    setEntries(updatedEntries);
  };

  const handlePropSubTypeUpdate = (entry) => {
    if (!entry.subPropertyType) return;

    navigate('/thirdform', {
      state: {
        propertyType: propertyType,
        propertySubtype: entry.subPropertyType,
        // panId: panId,
      },
    });
  };

  const handleRemoveSecondForm = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  };

  return (
    <div className="second-form-container">
      <div className="second-form-wrapper">
        <h2 className="second-form-heading">Add/Edit SubDropdown Master - Form 2</h2>
        <div className="top-right">
          <button className="add-button" onClick={handleAddSubProperty}>Add</button>
          <button className="btn-back" onClick={handleBackForm1}>Go to Form-1</button>
          <button className="btn-next" onClick={handleNextForm}>Go to Form-3</button>
        </div>
        <table className="sub-property-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              {/* <th>PAN Number</th> */}
              <th>Dropdown Type</th>
              <th>Sub-Dropdown Type</th>
              <th className='col-four'>Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                {/* <td>{panId}</td> */}
                <td>{propertyType}</td>
                <td>
                  {entry.isEditing ? (
                    <input
                      type="text"
                      value={entry.subPropertyType}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  ) : (
                    entry.subPropertyType
                  )}
                </td>
                <td>
                  <div className='btn-group'>
                    {entry.isEditing ? (
                      <button className="save-btn" onClick={() => handleSave(index)}>Save</button>
                    ) : (
                      <button className="edit-btn" onClick={() => handleEditToggle(index)}>Edit</button>
                    )}
                    <button
                      className="update-btn"
                      onClick={() => handlePropSubTypeUpdate(entry)}
                      disabled={!entry.subPropertyType}
                    >
                      Update
                    </button>
                    <button className="remove-btn-1" onClick={() => handleRemoveSecondForm(entry.id)}>Remove</button>
                  </div>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      checked={entry.status}
                      onChange={() => toggleStatus(index)}
                    />
                    {entry.status ? 'Active' : 'Inactive'}
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecondForm;
