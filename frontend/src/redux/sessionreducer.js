import Cookies from "js-cookie";

const initialState = {
    username:"",
    isLoggedIn:false
}
const sessionReducer = (state=initialState,action)=>{  
    switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        
      };
    case "LOGOUT": {
      Cookies.remove("token");
      return {
        ...state,
        isLoggedIn: false,
        username: "",
      };
    }

    default:
      return state;
  }

}

export default sessionReducer;