export const GlobalReducer = (state, action) => {
  console.log(action.payload);
  if (action.type === 'SET_SESSION') {
    return {
      ...state,
      session: action.payload.session,
    };
  }
};
