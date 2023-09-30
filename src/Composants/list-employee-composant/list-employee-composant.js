import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTable, useSortBy } from 'react-table';
import './list-employee-composant.css'; // Import du fichier CSS

function EmployeeListComponent() {
  // Convertir chaque objet Date en une chaîne de caractères
  const rawEmployees = useSelector(state => state.employees);
  const employeesData = React.useMemo(() => {
    return rawEmployees.map(emp => {
      let dobStr = new Date(emp.dob).toLocaleDateString();
      let startDateStr = new Date(emp.startDate).toLocaleDateString();
  
      return {
        ...emp,
        dob: dobStr,
        startDate: startDateStr
      };
    });
  }, [rawEmployees]);

  const columns = React.useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Start Date', accessor: 'startDate' },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Date of Birth', accessor: 'dob' },
      { Header: 'Street', accessor: 'address.street' },
      { Header: 'City', accessor: 'address.city' },
      { Header: 'State', accessor: 'address.state' },
      { Header: 'Zip Code', accessor: 'address.zipCode' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: employeesData,
    },
    useSortBy 
  );
  
  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <table id="employee-table" className="styled-table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/">Home</Link>
    </div>
  );
}

export default EmployeeListComponent;