import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
const PersonalSettings = ({ onSelectComponent })=>{
    const { t, i18n } = useTranslation();

    return(
        
        <ul className="list-unstyled">
            <div className="CurrentLocationInProfile">
                            <h5>{t("PersonalSettings")}</h5>
                        </div>
            <li className="list-item ItemInPersonalSettings">
                <FontAwesomeIcon icon={faCaretLeft}/>
                <Link className="text-decoration-none link-dark"  onClick={() => onSelectComponent('EditProfile')}>
                    <span> {t("EditPersonalProfile")} </span>
                </Link>
                
            </li>

            <li className="list-item ItemInPersonalSettings">
                <FontAwesomeIcon icon={faCaretLeft}/>
                <Link className="text-decoration-none link-dark" onClick={() => onSelectComponent('ChangePassword')}>
                    <span>{t("Password")}</span>
                </Link>
                
            </li>


            <li className="list-item ItemInPersonalSettings">
                <FontAwesomeIcon icon={faCaretLeft}/>
                <Link className="text-decoration-none link-dark" to="/myprofile/editemail"   onClick={() => onSelectComponent('EditEmail')}>
                    <span>{t("Email")}</span>
                </Link>
                
            </li>

            <li className="list-item ItemInPersonalSettings">
                <FontAwesomeIcon icon={faCaretLeft}/>
                <Link className="text-decoration-none link-dark"  onClick={() => onSelectComponent('Delivery')}>
                    <span>{t("Delivery")}</span>
                </Link>
                
            </li>

        </ul>
    );
}
export default PersonalSettings;