import './navbar.css';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OwnerAuthContext } from '../../context/OwnerAuthContext';

function Navbar() {
  const { owner, dispatch } = useContext(OwnerAuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('ownerauth');
    navigate('/owner-signin');
  };

  return (
    <div className='navbars'>
      <div className={owner ? 'nav-container-users' : 'nav-containers'}>
        <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className='logo'>guestbooking</span>
        </Link>
        <div className='nav-itemss'>
          {owner ? (
            <>
              <div
                className={open ? 'users' : 'user-profiles'}
                onClick={() => setOpen(!open)}>
                <div className='round-circles'>
                  <span>{owner.name.charAt(0).toUpperCase()}</span>
                </div>
                <span>{owner.name}</span>
              </div>
              {open && (
                <div className='logouts' onClick={logout}>
                  Logout
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to={'/owner-signin'}
                style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className='nav-buttons'>Sign In</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
