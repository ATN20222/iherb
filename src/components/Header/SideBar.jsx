import { faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const SideBar = ({Active})=>{
    const { t, i18n } = useTranslation();
    const [NavFont, setNavFont] = useState('LightFontEn');
    const [searchQuery, setSearchQuery] = useState('');
    const [IsLoggedIn , setIsLoggedIn] = useState(false);
    useEffect(() => {

        const isAuthenticated = !!localStorage.getItem("token");
        setIsLoggedIn( isAuthenticated ? true : false);
        if (i18n.language === 'ar') {
            setNavFont('LightFontAr');
        } else {
            setNavFont('LightFontEn');
        }
    }, [i18n.language]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng); 
        window.location.reload();
    };
    return(

        <div className={`SideBar ${Active&&" ActiveSideBar "}`}>
            <ul class="list-unstyled">
                                <li className="nav-item  SearchContainer">
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
                                <li className="nav-item ">
                                    <Link className={`nav-link ${NavFont}`} to="offers">{t('Deals')}</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className={`nav-link ${NavFont}`} to="products">{t('products')}</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className={`nav-link ${NavFont}`} to="myprofile/lists">{t('Lists')}</Link>
                                </li>
                                
                                {!IsLoggedIn?
                                        <li className="nav-item">
                                        <Link className={`nav-link ${NavFont}`} to="Login">
                                            <span className='LoginText'>{t('Login')} </span>
                                            <FontAwesomeIcon icon={faUser} />
                                        </Link>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <Link className={`nav-link ${NavFont}`} to="myprofile">
                                            <span className='LoginText'>{t('MyProfile')} </span>
                                            <FontAwesomeIcon icon={faUser} />
                                        </Link>
                                    </li>
                                }
                                
                                <li className="nav-item">
                                    <Link className={`nav-link ${NavFont}`} to="cart">
                                        {t('Cart')} <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                                    </Link>
                                </li>
                            </ul>
        </div>

    );
}
export default SideBar;