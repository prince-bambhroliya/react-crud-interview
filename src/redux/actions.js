// Action types
export const ADD_DATA = "ADD_DATA";
export const UPDATE_DATA = "UPDATE_DATA";
export const DELETE_DATA = "DELETE_DATA";

// Action creators
export const addData = (data) => ({
  type: ADD_DATA,
  payload: data,
});

export const updateData = (data) => ({
  type: UPDATE_DATA,
  payload: data,
});

export const deleteData = (data) => ({
  type: DELETE_DATA,
  payload: data,
});
