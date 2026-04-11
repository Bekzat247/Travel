import css from './Header.module.css'
import { NavLink, Navigate, useNavigate } from "react-router-dom"
import dotsvg from '../../images/Ellipse.svg'
import borderSvg from './Divider.svg'

import { useEffect, useState } from 'react'

function Header({ color, logosvg, background, secondColor, loupe, globus, burgerMenu }) {
  const navigate = useNavigate();

  const [isTop, setIsTop] = useState(false)
  const [IsSearchOpened, setIsSearchOpened] = useState(false)
  const [searchQuery, setSearchQuery] = useState("") // Состояние для текста поиска
  const [user, setUser] = useState(null)
  useEffect(() => {
    const savedUser = localStorage.getItem('accInfo')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsTop(scrollTop === 0);
    };
    window.addEventListener('scroll', handleScroll);
    const checkUser = () => {
      const savedUser = localStorage.getItem('accInfo');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();

    window.addEventListener("userUpdate", checkUser);
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("userUpdate", checkUser);
      window.removeEventListener("storage", checkUser);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('accInfo')
    setUser(null)
    window.location.reload()
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setIsSearchOpened(false);
  };
  const getNavLinkClass = ({ isActive }) => {
    console.log(isActive);
    
  }

  return (
    <div className={css.wrapper}>
      <div className={css.navLeft}>
        <NavLink to='/'>
          <img src={logosvg} alt='' />
        </NavLink>
        <NavLink onClick={getNavLinkClass}
          to="/"
          
        >
          <span>Home</span>
        </NavLink>
        <NavLink to='/list' end className={css.navLink}><span>Components</span></NavLink>
        <div className={css.pages}>
          <img src={dotsvg} alt='' />
          <select name="" id="" style={{ color: color }}>
            <option>Pages</option>
          </select>
        </div>
        <NavLink to='/blog' end className={css.navLink}><span>Documentation</span></NavLink>
      </div>

      <div className={css.navRight}>
        <button className={css.iconBtn}>
          <img src={burgerMenu} alt="" />
        </button>

        {IsSearchOpened && (
          <div className={css.searchWrapper}>
            <form onSubmit={handleSearchSubmit} className={css.searchForm} style={{ transform: IsSearchOpened ? 'translateX(-100px)' : 'translateX(100px)' }}>
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}

        <NavLink className='' onClick={() => setIsSearchOpened(!IsSearchOpened)}>
          <img src={loupe} alt="search" />
        </NavLink>

        <NavLink className='globus'><img src={globus} alt="" /></NavLink>
        <img src={borderSvg} alt="" />
        {user ? (
          <div className={css.userProfile} onClick={() => navigate('/Profile')} style={{ background: background, color: secondColor }}>
            <img src={user.avatar} alt="avatar" className={css.userAvatar} title={user.name} />
            <span className={css.userName}>{user.name.split(' ')[0]}</span>
          </div>
        ) : (
          <>
            <NavLink to={'/login'} style={{ color: color }}>Login</NavLink>
            <NavLink to={'/login'}>
              <button style={{ background: background, color: secondColor }} className={css.joinBtn}>
                Join Us
              </button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  )
}

export default Header