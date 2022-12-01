const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFecthing: true,
        error: false
      }
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFecthing: false,
        error: false
      }
    case "LOGIN_":
      return {
        user: null,
        isFecthing: false,
        error: action.payload
      }
    default:
      state;
  }
}