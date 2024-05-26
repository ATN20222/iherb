import React, { useState } from "react";
import './MyProfile.css'
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import PersonalSettings from "./PersonalSettings/PersonalSettings";
import EditEmail from "./PersonalSettings/EditEmail";

const MyProfileSideBar = ({ onSelectComponent }) => {
    const { t, i18n } = useTranslation();
    const [activeLink, setActiveLink] = useState("PersonalSettings");
    const [isProfileMenuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!isProfileMenuOpen);
    };

    const handleLinkClick = (component) => {
        onSelectComponent(component);
        setActiveLink(component);
    };
    const Logout = () => {
        console.log("clear")
        localStorage.clear();
        localStorage.setItem("language" , "en");
        window.location.reload();
    };
    
    return (
        <div className={`col-lg-2 col-3 MyProfileList ${isProfileMenuOpen ? 'OpenSideMenu' : ''}`}>
            <div className="SideProfileMenu" onClick={handleMenuClick}>
                MENU
            </div>
            <div className="PrfileHeader">
                <h5>{t("MyProfile")}</h5>
                <hr />
            </div>
            <ul className="list-unstyled">
                
                <li className={`list-item ${activeLink === 'PersonalSettings' ? 'activeLink' : ''}`}>
                    <Link className="text-decoration-none link-dark" to="/myprofile/Help" onClick={() => handleLinkClick('PersonalSettings')}>
                        <span> {t("PersonalSettings")}</span>
                    </Link>
                </li>

                <li className={`list-item ${activeLink === 'Help' ? 'activeLink' : ''}`}>
                    <Link className="text-decoration-none link-dark" to="/myprofile/Help" onClick={() => handleLinkClick('Help')}>
                        <span> {t("Help")}</span>
                    </Link>
                </li>
                <li className={`list-item ${activeLink === 'WellnessQuiz' ? 'active' : ''}`}>
                    <Link className="text-decoration-none link-dark" to="/wellnessquiz">
                        <span> {t("Wellness Quiz")} </span>
                    </Link>
                </li>

                <li className={`list-item ${activeLink === 'Wallet' ? 'activeLink' : ''}`}>
                    <Link className="text-decoration-none link-dark" onClick={() => handleLinkClick('Wallet')}>
                        <span> {t("Wallet")} </span>
                    </Link>
                </li>
                {/* <li className={`list-item ${activeLink === 'Refund' ? 'activeLink' : ''}`}>
                    <Link className="text-decoration-none link-dark" onClick={() => handleLinkClick('Refund')}>
                        <span> {t("Refund")} </span>
                    </Link>
                </li> */}


                <li className={`list-item ${activeLink === 'Notifications' ? 'activeLink' : ''}`}>
                    <Link className="text-decoration-none link-dark" onClick={() => handleLinkClick('Notifications')}>
                        <span> {t("Notify")} </span>
                    </Link>
                </li>

                <li className={`list-item ${activeLink === 'Lists' ? 'activeLink' : ''}`}>
                    <Link className="text-decoration-none link-dark" onClick={() => handleLinkClick('Lists')}>
                        <span> {t("Lists")} </span>
                    </Link>
                </li>

                <li className={`list-item ${activeLink === 'MyOrders' ? 'activeLink' : ''}`}>
                    <Link className="text-decoration-none link-dark" onClick={() => handleLinkClick('MyOrders')}>
                        <span> {t("MyOrders")} </span>
                    </Link>
                </li>
                <span onClick={Logout}>
                    <Link className="text-decoration-none link-dark" >
                        <span> {t("Logout")} </span>
                    </Link>
                </span>
                

            </ul>
        </div>
    );
}

export default MyProfileSideBar;
