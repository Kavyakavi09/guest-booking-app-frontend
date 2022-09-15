import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('guestauth');
    navigate('/');
  };

  return (
    <div className='navbar'>
      <div className={user ? 'nav-container-user' : 'nav-container'}>
        <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className='logo'>guestbooking</span>
        </Link>
        <div className='nav-items'>
          {user ? (
            <>
              <div
                className={open ? 'user' : 'user-profile'}
                onClick={() => setOpen(!open)}>
                <span className='round-circle'>
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span>{user.name}</span>
              </div>
              {open && (
                <div className='logout' onClick={logout}>
                  Logout
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to={'/owner-signup'}
                style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className='nav-button'>For Owner</button>
              </Link>
              <Link
                to={'/guest-signup'}
                style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className='nav-button'>For Guest</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
