import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch movie: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        console.log('Movie data:', data);
        setMovie(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Movie fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : !movie ? (
          <div>No movie found for ID {id}. Check http://localhost:4000/movies/{id}.</div>
        ) : (
          <>
            <h1>{movie.title}</h1>
            <p>{`${movie.time} min`}</p>
            <div data-testid="genres">
              {movie.genres.map(genre => (
                <span key={genre} data-testid={`genre-${genre}`}>
                  {genre}
                </span>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Movie;