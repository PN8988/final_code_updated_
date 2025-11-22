
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './MFirstPage.css';

// const MFirstPage = () => {
  
//   const [entries, setEntries] = useState([
//     { id: 1, propertyType: '', status: true, isEditing: true },
//   ]);
//   const navigate = useNavigate();

//   const handleAddProperty = () => {
//     const newEntry = {
//       id: entries.length + 1,
//       propertyType: '',
//       status: true,
//       isEditing: true,
//     };
//     setEntries([...entries, newEntry]);
//   };

//   const handleInputChange = (index, value) => {
//     const updatedEntries = [...entries];
//     updatedEntries[index].propertyType = value;
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

//  const handleUpdate = (entry) => {
//    if (!entry.propertyType) return;
//   navigate('/secondform', { state: { propertyType: entry.propertyType } });
// };


//   return (
//     <div className="master-container">
//       <div className="form-wrapper">
//         <h2 className="mfirst-heading">Add/Edit Dropdown Type Master</h2>
//         <div className="top-right">
//           <button className="add-button" onClick={handleAddProperty}>
//             Add
//           </button>
//         </div>
//         <table className="master-property-table">
//           <thead>
//             <tr>
//               <th>Sr. No</th>
//               <th>Dropdown Type</th>
//               <th>Actions</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {entries.map((entry, index) => (
//               <tr key={entry.id}>
//                 <td>{index + 1}</td>
//                 <td>
//                   {entry.isEditing ? (
//                     <input
//                       type="text"
//                       value={entry.propertyType}
//                       onChange={(e) => handleInputChange(index, e.target.value)}
//                     />
//                   ) : (
//                     entry.propertyType
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
                  
//                  <button
//                      className="update-btn"
//                        onClick={() => handleUpdate(entry)}
//                        disabled={!entry.propertyType}
//                    >
//                   Update
//                  </button>

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

// export default MFirstPage;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './MFirstPage.css';
// import SecondForm from './SecondForm';

// const LOCAL_STORAGE_KEY = 'dropdownEntries';

// const MFirstPage = () => {
//   const navigate = useNavigate();

//   // Initialize state from localStorage
//   const [entries, setEntries] = useState(() => {
//     const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY);
//     return storedEntries
//       ? JSON.parse(storedEntries)
//       : [{ id: 1, propertyType: '', status: true, isEditing: true }];
//   });

//   // Update localStorage whenever entries change
//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
//   }, [entries]);

// const handleBack = ()=>{
//   navigate('./sidebar');
// }

// const handleNextForm = () =>{
//   navigate('./secondform');
// }
//   const handleAddProperty = () => {
//     const newEntry = {
//       id: Date.now(), // Using timestamp for unique ID
//       propertyType: '',
//       status: true,
//       isEditing: true,
//     };
//     setEntries([...entries, newEntry]);
//   };

//   const handleInputChange = (index, value) => {
//     const updatedEntries = entries.map((entry, i) =>
//       i === index ? { ...entry, propertyType: value } : entry
//     );
//     setEntries(updatedEntries);
//   };

//   const toggleStatus = (index) => {
//     const updatedEntries = entries.map((entry, i) =>
//       i === index ? { ...entry, status: !entry.status } : entry
//     );
//     setEntries(updatedEntries);
//   };

//   const handleEditToggle = (index) => {
//     const updatedEntries = entries.map((entry, i) =>
//       i === index ? { ...entry, isEditing: !entry.isEditing } : entry
//     );
//     setEntries(updatedEntries);
//   };

//   const handleSave = (index) => {
//     const updatedEntries = entries.map((entry, i) =>
//       i === index ? { ...entry, isEditing: false } : entry
//     );
//     setEntries(updatedEntries);
//   };

//   const handleUpdate = (entry) => {
//     if (!entry.propertyType) return;
//     navigate('/secondform', { state: { propertyType: entry.propertyType } });
//   };

