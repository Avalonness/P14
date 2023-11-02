import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTable, useSortBy } from 'react-table';
import './list-employee-composant.css';

function EmployeeListComponent() {
  // Utilisation du Redux pour obtenir la liste des employés.
  const rawEmployees = useSelector(state => state.employees);
  
  // États pour le filtrage, le nombre d'entrées à afficher et la pagination.
  const [filterString, setFilterString] = useState('');
  const [rowsToShow, setRowsToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fonction pour vérifier si un employé correspond au filtre.
  const employeeMatchesFilter = (employee, filter) => {
    for (const key in employee) {
      if (typeof employee[key] === 'object') {
        for (const subKey in employee[key]) {
          if (String(employee[key][subKey]).toLowerCase().includes(filter.toLowerCase())) {
            return true;
          }
        }
      } else if (String(employee[key]).toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  // Traitement des données des employés en fonction du filtre, de la pagination et du nombre d'entrées à afficher.
  const employeesData = React.useMemo(() => {
    // Filtrage des employés selon le texte du filtre.
    const filteredEmployees = rawEmployees.filter(emp => filterString === '' || employeeMatchesFilter(emp, filterString));

    // Détermination des indices de début et de fin pour la pagination.
    const startIndex = (currentPage - 1) * rowsToShow;
    const endIndex = startIndex + rowsToShow;

    // Retourne une portion des employés filtrés en fonction de la pagination, et met à jour les champs de date.
    return filteredEmployees
      .slice(startIndex, endIndex)
      .map(emp => {
        let dobStr = new Date(emp.dob).toLocaleDateString();
        let startDateStr = new Date(emp.startDate).toLocaleDateString();
        return {
          ...emp,
          dob: dobStr,
          startDate: startDateStr
        };
      });
  }, [rawEmployees, filterString, rowsToShow, currentPage]);

  // Calcul du nombre total d'employés après application du filtre.
  const totalEmployeesAfterFilter = rawEmployees.filter(emp => filterString === '' || employeeMatchesFilter(emp, filterString)).length;
  
  // Calcul du nombre total de pages.
  const totalPages = Math.ceil(totalEmployeesAfterFilter / rowsToShow);

  // Fonctions pour gérer la pagination.
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // Définition des colonnes pour `react-table`.
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

  // Utilisation du hook `useTable` pour initialiser le tableau.
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

      <input
        type="text"
        placeholder="Filter by any field..."
        value={filterString}
        onChange={e => setFilterString(e.target.value)}
      />

      <select 
        value={rowsToShow}
        onChange={e => setRowsToShow(Number(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>

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

      <div className="entries-pagination-container">
        <div className="entries-info">
          Showing {Math.min((currentPage - 1) * rowsToShow + 1, totalEmployeesAfterFilter)} to {Math.min(currentPage * rowsToShow, totalEmployeesAfterFilter)} of {totalEmployeesAfterFilter} entries.
        </div>
        
        <div className="pagination-controls">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>Précédent</button>
          <span>Page {currentPage} sur {totalPages}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>Suivant</button>
        </div>
      </div>

      <Link to="/">Home</Link>
    </div>
  );
}

export default EmployeeListComponent;