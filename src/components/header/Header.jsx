import React, { useContext, useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faHouse,
  faCalendarDays,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } });
    navigate('/rooms', { state: { destination, dates, options } });
  };

  const { user } = useContext(AuthContext);

  return (
    <div className='header'>
      <div className='header-container'>
        <div className='header-list'>
          <div className='header-list-items active'>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className='header-list-items'>
            <FontAwesomeIcon icon={faHouse} />
            <span>House</span>
          </div>
        </div>
        {type !== 'list' && (
          <>
            <h1 className='header-title'>Find your next stay</h1>
            <p className='header-desc'>
              Search low prices on homes with beautiful rooms...
            </p>
            {!user ? (
              <Link
                to={'/guest-signin'}
                style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className='header-btn'>Sign In / Register</button>
              </Link>
            ) : (
              ''
            )}

            <div className='header-search'>
              <div className='header-search-item input'>
                <label htmlFor='search'>
                  <FontAwesomeIcon icon={faBed} className='header-icon' />
                </label>
                <input
                  type='text'
                  placeholder='Where are you going?'
                  id='search'
                  className='header-search-input'
                  onClick={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className='header-search-item select'>
                <label htmlFor='calendar'>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className='header-icon'
                  />
                </label>
                <span
                  className='header-search-text'
                  id='calendar'
                  onClick={() => setOpenDate(!openDate)}>
                  {`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(
                    dates[0].endDate,
                    'dd/MM/yyyy'
                  )}`}
                </span>
                {openDate ? (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className='date'
                    minDate={new Date()}
                  />
                ) : (
                  ''
                )}
              </div>
              <div className='header-search-item select'>
                <label htmlFor='person'>
                  <FontAwesomeIcon icon={faPerson} className='header-icon' />
                </label>
                <span
                  className='header-search-text'
                  id='person'
                  onClick={() => setOpenOptions(!openOptions)}>
                  {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>
                {openOptions && (
                  <div className='options'>
                    <div className='optionItem'>
                      <span className='optionText'>Adult</span>
                      <div className='optionCounter'>
                        <button
                          disabled={options.adult <= 1}
                          className='optionCounterButton'
                          onClick={() => handleOption('adult', 'd')}>
                          -
                        </button>
                        <span className='optionCounterNumber'>
                          {options.adult}
                        </span>
                        <button
                          className='optionCounterButton'
                          onClick={() => handleOption('adult', 'i')}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className='optionItem'>
                      <span className='optionText'>Children</span>
                      <div className='optionCounter'>
                        <button
                          disabled={options.children <= 0}
                          className='optionCounterButton'
                          onClick={() => handleOption('children', 'd')}>
                          -
                        </button>
                        <span className='optionCounterNumber'>
                          {options.children}
                        </span>
                        <button
                          className='optionCounterButton'
                          onClick={() => handleOption('children', 'i')}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className='optionItem'>
                      <span className='optionText'>Room</span>
                      <div className='optionCounter'>
                        <button
                          disabled={options.room <= 1}
                          className='optionCounterButton'
                          onClick={() => handleOption('room', 'd')}>
                          -
                        </button>
                        <span className='optionCounterNumber'>
                          {options.room}
                        </span>
                        <button
                          className='optionCounterButton'
                          onClick={() => handleOption('room', 'i')}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='header-search-item'>
                <button className='header-btn-search' onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
