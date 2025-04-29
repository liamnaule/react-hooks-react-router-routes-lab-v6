import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';

function Directors() {
  const [directors, setDirectors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/directors')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch directors: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        console.log('Directors data:', data); 
        if (!Array.isArray(data)) throw new Error('Expected an array of directors');
        setDirectors(data);
      })
      .catch(err => {
        console.error('Directors fetch error:', err);
        setError(err.message);
      });
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Directors Page</h1>
        {error ? (
          <div>Error: {error}</div>
        ) : directors.length === 0 ? (
          <div>No directors found. Check http://localhost:4000/directors.</div>
        ) : (
          directors.map(director => (
            <article key={director.id}>
              <h2>{director.name}</h2>
              <ul>
                {director.movies.map(movie => (
                  <li key={movie}>{movie}</li>
                ))}
              </ul>
            </article>
          ))
        )}
      </main>
    </>
  );
}

export default Directors;