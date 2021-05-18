const sessionReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SESSIONS":
      return action.payload;
    default:
      return state;
  };
};

export default sessionReducer;
