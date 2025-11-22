
// import React, { useState } from 'react';
// import './Sidebar.css';
// import {
//   AppBar,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Divider,
//   Box,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AccountTreeIcon from '@mui/icons-material/AccountTree';
// import PersonIcon from '@mui/icons-material/Person';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
// import SecurityIcon from '@mui/icons-material/Security';
// import StorageIcon from '@mui/icons-material/Storage';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import Navbar from './Navbar';
// import MFirstPage from './MFirstPage';

// const Sidebar = () => {
//   const [showMasters, setShowMasters] = useState(false);
//   const navigate = useNavigate();

//   const handleMastersClick = () => {
//     setShowMasters((prev) => !prev);
//   };
// const handleAddClientMaster =()=>{
//   navigate('./clientdetails');
// }
//   const handleAddMasterClick = () => {
//     navigate('/firstform');
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Navbar />
//       </AppBar>

//       <Drawer
//         variant="permanent"
//         className="sidebar"
//         classes={{ paper: 'sidebar-paper' }}
//       >
//         <Toolbar />
//         <Divider />
//         <List>
          
//             <ListItemButton className="sidebar-item" onClick={handleAddClientMaster}>
//                 <ListItemIcon> <PersonIcon />
//                   </ListItemIcon>
//                 <ListItemText primary="Client Master" />
//               </ListItemButton>
            
//             <ListItemButton>
//             <ListItemIcon>
//               <DashboardIcon />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItemButton>

//           <ListItemButton className="sidebar-item" onClick={handleMastersClick}>
//             <ListItemIcon>
//               <AccountTreeIcon />
//             </ListItemIcon>
//             <ListItemText primary="Masters" />
//           </ListItemButton>

//           {showMasters && (
//             <div className="submenu">
//               <ListItemButton className="sidebar-subitem">
//                 <ListItemIcon><PersonIcon /></ListItemIcon>
//                 <ListItemText primary="Employee Master" />
//               </ListItemButton>

//               <ListItemButton className="sidebar-subitem">
//                 <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
//                 <ListItemText primary="Tax-Year Master" />
//               </ListItemButton>

//               <ListItemButton className="sidebar-subitem">
//                 <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
//                 <ListItemText primary="Bank Master" />
//               </ListItemButton>

//               <ListItemButton className="sidebar-subitem">
//                 <ListItemIcon><CurrencyBitcoinIcon /></ListItemIcon>
//                 <ListItemText primary="Virtual Asset Master" />
//               </ListItemButton>

//               <ListItemButton className="sidebar-subitem">
//                 <ListItemIcon><SecurityIcon /></ListItemIcon>
//                 <ListItemText primary="Security Master" />
//               </ListItemButton>

//               <ListItemButton className="sidebar-subitem">
//                 <ListItemIcon><StorageIcon /></ListItemIcon>
//                 <ListItemText primary="Demat Account Master" />
//               </ListItemButton>

//               <ListItemButton className="sidebar-subitem" onClick={handleAddMasterClick}>
//                 <ListItemIcon><AddBoxIcon /></ListItemIcon>
//                 <ListItemText primary="Add Property Master" />
//               </ListItemButton>
//             </div>
//           )}
//         </List>
//       </Drawer>
//     </Box>
//   );
// };

// export default Sidebar;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

// MUI Components
import {
  AppBar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
} from '@mui/material';

// MUI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import AddBoxIcon from '@mui/icons-material/AddBox';

// Custom components
import Navbar from './Navbar';
import MFirstPage from './MFirstPage';

const Sidebar = () => {
  const [showMasters, setShowMasters] = useState(false);
  const navigate = useNavigate();

  const handleMastersClick = () => {
    setShowMasters((prev) => !prev);
  };

  const handleAddClientMaster = () => {
    navigate('/client-master');
  };

  const handleAddMasterClick = () => {
    navigate('/property-master');
  };

  const handleEmployerFormClick = () => {
    navigate('/employer-form'); // Link to EmployerForm page
  };
  
const handleBankMasterClick = () => {
  navigate('/bank-master');
};

const handleDematAccountMasterClick = () => {
  navigate('/demat-account-master'); // route where your DematAccountMasterForm is mounted
};

const handleSecurityMasterClick = () =>{
   navigate("/security-master");
};

const handleTaxYearMaster = () =>{
  navigate("/tax-calendar");
}

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        {/* <Navbar /> */}
      </AppBar>

      <Drawer
        variant="permanent"
        className="sidebar"
        classes={{ paper: 'sidebar-paper' }}
      >
        <Toolbar />
        <Divider />
        <List>
          {/* <ListItemButton className="sidebar-item" onClick={handleAddClientMaster}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Client Master" />
          </ListItemButton> */}

          <ListItemButton   className='sidebar-item'  onClick={handleMastersClick}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          {/* <ListItemButton className="sidebar-item" onClick={handleMastersClick}>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="Masters" />
          </ListItemButton> */}

          {showMasters && (
            <div className="submenu">
              <ListItemButton className="sidebar-subitem" onClick={handleEmployerFormClick}>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Employer Master" />
              </ListItemButton>

              <ListItemButton className="sidebar-subitem"  onClick={handleTaxYearMaster}>
                <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
                <ListItemText primary="Tax-Year Master" />
              </ListItemButton>

              <ListItemButton className="sidebar-subitem" onClick={handleBankMasterClick}>
  <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
  <ListItemText primary="Bank Master" />
</ListItemButton>


              <ListItemButton className="sidebar-subitem">
                <ListItemIcon><CurrencyBitcoinIcon /></ListItemIcon>
                <ListItemText primary="Virtual Asset Master" />
              </ListItemButton>

              <ListItemButton className="sidebar-subitem" onClick={handleSecurityMasterClick}>
                <ListItemIcon><SecurityIcon /></ListItemIcon>
                <ListItemText primary="Securities Master" />
              </ListItemButton>

             <ListItemButton className="sidebar-subitem" onClick={handleDematAccountMasterClick}>

  <ListItemIcon><StorageIcon /></ListItemIcon>
  <ListItemText primary="Demat Account Master" />
</ListItemButton>

              <ListItemButton className="sidebar-subitem" onClick={handleAddMasterClick}>
                <ListItemIcon><AddBoxIcon /></ListItemIcon>
                <ListItemText primary="Add Property Master" />
              </ListItemButton>
            </div>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
