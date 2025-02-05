import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/loginsignup.css';

const LoginSignup = () => {
  const { user, login } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const endpoint = isLogin ? '/userlogin' : '/register';

    try {
      const response = await fetch(`https://backend-btk-shop.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        login(data.user, data.token);
        const from = location.state?.from || '/';
        navigate(from, { replace: true });
      } else {
        setError(data.message || 'Une erreur s\'est produite');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Une erreur s\'est produite lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-signup">
      <div className="loginsignup-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
       
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner"></div> // Affichez un spinner pendant le chargement
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </button>
        </form>
        <p onClick={() => { setIsLogin(!isLogin); setError(''); }}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;