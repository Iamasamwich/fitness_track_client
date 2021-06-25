const pageReducer = (state = 'placeHolder', action) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return action.payload;
    default:
      return state;
  }
};

export default pageReducer;