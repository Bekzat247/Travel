import Header from '../../components/Header/Header'
import loupe from '../../images/iconbase (5).svg'
import globus from '../../images/iconbase (6).svg'
import darkBurgerMenu from '../../components/Header/iconbase (12).svg'
import logoSvg from '../../components/Footer/FooterImage/Logo (1).svg'
import css from './login.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isAdmin, setIsAdmin] = useState(false) // Стейт для админства
    const [isLoading, setIsLoading] = useState(false)

    // Функция для обработки локального файла фото
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result); // Сохраняем картинку в формате Base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        const accContent = {
            name: name, 
            email: email, 
            avatar: avatar || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
            role: isAdmin ? 'admin' : 'user', // Установка роли
            joinedDate: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
            visitedTrips: [],
            myComments: [],
            myBlogs: []
        }

        setTimeout(() => {
            localStorage.setItem('accInfo', JSON.stringify(accContent))
            window.dispatchEvent(new Event('userUpdate')); // Синхронизация с хедером
            setIsLoading(false)
            navigate('/profile') // После логина сразу в профиль
        }, 1500)
    }

    return (
        <div className={css.page}>
            <Header 
                color={'black'} logosvg={logoSvg} background={'#212B36'} 
                secondColor={'white'} loupe={loupe} globus={globus} burgerMenu={darkBurgerMenu}
            />
            
            <div className={css.wrapper}>
                <h1>Create Account</h1>
                <p>Join the international travel community</p>

                <form className={css.inputs} onSubmit={handleSubmit}>
                    <div className={css.inputGroup}>
                        <label>Full Name</label>
                        <input type="text" placeholder='John Doe' required onChange={(e) => setName(e.target.value)} value={name}/>
                    </div>

                    <div className={css.inputGroup}>
                        <label>Email Address</label>
                        <input type="email" placeholder='example@alatoo.edu.kg' required onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </div>

                    {/* Загрузка фото */}
                    <div className={css.inputGroup}>
                        <label>Profile Photo</label>
                        <div className={css.fileContainer}>
                            <label htmlFor="fileInput" className={css.fileLabel}>
                                {avatar ? "✅ Photo Selected" : "📁 Upload from device"}
                            </label>
                            <input 
                                id="fileInput"
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                className={css.hiddenInput}
                            />
                        </div>
                        <input 
                            type="url" 
                            placeholder='Or paste Image URL' 
                            onChange={(e) => setAvatar(e.target.value)} 
                            value={avatar.startsWith('data:') ? '' : avatar} // Очищаем поле, если загружен файл
                        />
                    </div>

                    {/* Выбор роли (Админ) */}
                    <div className={css.adminCheckbox}>
                        <input 
                            type="checkbox" 
                            id="adminOpt" 
                            checked={isAdmin} 
                            onChange={() => setIsAdmin(!isAdmin)}
                        />
                        <label htmlFor="adminOpt">I want to create and manage tours (Admin)</label>
                    </div>

                    <button type="submit" className={css.loginBtn} disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Create & Join'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login