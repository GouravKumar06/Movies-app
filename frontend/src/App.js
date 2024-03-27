import { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Store from './redux/store';
import { loadAllUser, loadUser } from './redux/actions/user';


import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './pages/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './pages/PrivateRoute';
import Profile from './pages/Profile';
import { loadGenres } from './redux/actions/genre';
import AdminRoute from './pages/Admin/AdminRoute';
import GenreList from './pages/Admin/GenreList';
import { loadAllMovies, loadNewMovies, loadRandomMovies, loadTopMovies } from './redux/actions/movies';
import CreateMovie from './pages/Admin/CreateMovie';
import AdminMoviesList from './pages/Admin/AdminMoviesList';
import UpdateMovie from './pages/Admin/UpdateMovie';
import MoviesDetails from './pages/MoviesDetails';
import AllMovies from './pages/AllMovies';
import AllComments from './pages/Admin/AllComments';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
function App() {


  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadAllUser())
    Store.dispatch(loadGenres());
    Store.dispatch(loadAllMovies());
    Store.dispatch(loadNewMovies());
    Store.dispatch(loadRandomMovies());
    Store.dispatch(loadTopMovies());
  })
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/movies/:id" element={<MoviesDetails />} />
        <Route path='/profile' element = {
          <PrivateRoute >
            <Profile/>
          </PrivateRoute>
        }/>

        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/movies/genre" element={<GenreList />} ></Route>
          <Route path="/admin/movies/create" element={<CreateMovie />} />
          <Route path="/admin/movies-list" element={<AdminMoviesList />} />
          <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
          <Route path="/admin/movies/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/movies/comments" element={<AllComments />} /> 
        </Route>

      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
