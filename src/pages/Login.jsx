import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api.js';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim()) {
      setError('Username is required.');
      return;
    }
    try {
      const user = await loginUser(username.trim());
      onLogin(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="page-container">
      <div className="auth-panel">
        <h1>Login or create an account</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Username</label>
          <input value={username} onChange={(event) => setUsername(event.target.value)} />
          {error && <div className="status-message">{error}</div>}
          <button type="submit" className="button">Continue</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
