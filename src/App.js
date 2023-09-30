import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HRnetComponent from './Composants/HRnet-composant/HRnet-composant.js';
import EmployeeListComponent from './Composants/list-employee-composant/list-employee-composant';
import ErrorBoundary from './Composants/ErrorBoundary';

function App() {
  return (
    <div className='main_container'>
      <div className="content">
        <BrowserRouter>
          <div className="second_container">
            <ErrorBoundary>
              <Routes>
                <Route path="/employee" element={<EmployeeListComponent />} />
                <Route path="/" element={<HRnetComponent />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;