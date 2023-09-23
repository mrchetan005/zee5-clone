
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Home, TvShows, Signin, Register, Details, ShowDetails, MovieList, Profile, Search, Movies, WebSeries } from './pages';
import NotFound from './components/notFound';
import PrivateRoute from './components/HOC/PrivateRoute';
import Layout from './components/layout';
import AuthRequired from './components/authCommon/AuthRequired';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tvshows' element={<TvShows />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/webseries' element={<WebSeries />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/register' element={<Register />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/details/show/:id' element={<ShowDetails />} />
          <Route path='/search' element={<Search />} />
          <Route path='/more/:type/:category' element={<MovieList />} />
          <Route path='/profile/*' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/authRequired' element={<AuthRequired />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Provider>
  )
}

export default App;
