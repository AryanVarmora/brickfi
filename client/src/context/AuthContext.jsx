    import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (name, email, password) => {
    const res = await axios.post('http://localhost:8000/api/auth/register', { name, email, password });
    setUser(res.data.data);
    return res.data.data;
  };

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:8000/api/auth/login', { email, password });
    setUser(res.data.data);
    return res.data.data;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);