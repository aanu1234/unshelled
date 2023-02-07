const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        currentUser: action.payload.user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
