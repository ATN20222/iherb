import './Header.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/Images/I_H_H_LOGO.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import SideBar from './SideBar';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [NavFont, setNavFont] = useState('LightFontEn');
    const [searchQuery, setSearchQuery] = useState('');
    const [IsLoggedIn , setIsLoggedIn] = useState(false);
    const [ActiveMenu , setActiveMenu] = useState(false);
    useEffect(() => {

        const isAuthenticated = !!localStorage.getItem("token");
        setIsLoggedIn( isAuthenticated ? true : false);
        if (i18n.language === 'ar') {
            setNavFont('LightFontAr');
        } else {
            setNavFont('LightFontEn');
        }
    }, [i18n.language]);
    const ActiveSideBar = ()=>{
        setActiveMenu( !ActiveMenu );
    }
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng); 
        window.location.reload();
    };
    return (
        <header>
            <div className="container">
                <div className="container row">
                    <div className="col-lg-12 d-flex justify-content-end">
                        <button className='btn LangBtn' onClick={() => changeLanguage('ar')}><span>AR</span></button>
                        <button className='btn LangBtn' onClick={() => changeLanguage('en')}><span>EN</span></button>
                    </div>
                </div>
            </div>
            <nav className="navbar">
                <div className="Container">
                    <div className="row">
                        <div className="col-lg-3">
                            <Link className="navbar-brand Center " to="/">
                                <img src={Logo} alt="" width="50px" />

                                <span className='LogoWords Center'>
                                    <span className='Word-1'>I</span> <span className='Word-2'>HONEY</span><span className='Word-3'>HERB</span>
                                </span>
                            </Link>
                        </div>
                        <div className="col-lg-9 RightNav">
                            <ul class="list-unstyled row">
                                <li className="nav-item col-lg-2">
                                    <Link className={`nav-link ${NavFont}`} to="offers">{t('Deals')}</Link>
                                </li>
                                <li className="nav-item col-lg-2">
                                    <Link className={`nav-link ${NavFont}`} to="products">{t('products')}</Link>
                                </li>
                                <li className="nav-item col-lg-2">
                                    <Link className={`nav-link ${NavFont}`} to="myprofile/lists">{t('Lists')}</Link>
                                </li>
                                <li className="nav-item col-lg-3 SearchContainer">
                                <input 
                                        className='form-control' 
                                        type="text" 
                                        placeholder={t('SearchProducts')} 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Link className='SearchLink' to={`/products?search=${searchQuery}`}>
                                        
                                            <FontAwesomeIcon icon={faSearch} />
                                        
                                    </Link>
                                </li>
                                {!IsLoggedIn?
                                        <li className="nav-item col-lg-2">
                                        <Link className={`nav-link ${NavFont}`} to="Login">
                                            <span className='LoginText'>{t('Login')} </span>
                                            <FontAwesomeIcon icon={faUser} />
                                        </Link>
                                    </li>
                                    :
                                    <li className="nav-item col-lg-2">
                                        <Link className={`nav-link ${NavFont}`} to="myprofile">
                                            <span className='LoginText'>{t('MyProfile')} </span>
                                            <FontAwesomeIcon icon={faUser} />
                                        </Link>
                                    </li>
                                }
                                
                                <li className="nav-item col-lg-2">
                                    <Link className={`nav-link ${NavFont}`} to="cart">
                                        {t('Cart')} <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        <button className="MenuButton " onClick={ActiveSideBar}>&#9776;</button>
                        

                    </div>
                </div>
            </nav>
            <SideBar Active={ActiveMenu}/>

        </header>
    );
};

export default Navbar;
