
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import { PanNumberContext } from '../src/Client/context/PanNumberContext';
import EditClient from './Client/EditClient';
import ResidentialPropAdd from './components/ResidentialPropAdd';
import ResidentialPropertyTable from './components/ResidentialPropertyTable';
import Sidebar from './components/Sidebar';
// import Toolbar from '@mui/material';
// import Navbar from './components/Navbar';
 import ClientDetailsForm from './components/ClientDetailsForm';
//import ClientManager from './components/ClientManager';
import ClientList from './components/ClientList';
//import { MaterialReactTable } from 'material-react-table';
import { AppProvider } from '../src/Client/context/AppContext';
import EmployeeDetails from './components/EmployeeDetailsForm';
// import SalaryForm from './components/SalaryForm';
import ResidentialPropertyForm from './components/ResidentialPropAdd';
import { ClientProvider } from '../src/Client/context/ClientContext';
import { AppContext } from '../src/Client/context/AppContext';
import PurchaseAndSaleForm from './components/PurchaseAndSaleForm';
// import { clientData } from './components/PropertyTable';
// import { thirdFormData } from './components/PropertyTable';
//import PropertyManager from './components/PropertyManager';
import MasterSecondPage from './components/MFirstPage';
import SecondForm from './components/SecondForm';
import ThirdPage from './components/ThirdPage';
import MFirstPage from './components/MFirstPage';
import MatchedClientsView from './components/MatchedClientsView';
import PropertyTable from './components/PropertyTable';
import { BrowserRouter } from 'react-router-dom';
//import DynamicForm from './components/DynamicForm';
import { ClientContext } from '../src/Client/context/ClientContext';
import ClientMenuForm from './components/ClientMenuForm';
import AquisitionForm from './components/AquisitionForm';
 import EditAcquisitionForm from './components/EditAcquisitionForm';
import PurchaseDetailsForm from './components/PurchaseDetailsForm';
import AssetTab from './components/AssetTab';
import SaleConsiderationForm from './components/SaleConsiderationForm';
import CapitalGainForm from './components/CapitalGainForm';
import SaleDetailsForm from './components/SaleDetailsForm';
import BuyerDetailsForm from './components/BuyerDetailsForm';
import AcquisitionFormList from './components/AcquisitionFormList';
import AssetListForm from './components/AssetListForm';
import DisplayPropertyTable from './components/DisplayPropertyTable';
import DisplayAquisitionTable from './components/DisplayAquisitionTable';
import EmployerMasterForm from './components/EmployerMasterForm';
import EmployeeDetailsForm from './components/EmployeeDetailsForm';
import BankMasterForm from './components/BankMasterForm';
import BankMasterList from './components/BankMasterList';
import EmployerMasterList from './components/EmployerMasterList';
import ClientMenuFormEmployer from './components/ClientMenuFormEmployer';
import EmployerForm from './components/EmployerForm';
import EmployerList from './components/EmployerList';
import BankForm from  "./components/BankForm";
import BankList from './components/BankList';
import DematAccountMasterForm from './components/DematAccountMasterForm';
import DematMasterList from './components/DematMasterList';
import SecurityMasterForm from './components/SecurityMasterForm';
import SecurityFormList from './components/SecurityFormList';
import SecuritiesDepositoryForm from './components/SecuritiesDepositoryForm';
import SecuritiesDepositoryList from './components/SecuritiesDepositoryList';
import SftMasterForm from './components/SftMasterForm';
import SftMasterList from './components/SftMasterList';
import TaxCalendar from './components/TaxCalendar';
import ImportProcessForm from './components/ImportProcessForm';
import TransactionReport from './components/TransactionReport';
import BankImport from './components/BankImport';
import ClientProfile from './components/ClientProfile';
import SalaryForm from './components/SalaryForm';
import EmployerDashboard from './components/EmployerDashBoard';
import RentalIncomeForm from './components/RentalIncomeForm';
import DematForm from './components/DematForm';
import TaxCalendarMasterForm from './components/TaxCalenderMasterForm';
import TaxCalendarDropdown from './components/TaxCalendarDropDown';
import DashboardForm from './components/DashBoardForm';
import TaxCalendarForm from './components/TaxCalendarForm';
import ReportGeneration from './components/ReportGeneration';
import GeneratedReport from './components/GenerateReport';
import MonthlyDashboard from './components/MonthlyDashBoard';
import KycForm from './components/KycForm';
import AdminDashboard from './components/AdminDashBoard';
import Navbar from './components/Navbar';
import DematList from './components/DematList';
import Register from './components/Register';
import KycTablePage from './components/KycTable';
import HomePage from './components/pages/HomePage';
import AdminsDashboard from './components/pages/AdminsDashBoard';
import AdminLogin from './components/pages/AdminLogin';
import Services from './components/pages/Services';
import HeroSection from './components/HeroSection';
import ServicesCarousel from './components/ServicesCarousel';
import Footer from './components/Footer';
import FinancialServices from './components/FinancialServices';
import ForgotPassword from './components/ForgotPassword';
import ContactUs from './components/ContactUs';
import EmployeeList from './components/EmployeeList';
import AssignWork from './components/AssignWork';
import EmployeeMasterForm from './components/EmployeeMasterForm';
import AdminSettings from './components/AdminSettings';
import EmployeeLogin from './components/pages/EmployeeLogin';
import AdminNavbar from './components/pages/AdminNavbar';
import ExcelImportExport from './components/ExcelImportExport';
import StatementEntryForm from './components/StatementEntryForm';
import FinancialYear from './components/FinancialYear';
import ImportForm from './components/ImportForm';
import BankImportLandingPage from './components/BankImportLandingPage';
import BankService from "./service/BankService";
import AddressComponent from './components/AddressComponent';
import DematImportLandingPage from './components/DematImportLandingPage';
import IncomeCredentialsForm from './components/IncomeCredentialsForm';


