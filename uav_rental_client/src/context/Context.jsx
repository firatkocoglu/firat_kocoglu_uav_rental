import { createContext, useReducer } from 'react';
import { GlobalReducer } from './reducer';
import Cookie from 'universal-cookie';

// WE'RE CREATING A GLOBAL CONTEXT TO BE ABLE TO PERSIST CSRF TOKEN SENT BY BROWSER ON
// CLIENT APPLICATION AND ACCESS TOKEN FROM ALL CONSUMER COMPONENTS

let csrf_token = new Cookie().get('csrftoken');

const defaultState = {
  session: csrf_token || '',
};

// CREATE GLOBAL CONTEXT
export const GlobalContext = createContext(defaultState);

//PROVIDE GLOBAL CONTEXT TO CONSUMER COMPONENTS
export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, defaultState);

  const setSession = (session) => {
    dispatch({
      type: 'SET_SESSION',
      payload: { session },
    });
  };

  return (
    <GlobalContext.Provider value={{ session: state.session, setSession }}>
      {children}
    </GlobalContext.Provider>
  );
};
