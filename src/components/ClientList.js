
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { AppContext } from '../Client/context/AppContext';
// import ClientMenuForm from './ClientMenuForm';
// import './ClientList.css';

// function ClientList() {
// // Example inside ClientList.jsx




// const handleViewProfile = (client) => {
//   navigate("/view-client-profile", { state: { client } }); // 👈 must pass like this
// };


//   const navigate = useNavigate();
//   const [clients, setClients] = useState([]);

//   const { setPanId } = useContext(AppContext);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [clientStatus, setClientStatus] = useState(() =>
//     clients.reduce((acc, client) => {
//       acc[client.id] = client.status;
//       return acc;
//     }, {})
//   );
  

//   // const handleSelectClient = (client) => {
//   //   setPanId(client.panId);
//   //   navigate('/firstform');
//   // };

//  const handleUpdateInv = (client) => {
//   navigate('/clientmenusform', {
//     state: {
//       client,
//       panId: client.panId, // explicitly passed
//     }
//   });
// };


//   const clientsPerPage = 10;

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleReset = () => {
//     setSearchTerm('');
//     setCurrentPage(1);
//   };
// const handleEdit = (client) => {
//   navigate('/client-master', { state: { clientToEdit: client } });
// };
// const handleDeleteClient = async (clientId) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this client?");
//   if (!confirmDelete) return;

//   try {
//     await axios.delete(`http://localhost:8080/api/clients/delete/${clientId}`);
//     setClients((prev) => prev.filter((client) => client.id !== clientId));
//   } catch (error) {
//     console.error("Error deleting client:", error);
//   }
// };


// const handleStatusChange = async (panId, newStatus) => {
//   try {
//     const response = await axios.put(
//       `http://localhost:8080/api/clients/updatestatus/${panId}`,
//       { status: newStatus }
//     );

//     setClients((prevClients) =>
//       prevClients.map((c) =>
//         c.panId === panId ? { ...c, status: response.data.status } : c
//       )
//     );
//   } catch (error) {
//     console.error("Error updating client status:", error);
//   }
// };


// const location = useLocation();

// useEffect(() => {
//   axios.get("http://localhost:8080/api/clients/getall")
//     .then(response => {
//       const updatedClients = location.state?.newClient
//         ? [location.state.newClient, ...response.data.filter(c => c.id !== location.state.newClient.id)]
//         : response.data;

//       setClients(updatedClients);
//       setClientStatus(updatedClients.reduce((acc, client) => {
//         acc[client.id] = client.status;
//         return acc;
//       }, {}));
//     })
//     .catch(error => console.error("Error fetching clients:", error));
// }, [location.state]);


//   const filteredClients = clients.filter((client) =>
//     Object.values(client).some((value) =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const indexOfLastClient = currentPage * clientsPerPage;
//   const indexOfFirstClient = indexOfLastClient - clientsPerPage;
//   const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
//   const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

//   const handleFirstPage = () => setCurrentPage(1);
//   const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const handleLastPage = () => setCurrentPage(totalPages);

 

//   return (
//     <div className="client-list-wrapper">
//       <div className="client-list-container">
//       <h2 className='heading'>Client Saved Data List</h2>
//         <div className="top-controls">
//           <div className="button-groupp">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             <button className="button-search" onClick={() => setCurrentPage(1)}>Search</button>
//             {/* <button className="button-reset" onClick={handleReset}>Reset</button> */}
//             <button className="button-back" onClick={() => navigate('/')}>Back</button>
//             <button className="button-add" onClick={() => navigate('/client-master')}>Add New</button>
             
//           </div>
//         </div>
      
//         <table className="client-table">
//           <thead>
//             <tr>
//               <th>Sr.No</th>
//               <th>Client/Trade Name</th>
//               <th>Legal Name</th>
//               <th>Home State</th>
//               <th>PAN ID</th>
//               <th>Contact</th>
//               <th>Mobile Number</th>
//               <th>Email ID</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentClients.length > 0 ? (
//               currentClients.map((client, index) => (
//                 <tr key={client.id}>
//                   <td>{indexOfFirstClient + index + 1}</td>
//                   <td>{client.clientName}</td>
//                   <td>{client.legalName}</td>
//                   <td>{client.homeState}</td>
//                   <td>{client.panId || 'N/A'}</td>
//                   <td>{client.contact}</td>
//                   <td>{client.mobileNumber}</td>
//                   <td>{client.emailId}</td>
//                  <td className="status-column">
//   <label className={client.status ? 'status-label active' : 'status-label inactive'}>
//     <input
//       type="checkbox"
//       className="status-check"
//       checked={client.status}
//       onChange={() => handleStatusChange(client.panId, !client.status)}
//     />
//     {client.status ? 'Active' : 'Inactive'}
//   </label>
// </td>

// <td>
//   <div className="btns-groups">
//     <button className="button-edits" onClick={() => handleEdit(client)}>Edit_Client</button>
//     <button className='btn-updates' onClick={() => handleUpdateInv(client)}>Update_Inv</button>
//     <button className="button-import"
//       onClick={() =>
//         navigate("/import-process-form", {
//           state: {
//             client: {
//               panId: client.panId,
//               clientName: client.clientName,
//               legalName: client.legalName,
//             },
//           },
//         })
//       }
//     >
//       Import Transaction
//     </button>

//     {/* 👇 new button */}
//     <button className="button-view" onClick={() => handleViewProfile(client)}>
//       View_Profile
//     </button>
//   </div>
// </td>

//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10">No clients found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Pagination Section */}
// <div className="pagination-wrapper fixed-pagination">
//   <div className="pagination-left">
//     <button onClick={handleFirstPage} disabled={currentPage === 1}>
//       First
//     </button>
//     <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//       Previous
//     </button>
//   </div>

//   <div className="pagination-center">
//     <span>Page {currentPage} of {totalPages}</span>
//   </div>

//   <div className="pagination-right">
//     <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//       Next
//     </button>
//     <button onClick={handleLastPage} disabled={currentPage === totalPages}>
//       Last
//     </button>
//   </div>
// </div>

//       </div>
//    </div>
//   );
// }

// ClientList.propTypes = {
//   clients: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       clientName: PropTypes.string.isRequired,
//       legalName: PropTypes.string,
//       homeState: PropTypes.string,
//       panId: PropTypes.string,
//       natureOfBusiness: PropTypes.string,
//       contact: PropTypes.string,
//       mobileNumber: PropTypes.string,
//       emailId: PropTypes.string,
//       status: PropTypes.bool,
//     })
//   ),
// };

// export default ClientList;




import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Switch,
  Stack,
  Pagination,
  Box,
  Paper,
} from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { AppContext } from "../Client/context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";

