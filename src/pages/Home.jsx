import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles, fetchPersonalizedFeed, fetchTags } from '../api.js';

function Home({ user }) {
  const [globalArticles, setGlobalArticles] = useState([]);
  const [personalized, setPersonalized] = useState([]);
  const [tags, setTags] = useState([]);
  const [feedMode, setFeedMode] = useState('personal');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticles()
      .then(setGlobalArticles)
      .finally(() => setLoading(false));
    fetchTags().then(setTags).catch(() => setTags([]));
  }, []);

  useEffect(() => {
    if (user) {
      fetchPersonalizedFeed(user.id).then(setPersonalized).catch(() => setPersonalized([]));
    }
  }, [user]);

  const feed = user && feedMode === 'personal' ? personalized : globalArticles;

  return (
    <section className="page-container">
      <div className="home-intro">
        <h1>Welcome to Tessa Pulse</h1>
        <p>Track your favorite tags and enjoy an affinity-biased recommended feed for each reader.</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <strong>Feed</strong>
            <p>{user ? 'Your affinity-based recommendations appear here.' : 'Public chronological feed for all readers.'}</p>
          </div>
          {user && (
            <div className="feed-toggle">
              <button onClick={() => setFeedMode('personal')} className={feedMode === 'personal' ? 'active' : ''}>Personalized</button>
              <button onClick={() => setFeedMode('global')} className={feedMode === 'global' ? 'active' : ''}>Global</button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="empty-state">Loading articles...</div>
        ) : feed.length ? (
          <div className="article-grid">
            {feed.map((article) => (
              <article key={article.id} className="card">
                <h2>{article.title}</h2>
                <p className="summary">{article.summary}</p>
                <div className="meta">{article.author} · {new Date(article.publishedAt).toLocaleDateString()}</div>
                <div className="tag-list">{article.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
                <Link to={`/article/${article.id}`} className="button">Read</Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">No articles found yet.</div>
        )}
      </div>

      <div className="panel small-panel">
        <strong>Tag catalogue</strong>
        <div className="tag-list-wrap">
          {tags.length ? tags.map((tag) => <span key={tag} className="tag">{tag}</span>) : <span>No tags yet.</span>}
        </div>
      </div>
    </section>
  );
}

export default Home;
