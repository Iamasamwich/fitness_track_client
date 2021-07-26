const appStatusReducer = (state = null, action) => {
  switch (action.type) {
    case "APPSTATUS":
      return action.payload;
    default:
      return state;
  };
};

export default appStatusReducer;