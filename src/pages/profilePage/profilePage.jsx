import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logoSvg from '../../components/Footer/FooterImage/Logo (1).svg';
import loupe from '../../images/iconbase (5).svg';
import globus from '../../images/iconbase (6).svg';
import darkBurgerMenu from '../../components/Header/iconbase (12).svg';
import css from './profile.module.css'

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('trips'); // Управление табами

    // Состояния для редактирования
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const savedUser = localStorage.getItem('accInfo');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setName(parsedUser.name);
            setEmail(parsedUser.email);
            setAvatar(parsedUser.avatar);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleSave = () => {
        const updatedUser = { ...user, name, email, avatar };
        localStorage.setItem('accInfo', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        window.dispatchEvent(new Event('userUpdate')); 
    };

    const handleLogout = () => {
        localStorage.removeItem('accInfo');
        navigate('/login');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // ФУНКЦИЯ ДЛЯ ТЕСТА: Переключение роли Админа
    const toggleAdminRole = () => {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        const updatedUser = { ...user, role: newRole };
        localStorage.setItem('accInfo', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    if (!user) return null;

    return (
        <div className={css.page}>
            <Header
                color={'black'} logosvg={logoSvg} background={'#212B36'}
                secondColor={'white'} loupe={loupe} globus={globus} burgerMenu={darkBurgerMenu}
            />

            <div className={css.container}>
                <div className={css.profileCard}>
                    <div className={css.banner}>
                        <button className={css.roleToggle} onClick={toggleAdminRole}>
                            Debug: {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </button>
                    </div>
                    
                    <div className={css.content}>
                        <div className={css.avatarWrapper}>
                            <img src={avatar} alt="User Avatar" className={css.mainAvatar} />
                            {isEditing && <div className={css.avatarOverlay}>Change Photo</div>}
                        </div>

                        <div className={css.info}>
                            {isEditing ? (
                                <div className={css.editForm}>
                                    <input className={css.editInput} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                                    <input className={css.editInput} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    <div className={css.fileInputWrapper}>
                                        <label htmlFor="fileUpload" className={css.fileLabel}>📁 Upload Photo</label>
                                        <input id="fileUpload" type="file" accept="image/*" onChange={handleFileChange} className={css.hiddenInput} />
                                    </div>
                                    <input className={css.editInput} value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="Or paste Image URL" />
                                </div>
                            ) : (
                                <>
                                    <h1>{user.name} {user.role === 'admin' && <span title="Administrator">👑</span>}</h1>
                                    <p className={css.email}>{user.email}</p>
                                    <span className={css.badge}>{user.role === 'admin' ? 'Administrator' : 'International Student'}</span>
                                </>
                            )}
                        </div>

                        {/* ТАБЫ */}
                        <div className={css.tabs}>
                            <button className={activeTab === 'trips' ? css.activeTab : ''} onClick={() => setActiveTab('trips')}>Visited Trips</button>
                            <button className={activeTab === 'comments' ? css.activeTab : ''} onClick={() => setActiveTab('comments')}>Comments</button>
                            <button className={activeTab === 'blogs' ? css.activeTab : ''} onClick={() => setActiveTab('blogs')}>Blogs</button>
                            {user.role === 'admin' && (
                                <button className={`${css.adminTab} ${activeTab === 'admin' ? css.activeTab : ''}`} onClick={() => setActiveTab('admin')}>Admin Panel</button>
                            )}
                        </div>

                        {/* КОНТЕНТ ТАБОВ */}
                        <div className={css.tabPanel}>
                            {activeTab === 'trips' && (
                                <div className={css.emptyState}>No visited trips yet. Explore our tours!</div>
                            )}
                            {activeTab === 'comments' && (
                                <div className={css.list}>
                                    <div className={css.listItem}>"Amazing experience at Ala-Too!" - <span>2 days ago</span></div>
                                </div>
                            )}
                            {activeTab === 'blogs' && (
                                <div className={css.list}>
                                    <button className={css.createBtnSmall}>+ Create New Post</button>
                                    <div className={css.emptyState}>No blogs written yet.</div>
                                </div>
                            )}
                            {activeTab === 'admin' && user.role === 'admin' && (
                                <div className={css.adminSection}>
                                    <h3>Create a New Tour</h3>
                                    <div className={css.adminForm}>
                                        <input type="text" placeholder="Tour Title" className={css.editInput} />
                                        <input type="number" placeholder="Price $" className={css.editInput} />
                                        <textarea placeholder="Tour Description" className={css.editTextarea}></textarea>
                                        <button className={css.saveBtn}>Publish Tour</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={css.actions}>
                            {isEditing ? (
                                <button className={css.saveBtn} onClick={handleSave}>Save Changes</button>
                            ) : (
                                <button className={css.editBtn} onClick={() => setIsEditing(true)}>Edit Profile</button>
                            )}
                            <button className={css.logoutBtn} onClick={handleLogout}>
                                {isEditing ? 'Cancel' : 'Logout and Exit'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;