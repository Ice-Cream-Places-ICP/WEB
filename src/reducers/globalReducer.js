export const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_IS_MOBILE":
      return {
        global: {
          ...state.global,
          isMobile: action.payload,
        },
      };
    case "SET_IS_LOADING":
      return {
        global: {
          ...state.global,
          isLoading: action.payload,
        },
      };

    default:
      return state;
  }
};
