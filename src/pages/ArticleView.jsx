import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticle, recordView } from '../api.js';

function ArticleView({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticle(id)
      .then((data) => {
        setArticle(data);
        if (user) {
          recordView(user.id, data.id).catch(() => {});
        }
      })
      .catch(() => setError('Unable to load article.'));
  }, [id, user]);

  if (error) {
    return <div className="page-container"><p>{error}</p></div>;
  }

  if (!article) {
    return <div className="page-container"><p>Loading article...</p></div>;
  }

  return (
    <section className="page-container">
      <button className="back-link" onClick={() => navigate(-1)}>← Back to feed</button>
      <article className="article-detail">
        <h1>{article.title}</h1>
        <div className="meta">By {article.author} · {new Date(article.publishedAt).toLocaleDateString()}</div>
        <div className="tag-list">{article.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
        <p>{article.body}</p>
      </article>
    </section>
  );
}

export default ArticleView;
