import { createContext, useEffect, useReducer } from 'react';

const INITIAL_STATE = {
  owner: JSON.parse(localStorage.getItem('owner')) || null,
  loading: false,
  error: null,
};

export const OwnerAuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        owner: null,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        owner: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        owner: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        owner: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const OwnerAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('owner', JSON.stringify(state.owner));
  }, [state.owner]);

  return (
    <OwnerAuthContext.Provider
      value={{
        owner: state.owner,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}>
      {children}
    </OwnerAuthContext.Provider>
  );
};
