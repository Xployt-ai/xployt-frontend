import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const GitHubCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');

    if (token) {
      setToken(token);
      navigate('/dashboard');
    } else {
      console.error('No token found in URL');
      navigate('/');
    }
  }, [location, navigate, setToken]);

  return <div>Loading...</div>;
};

export default GitHubCallback;
