import { useEffect, useState } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ArticleView from './pages/ArticleView.jsx';
import Editor from './pages/Editor.jsx';
import Login from './pages/Login.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = window.localStorage.getItem('tessa-pulse-user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    window.localStorage.setItem('tessa-pulse-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('tessa-pulse-user');
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <Link to="/" className="brand">Tessa Pulse</Link>
          <span className="tagline">Personalized publishing with affinity routing</span>
        </div>
        <nav>
          <Link to="/">Feed</Link>
          <Link to="/editor">Publish</Link>
          {user ? (
            <button className="link-button" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/article/:id" element={<ArticleView user={user} />} />
          <Route path="/editor" element={user ? <Editor user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
