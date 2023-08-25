import { createContext, useContext, useReducer } from 'react';

//creating context
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };

    case 'logout':
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error('Unkonw action');
  }
}

//customs provider and recieved a children
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  const authContextValue = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  //return the context.provider
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

//create customs hook

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
