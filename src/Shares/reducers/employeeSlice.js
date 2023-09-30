import { createSlice } from '@reduxjs/toolkit';

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: [],
  reducers: {
    addEmployee: (state, action) => {
      // Assure que dob est sérialisé si c'est un objet Date
      if(action.payload.dob instanceof Date) {
        action.payload.dob = action.payload.dob.toISOString();
      }

      // Assure que startDate est sérialisé si c'est un objet Date
      if(action.payload.startDate instanceof Date) {
        action.payload.startDate = action.payload.startDate.toISOString();
      }
      
      state.push(action.payload);
    },
  },
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;