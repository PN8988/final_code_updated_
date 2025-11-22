import React, { useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../styles/Services.css";

const Services = () => {
  // Refs for each detailed section
  const serviceTaxRef = useRef(null);
  const itrRef = useRef(null);
  const tdsRef = useRef(null);
  const bookkeepingRef = useRef(null);

  // Scroll smoothly to the section
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const servicesData = [
    {
      title: " Tax Registration Services",
      desc: "Manage your service taxes efficiently and stay compliant with government regulations.",
      icon: "💼",
      ref: serviceTaxRef,
    },
    {
      title: "ITR-Return",
      desc: "Simplify your Income Tax Return process with expert guidance and maximum refund assurance.",
      icon: "🧾",
      ref: itrRef,
    },
    {
      title: "TDS Returns",
      desc: "Automate and simplify your TDS filings with accuracy, compliance, and peace of mind.",
      icon: "📊",
      ref: tdsRef,
    },
    {
      title: "Book Keeping Services",
      desc: "Accurate bookkeeping for smarter financial decisions and seamless business growth.",
      icon: "📘",
      ref: bookkeepingRef,
    },
  ];

  return (
    <div className="services-page">
      {/* ===== Services Overview ===== */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Our Services</h2>
        <Row className="g-4">
          {servicesData.map((service, index) => (
            <Col key={index} md={6} lg={3}>
              <Card className="service-card h-100 shadow-sm border-0">
                <Card.Body className="text-center">
                  <div className="service-icon mb-3">{service.icon}</div>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.desc}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => scrollToSection(service.ref)}
                  >
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ===== Detailed Sections ===== */}
      <div ref={serviceTaxRef} className="service-detail-section">
        <Container className="py-5">
          <h3> Tax Registration Services</h3>
          <p>
            We provide complete Tax Registration Services Management solutions to ensure your
            business remains compliant with tax laws. Our experts handle
            registration, return filing, audits, and advisory with precision.
          </p>
        </Container>
      </div>

      <div ref={itrRef} className="service-detail-section bg-light">
        <Container className="py-5">
          <h3>ITR-Return Management</h3>
          <p>
            File your Income Tax Returns easily and accurately with our
            professional guidance. We help maximize your deductions and ensure
            timely filing without stress.
          </p>
        </Container>
      </div>

      <div ref={tdsRef} className="service-detail-section">
        <Container className="py-5">
          <h3>TDS Reytuen Management</h3>
          <p>
            Manage your TDS deductions and filings efficiently. Our TDS
            solutions ensure error-free reporting and compliance with the latest
            government norms.
          </p>
        </Container>
      </div>
<div ref={bookkeepingRef} className="service-detail-section">
        <Container className="py-5">
          <h3>Book Keeping Services</h3>
          <p>
           Keep your finances organized and accurate with our expert bookkeeping services —
            so you can focus on growing your business.
          </p>
        </Container>
      </div>
      
    </div>
  );
};

export default Services;
