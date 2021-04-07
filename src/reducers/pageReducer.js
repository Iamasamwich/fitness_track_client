const pageReducer = (state = 'signup', action) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return action.payload;
    default:
      return state;
  }
};

export default pageReducer;