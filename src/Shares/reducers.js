const initialState = {
    value: 0
  };
  
  function counterReducer(state = initialState, action) {
    switch (action.type) {
      case 'increment':
        return { ...state, value: state.value + 1 };
      default:
        return state;
    }
  }
  
  export default counterReducer;