import css from './Header.module.css'
import { Link, Navigate, useNavigate } from "react-router-dom"
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

    // Вызываем при первой загрузке
    checkUser();

    // Слушаем наше кастомное событие
    window.addEventListener("userUpdate", checkUser);

    // Слушаем стандартное событие storage (если изменят в другой вкладке)
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

  return (
    <div className={css.wrapper}>
      <div className={css.navLeft}>
        <Link to='/'>
          <img src={logosvg} alt='' />
        </Link>
        <Link to='/'><span>Home</span></Link>
        <Link to='/list'><span>Components</span></Link>
        <div className={css.pages}>
          <img src={dotsvg} alt='' />
          <select name="" id="" style={{ color: color }}>
            <option>Pages</option>
          </select>
        </div>
        <Link to='/blog'><span>Documentation</span></Link>
      </div>

      <div className={css.navRight}>
        <button className={css.iconBtn}>
          <img src={burgerMenu} alt="" />
        </button>

        {IsSearchOpened && (
          <div className={css.searchWrapper}>
            <form onSubmit={handleSearchSubmit} className={css.searchForm} style={{ transform: IsSearchOpened ? 'transform: translateX(-100px)' : 'transform: translateX(100px)' }}>
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

        <Link onClick={() => setIsSearchOpened(!IsSearchOpened)}>
          <img src={loupe} alt="search" />
        </Link>

        <Link><img src={globus} alt="" /></Link>
        <img src={borderSvg} alt="" />
        {user ? (
          <div className={css.userProfile} onClick={() => navigate('/Profile')} style={{ background: background, color: secondColor }}>
            <img src={user.avatar} alt="avatar" className={css.userAvatar} title={user.name} />
            <span className={css.userName}>{user.name.split(' ')[0]}</span>
          </div>
        ) : (
          <>
            <Link to={'/login'} style={{ color: color }}>Login</Link>
            <Link to={'/login'}>
              <button style={{ background: background, color: secondColor }} className={css.joinBtn}>
                Join Us
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header