const ClientList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPanId } = useContext(AppContext);

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  // ✅ Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/clients/getall");

        console.log("Fetched clients:", response.data);

        // 🧠 Handle common backend response shapes
        let data = [];
        if (Array.isArray(response.data)) {
          data = response.data;
        } else if (Array.isArray(response.data.clients)) {
          data = response.data.clients;
        } else if (response.data && typeof response.data === "object") {
          data = Object.values(response.data);
        }

        setClients(data || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [location.state]);

  // ✅ Search filter
  const filteredClients = clients.filter((client) =>
    Object.values(client)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  // ✅ Status toggle
  const handleStatusChange = async (panId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/clients/updatestatus/${panId}`,
        { status: newStatus }
      );

      if (response.data) {
        setClients((prev) =>
          prev.map((c) =>
            c.panId === panId ? { ...c, status: response.data.status } : c
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const goToBankForm = async (client) => {
  const res = await axios.get(`http://localhost:8080/api/clients/${client.panId}`);
  
  navigate("/bank-form", {
    state: {
      profile: res.data   // Now contains profileId
    }
  });
};

const openClientProfile = async (client) => {
  const response = await axios.get(
    `http://localhost:8080/api/clients/getProfileByPan?panId=${client.panId}`
  );

  const profile = response.data;

  navigate("/client-profile", {
    state: {
      selectedClient: client,
      profileId: profile.profileId
    }
  });
};


  // ✅ Delete client
  const handleDelete = async (clientId) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/clients/delete/${clientId}`);
      setClients((prev) => prev.filter((c) => c.id !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  // ✅ Navigation handlers
  const handleEdit = (client) =>
    navigate("/client-master", { state: { clientToEdit: client } });

  const handleUpdateInv = (client) =>
    navigate("/clientmenusform", { state: { client, panId: client.panId } });

  const handleViewProfile = (client) =>
  navigate("/view-client-profile", {
    state: { selectedClient: client },
  });

   

  // ✅ UI Rendering
  return (
    <Container fluid className="mt-4">
      <Card
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: "#f8f9fa" }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              color: "#1976d2",
            }}
          >
            Client Saved Data List
          </Typography>

          {/* 🔍 Search + Buttons */}
          <Row className="align-items-center mb-3">
            <Col md={4}>
              <TextField
                fullWidth
                size="small"
                label="Search Client"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md="auto">
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/client-master")}
                >
                  Add New
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/")}
                >
                  Back
                </Button>
              </Stack>
            </Col>
          </Row>

          {/* 🧾 Table Section */}
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#bcc2c7ff" }}>
                  <TableCell>Sr.No</TableCell>
                  <TableCell>Client / Trade Name</TableCell>
                  <TableCell>Legal Name</TableCell>
                  <TableCell>Home State</TableCell>
                  <TableCell>PAN ID</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      Loading clients...
                    </TableCell>
                  </TableRow>
                ) : currentClients.length > 0 ? (
                  currentClients.map((client, index) => (
                    <TableRow hover key={client.id || client.panId}>
                      <TableCell>{indexOfFirstClient + index + 1}</TableCell>
                      <TableCell>{client.clientName || "-"}</TableCell>
                      <TableCell>{client.legalName || "-"}</TableCell>
                      <TableCell>{client.homeState || "-"}</TableCell>
                      <TableCell>{client.panId || "N/A"}</TableCell>
                      <TableCell>{client.contact || "-"}</TableCell>
                      <TableCell>{client.mobileNumber || "-"}</TableCell>
                      <TableCell>{client.emailId || "-"}</TableCell>
                      <TableCell>
                        <Switch
                          checked={Boolean(client.status)}
                          onChange={() =>
                            handleStatusChange(client.panId, !client.status)
                          }
                          color="success"
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: client.status ? "green" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {client.status ? "Active" : "Inactive"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleEdit(client)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="info"
                            onClick={() => handleUpdateInv(client)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={() => handleViewProfile(client)}
                           >
                           View
                        </Button>

                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => handleDelete(client.id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No clients found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* 🔢 Pagination */}
          {totalPages > 1 && (
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

ClientList.propTypes = {
  clients: PropTypes.array,
};

export default ClientList;
