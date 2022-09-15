import './sidebar.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { faHouse, faBed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/home' style={{ textDecoration: 'none' }}>
          <span className='logo'>Dashboard</span>
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>LISTS</p>
          <Link to='/home/ownerHomes' style={{ textDecoration: 'none' }}>
            <li>
              <FontAwesomeIcon icon={faHouse} className='icon' />
              <span>Houses</span>
            </li>
          </Link>
          <Link to='/room/ownerRooms' style={{ textDecoration: 'none' }}>
            <li>
              <FontAwesomeIcon icon={faBed} className='icon' />
              <span>Rooms</span>
            </li>
          </Link>
          <Link to='/home/ownerHomes/new' style={{ textDecoration: 'none' }}>
            <li>
              <FontAwesomeIcon icon={faHouse} className='icon' />
              <span>New home</span>
            </li>
          </Link>
          <Link to='/room/ownerRooms/new' style={{ textDecoration: 'none' }}>
            <li>
              <FontAwesomeIcon icon={faBed} className='icon' />
              <span>New room</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
