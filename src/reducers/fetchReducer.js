const fetchReducer = (state = false, action) => {
  switch (action.type) {
    case "FETCHCHANGE":
      return action.payload;
    default:
      return state;
  };
};

export default fetchReducer;