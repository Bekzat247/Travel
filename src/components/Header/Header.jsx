import css from './Header.module.css'
import { NavLink, useNavigate } from "react-router-dom"
import dotsvg from '../../images/Ellipse.svg'
import borderSvg from './Divider.svg'
import { useEffect, useState, useRef } from 'react'

function Header({ color, logosvg, background, secondColor, loupe, globus, burgerMenu }) {
  const navigate = useNavigate()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpened, setIsSearchOpened] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState(null)
  const searchRef = useRef(null)

  useEffect(() => {
    // Проверка сохранённого пользователя
    const checkUser = () => {
      const savedUser = localStorage.getItem('accInfo')
      setUser(savedUser ? JSON.parse(savedUser) : null)
    }
    checkUser()

    // Скролл
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 10)
    }

    // Закрытие поиска по клику вне
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpened(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('userUpdate', checkUser)
    window.addEventListener('storage', checkUser)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('userUpdate', checkUser)
      window.removeEventListener('storage', checkUser)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('accInfo')
    setUser(null)
    window.dispatchEvent(new Event('userUpdate'))
    window.location.reload()
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/list?q=${encodeURIComponent(searchQuery.trim())}`)
    }
    setIsSearchOpened(false)
    setSearchQuery("")
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const navLinkClass = ({ isActive }) =>
    `${css.navLink} ${isActive ? css.active : ''}`

  return (
    <>
      <div className={`${css.wrapper} ${isScrolled ? css.scrolled : ''}`}>
        {/* LEFT */}
        <div className={css.navLeft}>
          <NavLink to='/'>
            <img src={logosvg} alt='logo' className={css.logo} />
          </NavLink>

          <NavLink to="/" end className={navLinkClass}>
            <span>Home</span>
          </NavLink>

          <NavLink to='/list' end className={navLinkClass}>
            <span>Components</span>
          </NavLink>

          <div className={css.pages}>
            <img src={dotsvg} alt='' />
            <select style={{ color: color }}>
              <option>Pages</option>
              <option value="/about">About</option>
              <option value="/contact">Contact</option>
            </select>
          </div>

          <NavLink to='/blog' end className={navLinkClass}>
            <span>Documentation</span>
          </NavLink>
        </div>

        {/* RIGHT */}
        <div className={css.navRight} ref={searchRef}>
          {/* Бургер — только mobile */}
          <button
            className={css.iconBtn}
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <img src={burgerMenu} alt="menu" />
          </button>

          {/* Поиск */}
          <div className={`${css.searchWrapper} ${isSearchOpened ? css.searchOpen : ''}`}>
            <form onSubmit={handleSearchSubmit} className={css.searchForm}>
              <input
                autoFocus={isSearchOpened}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <button
            className={css.iconBtn}
            onClick={() => setIsSearchOpened(prev => !prev)}
            aria-label="Search"
          >
            <img src={loupe} alt="search" />
          </button>

          <button className={css.iconBtn} aria-label="Language">
            <img src={globus} alt="language" />
          </button>

          <img src={borderSvg} alt="" className={css.divider} />

          {user ? (
            <div className={css.userGroup}>
              <div
                className={css.userProfile}
                onClick={() => navigate('/Profile')}
                style={{ background: background, color: secondColor }}
              >
                <img src={user.avatar} alt="avatar" className={css.userAvatar} title={user.name} />
                <span className={css.userName}>{user.name.split(' ')[0]}</span>
              </div>
              <button className={css.logoutBtn} onClick={handleLogout}>
                Exit
              </button>
            </div>
          ) : (
            <div className={css.authGroup}>
              <NavLink to='/login' style={{ color: color }}>Login</NavLink>
              <NavLink to='/login'>
                <button style={{ background: background, color: secondColor }} className={css.joinBtn}>
                  Join Us
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`${css.mobileMenu} ${isMobileMenuOpen ? css.mobileMenuOpen : ''}`}>
        <NavLink to="/" end className={navLinkClass} onClick={closeMobileMenu}>
          <span>Home</span>
        </NavLink>
        <NavLink to='/list' end className={navLinkClass} onClick={closeMobileMenu}>
          <span>Components</span>
        </NavLink>
        <NavLink to='/blog' end className={navLinkClass} onClick={closeMobileMenu}>
          <span>Documentation</span>
        </NavLink>

        {user ? (
          <button className={css.logoutBtn} onClick={handleLogout}>Exit</button>
        ) : (
          <NavLink to='/login' onClick={closeMobileMenu}>
            <button style={{ background: background, color: secondColor }} className={css.joinBtn}>
              Join Us
            </button>
          </NavLink>
        )}
      </div>
    </>
  )
}

export default Header