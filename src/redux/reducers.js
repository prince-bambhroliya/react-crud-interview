import { ADD_DATA, UPDATE_DATA, DELETE_DATA } from "./actions";

const initialState = {
  tableData: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_DATA:
        return {
          ...state,
          tableData: [...state.tableData, action.payload],
        };
      case UPDATE_DATA:
        return {
          ...state,
          tableData: state.tableData.map((data) =>
            data.id === action.payload.id ? action.payload : data
          ),
        };
      case DELETE_DATA:
        return {
          ...state,
          tableData: state.tableData.filter((data) => data !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  