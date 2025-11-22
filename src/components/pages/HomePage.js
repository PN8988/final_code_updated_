// import React from 'react'
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import "./styles/HomePage.css";

// const HomePage = () => {
//   return (



//     <>
//       <Navbar className='navbar-home' bg="light" data-bs-theme="light">
//         <Container>
//           <Navbar.Brand  className='brand' href="#home">Admin</Navbar.Brand>
         
//           <Nav className="me-auto">
//             <Nav.Link href="#">Employee</Nav.Link>
//             <Nav.Link href="#About Us">About Us</Nav.Link>
//             <Nav.Link href="#Contact Us">Contact Us</Nav.Link>
//           </Nav>
//              <img className ="image-contain" src='images/finance-office.jpg' />
         
//         </Container>
//       </Navbar>
//     </>
//   );
// }


  
// export default HomePage;


// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   Button,
//   Container,
//   Avatar,
// } from "@mui/material";
// import Navbar from "../Navbar";
// const HomePage = () => {
//   return (
//     <Box sx={{ fontFamily: "'Poppins', sans-serif" }}>
//       <Navbar />
//       {/* Hero Section */}
//       <Box
//         sx={{
//           height: "100vh",
//          // backgroundImage:url("/images/download.jpg"),
//           backgroundColor: "silver",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: "black",
//           textAlign: "center",
//           flexDirection: "column",
//         }}
//       >
//         <Typography variant="h3" sx={{ fontWeight: "bold" }}>
//           Smart Financial & Investment Solutions
//         </Typography>
//         <Typography variant="h6" sx={{ mt: 2, maxWidth: "600px" }}>
//           Empowering your financial growth with strategic consultancy and expert
//           investment planning.
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{
//             mt: 4,
//             backgroundColor: "#1b3f4dff",
//             "&:hover": { backgroundColor: "#145c3b" },
//           }}
//         >
//           Get Started
//         </Button>
//       </Box>

//       {/* About Section */}
//       <Container sx={{ py: 10 }}>
//         <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
//           About Us
//         </Typography>
//         <Typography variant="body1" align="center" maxWidth="800px" mx="auto">
//           At Trinity Consultancy Services, we provide tailored financial, tax,
//           and investment solutions designed to build and secure your wealth. Our
//           team of professionals ensures every client receives the right guidance
//           to make informed decisions for long-term success.
//         </Typography>
//       </Container>

//       {/* Services Section */}
//       {/* <Container sx={{ pb: 10 }}>
//         <Typography variant="h4" align="center" fontWeight="bold" mb={6}>
//           Our Services
//         </Typography>
//         <Grid container spacing={4} justifyContent="center">
//           {[
//             {
//               title: "Investment Planning",
//               desc: "Comprehensive strategies to maximize your returns and minimize risk.",
//             },
//             {
//               title: "Tax Consultancy",
//               desc: "Expert tax planning and compliance services to optimize your finances.",
//             },
//             {
//               title: "ITR-Return Management",
// desc: "Efficiently manage and file your Income Tax Returns with accuracy, ensuring compliance and maximizing your refunds."

//             },
//           ].map((service, index) => (
//             <Grid item xs={12} md={4} key={index}>
//               <Paper
//                 elevation={4}
//                 sx={{
//                   p: 4,
//                   textAlign: "center",
//                   borderRadius: 3,
//                   height: "100%",
//                   transition: "transform 0.3s",
//                   "&:hover": { transform: "translateY(-10px)" },
//                 }}
//               >
//                 <Typography variant="h6" fontWeight="bold" mb={2}>
//                   {service.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {service.desc}
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container> */}

//       {/* Call to Action */}
//       <Box
//         sx={{
//           backgroundColor: "#a1cfc2ff",
//           color: "white",
//           py: 8,
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold">
//           Ready to take charge of your financial future?
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{
//             mt: 3,
//             backgroundColor: "white",
//             color: "#1B4D3E",
//             fontWeight: "bold",
//             "&:hover": {
//               backgroundColor: "#C0C0C0",
//             },
//           }}
//         >
//           Contact Us Today
//         </Button>
//       </Box>

//       {/* Owner Profile Section */}
//       <Box
//         sx={{
//           py: 8,
//           textAlign: "center",
//           backgroundColor: "#f8f9fa",
//         }}
//       >
//         <Container>
//           <Typography
//             variant="h5"
//             fontWeight="bold"
//             mb={4}
//             color="#1B4D3E"
//           >
//             Meet Our Founder
//           </Typography>
//           <Avatar
//             alt="Company Owner"
//             src="/images/owner.jpg" // 👉 place your image in public/images/owner.jpg
//             sx={{
//               width: 150,
//               height: 150,
//               mx: "auto",
//               mb: 2,
//               border: "4px solid #1B4D3E",
//             }}
//           />
//           <Typography variant="h6" fontWeight="bold">
//             Mr. Victor Cardoz
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Founder & Chief Financial Advisor
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ maxWidth: 600, mx: "auto", mt: 2 }}
//           >
//             With over 20 years of experience in finance and investment strategy,
//             Mr. Victor leads Trinity Consultancy Services with a vision to
//             empower individuals and businesses toward sustainable financial
//             success.
//           </Typography>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Box sx={{ backgroundColor: "#83b8a6ff", color: "white", py: 4 }}>
//         <Container>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" fontWeight="bold">
//                 Trinity Consultancy Services
//               </Typography>
//               <Typography variant="body2" mt={1}>
//                 Pune, Maharashtra, India
//               </Typography>
//               <Typography variant="body2">
//                 Email: info@trinityconsultancy.com
//               </Typography>
//               <Typography variant="body2">Phone: +91-9876543210</Typography>
//             </Grid>
//             <Grid item xs={12} md={6} textAlign={{ xs: "left", md: "right" }}>
//               <Typography variant="body2" sx={{ mt: 2 }}>
//                 © 2025 Trinity Consultancy Services. All Rights Reserved.
//               </Typography>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;


import React from "react";
import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import ServicesCarousel from "../ServicesCarousel";
import Footer from "../Footer";
import { Box } from "@mui/material";
import FinancialServices from "../FinancialServices";

const HomePage = () => {
  return (
    <Box sx={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* <Navbar /> */}
      <HeroSection />
      <FinancialServices />
      <ServicesCarousel />
      <Footer />
    </Box>
  );
};

export default HomePage;
