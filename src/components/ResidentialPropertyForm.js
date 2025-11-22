import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ResidentialPropertyForm = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    assetId: '',
    panId: '',
    ledgerId: '',
    FY_Year: '',
    occupancy: '',
    unitNo: '',
    buildingName: '',
    street: '',
    area: '',
    pincode: '',
    country: '',
    state: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // await axios.post("http://localhost:8080/api/residential/add", formData);
    alert('✅ Property added successfully!');
    console.log('Submitted:', formData);

    navigate('/residential-property-table', {
      state: {
        newProperty: formData, // Optional: send data to the table
      },
    });

    // (Optional) Clear form if you don't need to go back
    setFormData({
      assetId: '',
      panId: '',
      ledgerId: '',
      FY_Year: '',
      occupancy: '',
      unitNo: '',
      buildingName: '',
      street: '',
      area: '',
      pincode: '',
      country: '',
      state: '',
      city: '',
    });
  } catch (err) {
    alert('❌ Error saving property');
    console.error(err);
  }
};

  return (
    <div className="container mt-4">
      <h4>Add Residential Property</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Asset ID</Form.Label>
              <Form.Control name="assetId" value={formData.assetId} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>PAN</Form.Label>
              <Form.Control name="panId" value={formData.panId} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Ledger ID</Form.Label>
              <Form.Control name="ledgerId" value={formData.ledgerId} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>FY Year</Form.Label>
              <Form.Control name="FY_Year" value={formData.FY_Year} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Occupancy</Form.Label>
              <Form.Control name="occupancy" value={formData.occupancy} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Unit No</Form.Label>
              <Form.Control name="unitNo" value={formData.unitNo} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Building Name</Form.Label>
              <Form.Control name="buildingName" value={formData.buildingName} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control name="street" value={formData.street} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Area</Form.Label>
              <Form.Control name="area" value={formData.area} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Pincode</Form.Label>
              <Form.Control name="pincode" value={formData.pincode} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control name="country" value={formData.country} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control name="state" value={formData.state} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control name="city" value={formData.city} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <div className="mt-4">
          <Button variant="primary" type="submit">Save Property</Button>
        </div>
      </Form>
    </div>
  );
};

export default ResidentialPropertyForm;