//   return (
//     <div className="master-container">
//       <div className="form-wrapper">
//         <h2 className="mfirst-heading">Add/Edit Dropdown Master_Form1</h2>
//         <div className="top-right">
//           <button className='btn' onClick={handleBack}>Back</button>
//           <button className="add-button" onClick={handleAddProperty}>
//             Add
//           </button>
//           <button className='btn-next' onClick={handleNextForm} element={< SecondForm />}  >Go to Form-2</button>
//         </div>
//         <table className="master-property-table">
//           <thead>
//             <tr>
//               <th>Sr. No</th>
//               <th>Dropdown Type</th>
//               <th>Actions</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {entries.map((entry, index) => (
//               <tr key={entry.id}>
//                 <td>{index + 1}</td>
//                 <td>
//                   {entry.isEditing ? (
//                     <input
//                       type="text"
//                       value={entry.propertyType}
//                       onChange={(e) => handleInputChange(index, e.target.value)}
//                     />
//                   ) : (
//                     entry.propertyType
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
//                     className="update-btn"
//                     onClick={() => handleUpdate(entry)}
//                     disabled={!entry.propertyType}
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

// export default MFirstPage;







import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './MFirstPage.css';
import { AppContext } from '../Client/context/AppContext';

const LOCAL_STORAGE_KEY = 'dropdownEntries';

const MFirstPage = () => {
  const navigate = useNavigate();
  const { panId } = useContext(AppContext);

  const [entries, setEntries] = useState(() => {
    const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedEntries
      ? JSON.parse(storedEntries)
      : [{ id: 1, propertyType: '', status: true, isEditing: true }];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleBack = () => {
    navigate('/');
  };

 const handleNextForm = () => {
  const firstValidEntry = entries.find((entry) => entry.propertyType);
  if (firstValidEntry) {
    navigate('/secondform', {
      state: {
        propertyType: firstValidEntry.propertyType,
        panId: panId,
      },
    });
  } else {
    alert('Please enter at least one Property Type before proceeding.');
  }
};

const handleNextForm3 = () => {
  const firstValidEntry = entries.find((entry) => entry.propertyType);
  if (firstValidEntry) {
    navigate('/thirdform', {
      state: {
        propertyType: firstValidEntry.propertyType,
        propertySubtype: '',
        panId: panId,
      },
    });
  } else {
    alert('Please enter at least one Property Type before proceeding.');
  }
};

  const handleAddProperty = () => {
    const newEntry = {
      id: Date.now(),
      propertyType: '',
      status: true,
      isEditing: true,
    };
    setEntries([...entries, newEntry]);
  };

  const handleInputChange = (index, value) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, propertyType: value } : entry
    );
    setEntries(updatedEntries);
  };

  const toggleStatus = (index) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, status: !entry.status } : entry
    );
    setEntries(updatedEntries);
  };

  const handleEditToggle = (index) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, isEditing: !entry.isEditing } : entry
    );
    setEntries(updatedEntries);
  };

  const handleSave = (index) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, isEditing: false } : entry
    );
    setEntries(updatedEntries);
  };

  const handleUpdate = (entry) => {
    if (!entry.propertyType) return;
    navigate('/secondform', { state: { propertyType: entry.propertyType } });
  };

  const handleRemove = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  };

  return (
    <div className="master-container">
      <div className="form-wrapper">
        <h2 className="mfirst-heading">Add/Edit Dropdown Master - Form 1</h2>
        <div className="top-right">
          <button className="btn" onClick={handleBack}>Back</button>
          <button className="add-button" onClick={handleAddProperty}>Add</button>
          <button className="btn-next" onClick={handleNextForm}>Go to Form-2</button>
          <button className="btn-next3" onClick={handleNextForm3}>Go to Form-3</button>
        </div>
        <table className="master-property-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              {/* <th>PAN Number</th> */}
              <th>Dropdown Type_GrandFather</th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                {/* <td>
                  <input
                    type="text"
                    name="panId"
                    value={panId}
                    readOnly
                  />
                </td> */}
                <td>
                  {entry.isEditing ? (
                    <input
                      type="text"
                      value={entry.propertyType}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  ) : (
                    entry.propertyType
                  )}
                </td>
                <td>
                  {entry.isEditing ? (
                    <button className="save-btn" onClick={() => handleSave(index)}>Save</button>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEditToggle(index)}>Edit</button>
                  )}
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(entry)}
                    disabled={!entry.propertyType}
                  >
                    Update
                  </button>
                  <button className="remove-btn" onClick={() => handleRemove(entry.id)}>
                    Remove
                    </button>
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

export default MFirstPage;
