import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';

function Actors() {
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/actors')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch actors: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        console.log('Actors data:', data); // Debug: Inspect data
        if (!Array.isArray(data)) throw new Error('Expected an array of actors');
        setActors(data);
      })
      .catch(err => {
        console.error('Actors fetch error:', err);
        setError(err.message);
      });
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Actors Page</h1>
        {error ? (
          <div>Error: {error}</div>
        ) : actors.length === 0 ? (
          <div>No actors found. Check http://localhost:4000/actors.</div>
        ) : (
          actors.map(actor => (
            <article key={actor.id}>
              <h2>{actor.name}</h2>
              <ul>
                {actor.movies.map(movie => (
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

export default Actors;