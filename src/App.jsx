
import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Signin from './pages/signin';
import Register from './pages/register';
import Details from './pages/details';
import MovieList from './pages/movieList';
import NotFound from './pages/notFound';
import Profile from './pages/profile';
import Search from './pages/search';
import ShowDetails from './pages/details/ShowDetails';
import PrivateRoute from './components/HOC/PrivateRoute';
import TvShows from './pages/tvShows';
import Movies from './pages/movies';
import WebSeries from './pages/webSeries';
import Layout from './components/layout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tvshows' element={<TvShows />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/webseries' element={<WebSeries />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/details/show/:id' element={<ShowDetails />} />
            <Route path='/search' element={<Search />} />

            <Route path='/more/:category' element={<MovieList />} />

            <Route path='/profile' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path='/profile/watchlist' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path='/profile/subscriptions' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path='/profile/rentals' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path='/profile/transactions' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path='/profile/rentals' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
