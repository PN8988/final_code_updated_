// src/components/ContactUsModern.jsx
import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const contacts = [
  {
    name: "Victor Cardoz",
    role: "CEO",
    email: "victorcardoz@gmail.com",
    phone: "+1 234 567 890",
    img: "images/photo.jpg",
  },
  {
    name: "Sebastian Dsouza",
    role: "Assistant Manager",
    email: "sebastandsouza@gmail.com",
    phone: "+1 987 654 321",
    img: "images/images.jpg",
  },
  {
    name: "Clara Williams",
    role: "Marketing Head",
    email: "clara@example.com",
    phone: "+1 456 789 123",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const ContactUs= () => {
  return (
    <Box sx={{ maxWidth: 1000, margin: "0 auto", padding: "60px 20px" }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: 700, marginBottom: 5 }}
      >
        Meet Our Team
      </Typography>

      <Carousel indicators={false} interval={4000}>
        {contacts.map((contact, index) => (
          <Carousel.Item key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 4,
                flexWrap: "wrap",
              }}
            >
              <Card
                sx={{
                  maxWidth: 280,
                  textAlign: "center",
                  borderRadius: 4,
                  boxShadow: 6,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.05)",
                    boxShadow: 12,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={contact.img}
                  alt={contact.name}
                  sx={{
                    borderRadius: "50%",
                    width: 140,
                    height: 140,
                    margin: "20px auto 0",
                    boxShadow: 3,
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {contact.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {contact.role}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {contact.email}
                  </Typography>
                  <Typography variant="body2">{contact.phone}</Typography>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 2, backgroundColor: "#4A90E2", "&:hover": { backgroundColor: "#357ABD" } }}
                    onClick={() => alert(`Contacting ${contact.name}`)}
                  >
                    Contact
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Carousel.Item>
        ))}
      </Carousel>
    </Box>
  );
};

export default ContactUs;
