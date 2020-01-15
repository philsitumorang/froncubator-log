function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_STATS":
      return {
        ...state,
        stats: action.payload
      };
      break;
    case "UPDATE_LOGS":
      return {
        ...state,
        logs: action.payload
      };
      break;
    default:
      return state;
  }
}

export default reducer;