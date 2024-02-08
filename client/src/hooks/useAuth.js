import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }

  return context;
}

export default useAuth;