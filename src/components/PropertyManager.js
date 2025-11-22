import React, { useState } from 'react';
import ResidentialPropAdd from './ResidentialPropAdd';
import PropertyTable from './PropertyTable';
import { dummyClientList, dummyThirdFormData } from './dummyData'; // Replace with your actual data

const PropertyManager = () => {
  const [propertyList, setPropertyList,clientList] = useState([]);

  const handleAddProperty = (newEntry) => {
    setPropertyList((prevList) => [...prevList, newEntry]);
  };

  return (
    <div>
      <ResidentialPropAdd onSave={handleAddProperty} />
      <PropertyTable
        clientList={dummyClientList}
        thirdFormData={dummyThirdFormData}
        propertyList={propertyList}
      />
    </div>
  );
};

export default PropertyManager;
