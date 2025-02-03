import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import './css/loginsignup.css';

const LoginSignup = () => {
  const { user, login } = useContext(UserContext); // Récupérez l'utilisateur et la fonction login
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(''); // État pour gérer les messages d'erreur
  const [isLoading, setIsLoading] = useState(false); // État pour gérer le chargement

  // Rediriger l'utilisateur s'il est déjà connecté
  useEffect(() => {
    if (user) {
      navigate('/'); // Redirige vers la page principale si l'utilisateur est déjà connecté
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activer l'indicateur de chargement
    setError(''); // Réinitialiser les erreurs

    const endpoint = isLogin ? '/userlogin' : '/register';

    try {
      const response = await fetch(`https://backend-btk-shop.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        login(data.user, data.token); // Connectez l'utilisateur
        navigate('/'); // Redirigez vers la page principale après la connexion
      } else {
        setError(data.message || 'Une erreur s\'est produite'); // Affichez l'erreur
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Une erreur s\'est produite lors de la connexion'); // Affichez une erreur générique
    } finally {
      setIsLoading(false); // Désactiver l'indicateur de chargement
    }
  };

  return (
    <div className="login-signup">
      <div className="loginsignup-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        {/* Affichez le message d'erreur s'il existe */}
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