import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { PieChart, TrendingUp, IndianRupee, ShieldCheck } from "lucide-react";



const services = [
  {
    title: "Investment Planning",
    desc: "Tailored strategies to grow your wealth and achieve financial freedom.",
    icon: <TrendingUp size={40} color="#0b3d2e" />,
  },
  {
    title: "Tax Advisory",
    desc: "Expert guidance to minimize tax liabilities and ensure compliance.",
    icon: <IndianRupee size={40} color="#0b3d2e" />,
  },
  {
    title: "Wealth Management",
    desc: "Holistic management of assets, risks, and long-term growth plans.",
    icon: <PieChart size={40} color="#0b3d2e" />,
  },
  {
    title: "Financial Security Planning",
    desc: "Ensure your family’s future with intelligent insurance and retirement solutions.",
    icon: <ShieldCheck size={40} color="#0b3d2e" />,
  },
];

const FinancialServices = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: 10,
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#0b3d2e",
          mb: 5,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Our Financial Expertise
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  borderRadius: "16px",
                  height: "100%",
                  border: "1px solid #e0e0e0",
                  "&:hover": { backgroundColor: "#ffffff" },
                }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={2}
                  >
                    {service.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#0b3d2e", mb: 1 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "gray", px: 1 }}
                  >
                    {service.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FinancialServices;
