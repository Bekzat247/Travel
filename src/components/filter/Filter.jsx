import css from './Filter.module.css'
import loupe from '../../images/iconbase.svg'
import pinsvg from './filterImage/ic_pin.svg'
import calendarsvg from './filterImage/ic_calendar.svg'
import userGroupSvg from './filterImage/ic_users_group.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'


function Filter() {
  const [clickedDate, setclickedDate] = useState(false)
  const [clickedSite, setclickedSite] = useState(false)
  const [clickedGuest, setclickedGuest] = useState(false)

  return (
    <div className={css.wrapper} >
        <Link >
          <div style={{
      paddingBottom: `${ clickedSite ? 224: 0}px`

    }}>
            <div onClick={() =>setclickedSite(true)} className={css.filterButton}>
              <img src={pinsvg} alt="" />
              Where we go?
            </div>
            <div className={css.cancelButton} onClick={() => setclickedSite(false)}>
              <div className={css.stick} 
                style={clickedSite != false ? { 
                   transform: 'rotate(45deg)',
                   top: '45%'
                   
                } : {transform: 'rotate(0deg)',
                   top: '0%',display:'none'}}
              ></div>
              <div className={css.stick}
                style={clickedSite != false ? { 
                   transform: 'rotate(135deg)',
                   top: '45%'
                   
                } : {transform: 'rotate(0deg)',
                   top: '0%',display:'none'}}
              ></div>
            </div>
          </div>  
        </Link>
        <div></div>
        <Link>
          <div style={{
      paddingBottom: `${clickedDate ?  224 : 0}px`

    }}>
            <div onClick={() =>setclickedDate(true)} className={css.filterButton}>
              <img src={calendarsvg} alt="" />
              Departure Day
          </div>
          <div className={css.cancelButton} onClick={() => setclickedDate(false)}>
              <div className={css.stick} 
                style={clickedDate != false ? { 
                   transform: 'rotate(45deg)',
                   top: '45%'
                   
                } : {transform: 'rotate(0deg)',
                   top: '0%',display:'none'}}
              ></div>
              <div className={css.stick}
                style={clickedDate != false ? { 
                   transform: 'rotate(135deg)',
                   top: '45%'
                   
                } : {transform: 'rotate(0deg)',
                   top: '0%',display:'none'}}
              ></div>
            </div>
          </div>
        </Link> 
        <div></div>
        <Link >
          <div style={{
      paddingBottom: `${ clickedGuest ?  224 : 0}px`

    }}>
            <div onClick={() =>setclickedGuest(true)} className={css.filterButton}>
              <img src={userGroupSvg} alt="" />
              Guest
          </div>
          <div className={css.cancelButton} onClick={() => setclickedGuest(false)}>
              <div className={css.stick} 
                style={clickedGuest != false ? { 
                   transform: 'rotate(45deg)',
                   top: '45%'
                   
                } : {transform: 'rotate(0deg)',
                   top: '0%',display:'none'}}
              ></div>
              <div className={css.stick}
                style={clickedGuest != false ? { 
                   transform: 'rotate(135deg)',
                   top: '45%'
                   
                } : {transform: 'rotate(0deg)',
                   top: '0%',display:'none'}}
              ></div>
            </div>
          </div>
        </Link>
        <button><img src={loupe} alt="" /></button>
    </div>
  )
}

export default Filter