function App() {

  const [clients, setClients] = useState([]);
  const [panNumber, setPanNumber] = useState([]);
  const handleSave = (newClient) => {
    setClients((prevClients) => [...prevClients, newClient]);
  };
 
  return (


    
     <Router>
      <Navbar /> 
      
      {/* <HomePage /> */}
        
  
  
       
        
       
         
    

             
  <Routes> 
    {/* <Routes>
  <Route path="/services" element={<Services />} />
  <Route path="/services/service-tax" element={<ServiceTaxPage />} />
  <Route path="/services/itr-return" element={<ItrReturnPage />} />
  <Route path="/services/tds" element={<TdsPage />} />
  <Route path="/services/gst" element={<GstPage />} />
</Routes> */}
   

       {/* <Route path='/residential' element={<ResidentialPropertyForm/>}/> */}
       <Route path='/home' element={<HomePage/>} />
       <Route path='/services' element={<Services/>} />
        <Route path="/property-master" element={<MFirstPage />} />
          <Route path="/addresidentialprop" element={<ResidentialPropAdd />} />
        {/* <Route path="/property-table" element={<PropertyTable />} /> */}
<Route path="/bank-master" element={<BankMasterForm />}  />
         <Route path="/sale-details-form" element={<SaleDetailsForm  />} />
       <Route path='/buyer-details' element={<BuyerDetailsForm/>}/>
          {/* <Route path="/propertymanager" element={<PropertyManager/>}/> */}
        {/* <Route path="/property-list" element={<PropertyTable />} /> */}
         <Route path="/secondform" element={<SecondForm />} /> 
        <Route path="/thirdform" element={<ThirdPage/>} />
          <Route path="/client-master" element={<ClientDetailsForm onSave={handleSave} />} />
              <Route path="/acquisition-form" element={< AquisitionForm/>} />
        <Route path="/clientmenusform" element={<ClientMenuForm />} />
            <Route path="/assettab-form" element={<AssetTab />} />
             {/* <Route path="/acquisition-form" element={<AcquisitionForm />} /> */}
             <Route path='/sale-consideration-form' element={<SaleConsiderationForm/>}/>
             <Route path="/purchasedetailsandsale" element={<PurchaseAndSaleForm />} />
             <Route path="/capitalgain-details" element={<CapitalGainForm />} />
        <Route path="/clientlist" element={<ClientList clients={clients} />} /> 
          <Route path="/login" element={<Login/>}/>  
          <Route path="/editacquisition" element={<EditAcquisitionForm />} />
          <Route path='/aquisition' element={<AcquisitionFormList/>}/>
          <Route path="/displayacquisition" element={<DisplayAquisitionTable />} />
<Route path="/edit-aquisition-form" element={<EditAcquisitionForm />} />
<Route path="/matched-clients-view" element={<MatchedClientsView />} />
<Route path='/display-property' element={<DisplayPropertyTable/>}/>
<Route path="/residential-property-form" element={<ResidentialPropertyForm />} />
<Route path="/view-properties" element={<ResidentialPropertyTable />} />
<Route path="/admin/masters/employer"  element={<EmployerMasterForm/>} />
<Route path='/admin/demat-account-master' element={<DematAccountMasterForm/>} />
<Route path='/employerform' element={<EmployerForm/>} />
 <Route path='/employee-details' element={<EmployeeDetails/>}/>
<Route path="/admin/masters/bankmasterlist" element={<BankMasterList />} />
<Route path='/employermasterlist' element={<EmployerMasterList/>} />
<Route path='/employerlist'  element={<EmployerList/>} />
<Route path='/bank-form' element={<BankForm/>} />
<Route path='/bank-list' element={<BankList/>} />
<Route path='/dematmaster-list' element={<DematMasterList/>} />
<Route path="/client-menu-employer" element={<ClientMenuFormEmployer />} />
<Route path='/security-master' element={<SecurityMasterForm/>} />
<Route path="/securitymasterlist"  element={<SecurityFormList/>} />
<Route path="/securitydepository" element={<SecuritiesDepositoryForm/>} />
<Route path="/securitydepositorylist" element={<SecuritiesDepositoryList/>} />
<Route path="/sftmaster-form" element={<SftMasterForm/>} />
<Route path='/sftMasterList' element={<SftMasterList/>} />
<Route path='/tax-calendar'   element={<TaxCalendar/>} />
<Route path="/import-process-form" element={<ImportProcessForm/>} />
<Route path='/transaction-form' element={<TransactionReport/>}/>
<Route path="/bank-Import" element={<BankImport/>} />
<Route path='/view-client-profile' element={<ClientProfile/>} />
<Route path='/salary-form' element={<SalaryForm/>} />
<Route path='/employer-dashboard' element={<EmployerDashboard/>} />
<Route path='/rental-income' element={<RentalIncomeForm/>} />
<Route path='/demat-form' element={<DematForm/>} />
<Route path='/taxcalendermaster-form' element={<TaxCalendarMasterForm/>} />
<Route path='/taxcalenderdropdown-form' element={<TaxCalendarDropdown/>} />
<Route path='/dashboard-form' element={<DashboardForm/>} />
<Route path='/tax-year-form' element={<TaxCalendarForm/>} />
<Route path="/reports" element={<ReportGeneration/>} />
<Route path="/admin/generated-reports" element={<GeneratedReport />} />
<Route path="/monthly-form" element={<MonthlyDashboard/>}/>
<Route path="/update-kyc" element={<KycForm/>}/>
<Route path='/admin-dashboard' element={<AdminDashboard/>} />
<Route path="/demat-list"  element={<DematList/>} />
<Route path="/register" element={<Register/>} />
<Route path="/kyc-table" element={<KycTablePage/>} />
<Route path="/admins-dashboard" element={<AdminsDashboard/>} />
<Route path="/admin-login" element={<AdminLogin/>} />
<Route path="/hero-section" element={<HeroSection/>} />
<Route path="/service-carsousel" element={<ServicesCarousel/>} />
<Route path="/footer" element={<Footer/>} />
<Route path="/financial-service" element={<FinancialServices/>} />
<Route path='/forgot-password' element={<ForgotPassword/>} />
<Route path='/contact-us' element={<ContactUs/>} />
<Route path='/employee-master' element={<EmployeeMasterForm/>}/>
<Route path='/employee-list' element={<EmployeeList/>} />
<Route path='/assign-work' element={<AssignWork/>}/>
<Route path='/admin/settings' element={<AdminSettings/>}/>
<Route path='/employee/login' element={<EmployeeLogin/>}/>
<Route path="/excelimportexport" element={<ExcelImportExport/>} />
<Route path="/statement-entry" element={<StatementEntryForm />} />
<Route path="/financial-year" element={<FinancialYear />} />
<Route path="/import-form" element={<ImportForm />} />
<Route path="/bankimport-form" element={<BankImportLandingPage />} />
<Route path="/bankimport" element={<BankImport />} />
<Route path="/update-address" element={<AddressComponent />} />
<Route path="/dematimport-form"  element={<DematImportLandingPage/>} />
<Route path="/incomecredential-form"  element={<IncomeCredentialsForm/>} />

{/* <Route path="/asset-list" element={<AssetListForm/>} /> */}
         
    </ Routes>   
     </Router>
  );
}

export default App;

