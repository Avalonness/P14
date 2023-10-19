import React, { useRef, useState } from 'react';
import './HRnet-composant.css'; 
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { fr } from 'date-fns/locale';
import ConfirmationModal from 'react-oc-modal-module';


import { useDispatch } from 'react-redux';
import { addEmployee } from '../../Shares/reducers/employeeSlice';
const HRnetComponent = () => {
    const dispatch = useDispatch();
    const [dob, setDob] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [state, setState] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
  
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const streetRef = useRef();
    const cityRef = useRef();
    const zipCodeRef = useRef();
    const departmentRef = useRef();
  
    const saveEmployee = (event) => {
      event.preventDefault();
      const employee = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        dob: dob,
        startDate: startDate, 
        address: {
          street: streetRef.current.value,
          city: cityRef.current.value,
          state: state,
          zipCode: zipCodeRef.current.value
        },
        department: departmentRef.current.value
      };
  
      dispatch(addEmployee(employee));
  
      setModalMessage('Employee Created!');
      setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
      };

    return (
        <div>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                <Link to="/employee">View Current Employees</Link>
                <h2>Create Employee</h2>
                <form id="create-employee">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" ref={firstNameRef} />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" ref={lastNameRef} />

                    <label>Date of Birth</label>
                    <DatePicker 
                        selected={dob}
                        onChange={date => setDob(date)}
                        dateFormat="dd-MM-yyyy"
                        locale={fr}
                    />

                    <label>Start Date</label>
                    <DatePicker 
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="dd-MM-yyyy"
                        locale={fr}
                    />

                    <fieldset className="address">
                        <legend>Address</legend>
                        <label htmlFor="street">Street</label>
                        <input type="text" id="street" ref={streetRef} />

                        <label htmlFor="city">City</label>
                        <input type="text" id="city" ref={cityRef} />

                        <label htmlFor="state">State</label>
                        <RegionDropdown
                            country="United States"
                            name="state"
                            id="state"
                            value={state}
                            onChange={(val) => setState(val)} />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input type="number" id="zip-code" ref={zipCodeRef} />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <select name="department" id="department" ref={departmentRef}>
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Legal</option>
                    </select>
                </form>

                <button type="submit" form="create-employee" onClick={saveEmployee}>Save</button>

                {showModal && (
                    <ConfirmationModal message={modalMessage} onClose={closeModal} />
                )}
            </div>
        </div>
    );
}

export default HRnetComponent;