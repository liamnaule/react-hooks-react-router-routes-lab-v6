import Home from './pages/Home.jsx';
import Directors from './pages/Directors.jsx';
import Actors from './pages/Actors.jsx';
import Movie from './pages/Movie.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const routes = [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/directors',
    element: <Directors />,
    errorElement: <ErrorPage />
  },
  {
    path: '/actors',
    element: <Actors />,
    errorElement: <ErrorPage />
  },
  {
    path: '/movie/:id',
    element: <Movie />,
    errorElement: <ErrorPage />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
];

export default routes;