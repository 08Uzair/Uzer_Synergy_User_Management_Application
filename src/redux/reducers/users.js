import {
  CREATE_USERS,
  FETCH_USERS,
  DELETE_USER,
  FETCH_USER_ID,
  UPDATE_USER,
} from "../constants/actionTypes";

const usersReducer = (users = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;

    case CREATE_USERS:
      return [...users, action.payload];


      case DELETE_USER:

      return users.filter((user) => user._id !== action.payload._id);

      case FETCH_USER_ID:
        return [action.payload];

      case UPDATE_USER:
        users.map((user)=> user._id === action.payload._id ? action.payload :user );


    default:
      return users;
  }

  
    
};

export default usersReducer;
