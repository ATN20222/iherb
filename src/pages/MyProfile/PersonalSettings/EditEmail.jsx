import { faCaretLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { ProfileService } from "../../../services/Services";

const EditEmail = () => {
    const { t, i18n } = useTranslation();
    const [oldEmail, setOldEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        // Regular expression for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setOldEmail(email);
        // Validate email and set error message accordingly
        if (!validateEmail(email)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    const handleSaveEmail = async () => {
        // Check if there's an email error before proceeding
        if (emailError) {
            alert("Please enter a valid email address");
            return;
        }

        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ProfileService.EditMail(auth_key, user_id, oldEmail);
            
            if (response.status) {
                localStorage.setItem('TempEmail', oldEmail);
                localStorage.setItem('Otp', response.data);
                window.location.href = "/OTP";
            } else {
                alert("Error changing email. Please try again.");
            }
        } catch (error) {
            console.error("Error changing email:", error);
            alert("Error changing email. Please try again.");
        }
    };

    return (
        <ul className="list-unstyled">
            <div className="CurrentLocationInProfile">
                <h5>
                    <span>
                        {t("PersonalSettings")}
                    </span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>
                        {t("Email")}
                    </span>
                </h5>
            </div>
            <li className="list-item">
                <div className="row EditMailRow">
                    <div className="col-lg-7 EditEmailInput">
                        <input
                            required
                            type="email"
                            className="col-lg-12 form-control EmailInput"
                            dir="rtl"
                            placeholder={t("NewMail")}
                            value={oldEmail}
                            onChange={handleEmailChange}
                        ></input>
                        {emailError && <span className="text-danger">{emailError}</span>}
                    </div>
                    <span className="col-lg-7 EditEmailSpan">{t("WeWillSendYou")}</span>
                    <div className="col-lg-7 LoginWithCol SaveEmail">
                        <button className="btn btn-warning col-12 LoginBtn" onClick={handleSaveEmail}>
                            <span className="Login">{t("Save")}</span>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    );
};

export default EditEmail;
