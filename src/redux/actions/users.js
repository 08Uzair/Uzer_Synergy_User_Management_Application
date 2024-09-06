import * as api from "../api";
import {
  FETCH_USERS,
  CREATE_USERS,
  DELETE_USER,
  FETCH_USER_ID,
  UPDATE_USER,
} from "../constants/actionTypes";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    dispatch({ type: FETCH_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.addUsers(newUser);
    dispatch({ type: CREATE_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);
    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const getUserByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserByID(id);
    dispatch({ type: FETCH_USER_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (userId, updatedUser) => async (dispatch) => {
  try {
    const { data } = await api.putUser(userId, updatedUser);
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

