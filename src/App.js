import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error, Landing, Register } from './pages';
import { AddJobs, AllJobs, Profile, SharedLayout, Stats } from '../src/pages/dashboard';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './pages/ProtectedRoute';
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position='top-center' />

      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        ></Route>
        <Route path='/' element={<SharedLayout />}>
          <Route index path='stats' element={<Stats />} />
          <Route path='add-jobs' element={<AddJobs />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='landing' element={<Landing />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
