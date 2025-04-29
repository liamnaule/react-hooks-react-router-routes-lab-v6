import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import MovieCard from '../components/MovieCard.jsx';

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/movies')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch movies: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        console.log('Movies data:', data); // Debug: Inspect data
        if (!Array.isArray(data)) throw new Error('Expected an array of movies');
        setMovies(data);
      })
      .catch(err => {
        console.error('Movies fetch error:', err);
        setError(err.message);
      });
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Home Page</h1>
        {error ? (
          <div>Error: {error}</div>
        ) : movies.length === 0 ? (
          <div>No movies found. Check http://localhost:4000/movies.</div>
        ) : (
          movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </main>
    </>
  );
}

export default Home;
