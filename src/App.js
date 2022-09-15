import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Rooms from './pages/rooms/Rooms';
import GuestRoom from './pages/guestRoom/GuestRoom';
import OwnerSignup from './pages/owner/OwnerSignup';
import Signin from './pages/owner/Signin';
import Signup from './pages/guest/Signup';
import GuestSignin from './pages/guest/Signin';
import { hotelColumns, roomColumns } from './datatablesource';
import List from './pages/list/List';
import { OwnerAuthContext } from './context/OwnerAuthContext';
import NewHome from './pages/newhome/NewHome';
import NewRoom from './pages/newroom/NewRoom';
import { useContext } from 'react';
import Navbar from './components/ownnav/Navbar';

function App() {
  const ProtectedRoute = ({ children }) => {
    const { owner } = useContext(OwnerAuthContext);

    if (!owner) {
      return <Navigate to='/owner-signin' />;
    }

    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/room/:id' element={<GuestRoom />} />
        <Route path='/owner-signup' element={<OwnerSignup />} />
        <Route path='/owner-signin' element={<Signin />} />
        <Route path='/guest-signup' element={<Signup />} />
        <Route path='/guest-signin' element={<GuestSignin />} />

        <Route path='/home/ownerHomes'>
          <Route
            index
            element={
              <ProtectedRoute>
                <List columns={hotelColumns} />
              </ProtectedRoute>
            }
          />

          <Route
            path='new'
            element={
              <ProtectedRoute>
                <NewHome />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='/room/ownerRooms'>
          <Route
            index
            element={
              <ProtectedRoute>
                <List columns={roomColumns} />
              </ProtectedRoute>
            }
          />

          <Route
            path='new'
            element={<ProtectedRoute>{<NewRoom />}</ProtectedRoute>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
