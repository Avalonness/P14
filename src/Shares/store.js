import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './reducers/employeeSlice';

const store = configureStore({
  reducer: {
    employees: employeesReducer
  }
});

export default store;