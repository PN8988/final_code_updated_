import React, { useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Autocomplete, TextField } from '@mui/material';
import './MasterDisplayList.css';

const MasterDisplayList = () => {
  const [tableData, setTableData] = useState([
    { srNo: 1, propertyType: 'Residential', state: 'Maharashtra', description: 'Apartment' },
    { srNo: 2, propertyType: 'Commercial', state: 'Karnataka', description: 'Office Space' },
    // Add more rows as needed
  ]);

  const propertyTypes = ['Residential', 'Commercial', 'Industrial', 'Immovable Property',
    'Securities','Property','Virtual Assets',];
  const states = [ 
    '01_Jammu And Kashmir', '02_Himachal Pradesh', 
    '03_Panjab', '04_Chandigarh',
    '05_Uttarakhand', '06_Haryana', 
    '07_Delhi', '08_Rajasthan', '09_Uttar Pradesh',
    '10_Bihar', '11_Sikkim', '12_Arunachal Pradesh', '13_Nagaland', '14_Manipur',
    '15_Mizoram', '16_Tripura', '17_Meghalaya', '18_Assam', '19_West Bengal',
    '20_Jharkhand', '21_Odisha', '22_Chattisgarh', '23_Madhya Pradesh', '24_Gujarat',
    '26_Dadra And Nagar Haveli And Daman And Diu', '27_Maharashtra', '29_Karnataka',
    '30_Goa', '31_Lakshadweep', '32_Kerala', '33_Tamil Nadu', '34_Puducherry',
    '35_Andmaan And Nicobar Islands', '36_Telangana', '37_Andhra Pradesh',
    '38_Ladakh', '97_Other Territory', '99_Center JURISDICTION'
];
  const descriptions = ['Apartment', 'Villa', 'Office Space', 'Warehouse'];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'srNo',
        header: 'Sr. No',
        size: 80,
        enableEditing: false,
      },
      {
        accessorKey: 'propertyType',
        header: 'Property Type',
        editVariant: 'custom',
        Edit: ({ cell, row, column, table }) => (
          <Autocomplete
            options={propertyTypes}
            value={cell.getValue() || ''}
            onChange={(event, newValue) => {
              table.options.meta?.updateData(row.index, column.id, newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Property Type" />}
          />
        ),
      },
      {
        accessorKey: 'state',
        header: 'State',
        editVariant: 'custom',
        Edit: ({ cell, row, column, table }) => (
          <Autocomplete
            options={states}
            value={cell.getValue() || ''}
            onChange={(event, newValue) => {
              table.options.meta?.updateData(row.index, column.id, newValue);
            }}
            renderInput={(params) => <TextField {...params} label="State" />}
          />
        ),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        editVariant: 'custom',
        Edit: ({ cell, row, column, table }) => (
          <Autocomplete
            options={descriptions}
            value={cell.getValue() || ''}
            onChange={(event, newValue) => {
              table.options.meta?.updateData(row.index, column.id, newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Description" />}
          />
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableEditing: true,
    editingMode: 'modal',
    muiTableContainerProps: {
      className: 'master-table-container',
    },
    muiTableBodyCellProps: {
      className: 'mrt-table',
    },
    muiTableHeadCellProps: {
      className: 'mrt-table',
    },
    getRowId: (row) => row.srNo,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setTableData((prevData) =>
          prevData.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row
          )
        );
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default MasterDisplayList;
