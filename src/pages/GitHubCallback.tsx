import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const GitHubCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken, user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processCallback = async () => {
      const token = new URLSearchParams(location.search).get('token');

      if (token) {
        try {
          setToken(token);
          // Give the auth context a moment to fetch user data
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } catch (error) {
          console.error('Error processing authentication:', error);
          navigate('/');
        }
      } else {
        console.error('No token found in URL');
        navigate('/');
      }
      setIsProcessing(false);
    };

    processCallback();
  }, [location, navigate, setToken]);

  if (isProcessing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="text-lg">Processing authentication...</p>
        </div>
      </div>
    );
  }

  return <div>Redirecting...</div>;
};

export default GitHubCallback;
