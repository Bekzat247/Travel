import css from './Filter.module.css'
import loupe from '../../images/iconbase.svg'
import pinsvg from './filterImage/ic_pin.svg'
import calendarsvg from './filterImage/ic_calendar.svg'
import userGroupSvg from './filterImage/ic_users_group.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


function Filter() {
   const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useState({
    destination: '',
    dates: [null, null],
    guests: { adults: 1, children: 0, infants: 0 }
  })
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (tabName) => {
    
    setActiveTab(tabName);
  };

  const closeTab = () => {
    setActiveTab(null);
  };

  const handleDestinationChange = (e) => {
    setSearchParams({
      ...searchParams,
      destination: e.target.value
    });
  };
const handleDateChange = (dates) => {
    const [start, end] = dates;
    setSearchParams({
      ...searchParams,
      dates: [start, end]
    });
  };
  const handleKeyPress = (e, nextTab) => {
  if (e.key === 'Enter') {
    setActiveTab(nextTab);
  }
  
};

 const handleSearch = () => {
    const params = new URLSearchParams({
      destination: searchParams.destination,
      startDate: searchParams.dates[0]?.toISOString().split('T')[0] || '',
      endDate: searchParams.dates[1]?.toISOString().split('T')[0] || '',
      adults: searchParams.guests.adults,
      children: searchParams.guests.children,
      infants: searchParams.guests.infants,
    });

    if (location.pathname === '/tours') {
      window.history.pushState(null, '', `/tours?${params.toString()}`);
    } else {
      navigate(`/list?${params.toString()}`);
    }
  };
  
  return (
    <div className={`${css.wrapper} ${activeTab !== null ? css.smallMargin : ''}`} 
    >
      <div 
        className={`${css.filterSection} ${activeTab == 'Site' ? css.smallPadding : ''}`}
        
      >
        <div className={css.tabMainContent}>
          <div 
            onClick={() => toggleTab('Site')} 
            className={css.filterButton}
          >
            <img src={pinsvg} alt="location" />
            Where we go?
          </div>
          <div 
            className={css.cancelButton} 
            onClick={closeTab}
            style={{
              opacity: activeTab === 'Site' ? 1 : 0,
              pointerEvents: activeTab === 'Site' ? 'auto' : 'none'
            }}
          >
            <div className={css.stick}
              style={{
                transform: activeTab === 'Site' ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
            ></div>
            <div className={css.stick}
              style={{
                transform: activeTab === 'Site' ? 'rotate(-45deg)' : 'rotate(0deg)',
              }}
            ></div>
          </div>
        </div>

        {/* HIDDEN CONTENT - DESTINATION */}
        <div 
          className={css.SiteHiddenContent}
          style={{
            display: activeTab === 'Site' ? 'flex' : 'none',
          }}
        >
          <input 
            type="text" 
            placeholder="Enter destination..."
            value={searchParams.destination}
            onChange={handleDestinationChange}
            onKeyPress={(e) => handleKeyPress(e, 'Date')}
          />
        </div>
      </div>

      <div className={css.divider}></div>

      {/* DATE TAB */}
      <div 
        className={`${css.filterSection} ${activeTab == 'Date' ? css.smallPadding : ''}`}
      >
        <div className={css.tabMainContent}>
          <div 
            onClick={() => toggleTab('Date')} 
            className={css.filterButton}
          >
            <img src={calendarsvg} alt="calendar" />
            Departure Day
          </div>
          <div 
            className={css.cancelButton} 
            onClick={closeTab}
            style={{
              opacity: activeTab === 'Date' ? 1 : 0,
              pointerEvents: activeTab === 'Date' ? 'auto' : 'none'
            }}
          >
            <div className={css.stick}
              style={{
                transform: activeTab === 'Date' ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
            ></div>
            <div className={css.stick}
              style={{
                transform: activeTab === 'Date' ? 'rotate(-45deg)' : 'rotate(0deg)',
              }}
            ></div>
          </div>
        </div>

        {/* HIDDEN CONTENT - DATE */}
        <div 
          className={css.SiteHiddenContent}
          style={{
            display: activeTab === 'Date' ? 'flex' : 'none',
          }}
        >
          <DatePicker
            selectsRange
            startDate={searchParams.dates[0]}
            endDate={searchParams.dates[1]}
            onChange={handleDateChange}
            placeholderText="Select dates"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            onKeyDown={(e) => handleKeyPress(e, 'Guest')}
            className={css.datePickerInput}
          />
        </div>
      </div>

      <div className={css.divider}></div>

      {/* GUEST TAB */}
      <div 
        className={`${css.filterSection} ${activeTab == 'Guest' ? css.bigPadding : ''}`}
      >
        <div className={css.tabMainContent}>
          <div 
            onClick={() => toggleTab('Guest')} 
            className={css.filterButton}
          >
            <img src={userGroupSvg} alt="users" />
            Guest
          </div>
          <div 
            className={css.cancelButton} 
            onClick={closeTab}
            style={{
              opacity: activeTab === 'Guest' ? 1 : 0,
              pointerEvents: activeTab === 'Guest' ? 'auto' : 'none'
            }}
          >
            <div className={css.stick}
              style={{
                transform: activeTab === 'Guest' ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
            ></div>
            <div className={css.stick}
              style={{
                transform: activeTab === 'Guest' ? 'rotate(-45deg)' : 'rotate(0deg)',
              }}
            ></div>
          </div>
        </div>

        {/* HIDDEN CONTENT - GUEST */}
        <div 
          className={css.SiteHiddenContent}
          style={{
            display: activeTab === 'Guest' ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div className={css.guestInput}>
            <label>Adults</label>
            <input type="number" defaultValue="1" min="1" />
          </div>
          <div className={css.guestInput}>
            <label>Children</label>
            <input type="number" defaultValue="0" min="0" />
          </div>
          <div className={css.guestInput}>
            <label>Infants</label>
            <input type="number" defaultValue="0" min="0" />
          </div>
        </div>
      </div>

      {/* SEARCH BUTTON */}
      <button className={css.searchButton} onClick={handleSearch}>
        <img src={loupe} alt="search" />
      </button>
    </div>
  )
}

export default Filter