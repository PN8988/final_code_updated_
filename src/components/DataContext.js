// // DataContext.js
// import React, { createContext, useState } from 'react';

// export const DataContext = createContext(
//     {
//         // DataContext.js

//   pan: '',
//   dropdownType: '',
//   subDropdownType: '',
//   propertyDetails: {},
//   // ... other default values
// });

    


// export const DataProvider = ({ children }) => {
//   const [pan, setPan] = useState('');
//   const [dropdownType, setDropdownType] = useState('');
//   const [subDropdownType, setSubDropdownType] = useState('');
//   const [propertyDetails, setPropertyDetails] = useState({});

//   return (
//     <DataContext.Provider
//       value={{
//         pan,
//         setPan,
//         dropdownType,
//         setDropdownType,
//         subDropdownType,
//         setSubDropdownType,
//         propertyDetails,
//         setPropertyDetails,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };
