import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { publishArticle, fetchTags } from '../api.js';

function Editor({ user }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [availableTags, setAvailableTags] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTags().then(setAvailableTags).catch(() => setAvailableTags([]));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tags = tagInput.split(',').map((tag) => tag.trim()).filter(Boolean).slice(0, 3);
    if (!title || !summary || !body || !tags.length) {
      setStatus('Please complete all fields and add at least one tag.');
      return;
    }
    try {
      await publishArticle({ title, summary, body, author: user.username, tags });
      navigate('/');
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <section className="page-container">
      <div className="editor-panel">
        <h1>Publish a new article</h1>
        <form onSubmit={handleSubmit} className="editor-form">
          <label>Title</label>
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
          <label>Summary</label>
          <textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows="3" />
          <label>Body</label>
          <textarea value={body} onChange={(event) => setBody(event.target.value)} rows="8" />
          <label>Tags (comma separated, max 3)</label>
          <input value={tagInput} onChange={(event) => setTagInput(event.target.value)} placeholder="Tech, Wellness, Culture" />
          <div className="tag-suggestion">Suggested tags: {availableTags.slice(0, 6).join(', ') || 'none yet'}</div>
          {status && <div className="status-message">{status}</div>}
          <button type="submit" className="button">Publish Article</button>
        </form>
      </div>
    </section>
  );
}

export default Editor;
