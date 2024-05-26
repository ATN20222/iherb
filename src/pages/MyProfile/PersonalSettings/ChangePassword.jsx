import React, { useState } from "react";
import { faChevronLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import { ProfileService } from "../../../services/Services";

const ChangePassword = () => {
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const toggleCurrentPasswordVisibility = () => {
        setCurrentPasswordVisible(!currentPasswordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleChangePassword = async () => {
        try {
            if (newPassword !== confirmPassword) {
                alert("New password and confirm password do not match.");
                return;
            }
            if(newPassword.length < 8 ){
                alert("password length should be more than 8 characters.");
                return;
            }
            
            
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ProfileService.ChangePasswrd(auth_key, user_id, currentPassword, newPassword);
            
            if (response.status) {
                
                alert("Password changed successfully.");
            } else {
                
                alert("Error changing password. Please try again.");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Error changing password. Please try again.");
        }
    };

    return (
        <ul className="list-unstyled">
            <div className="CurrentLocationInProfile">
                <h5>
                    <span>{t("PersonalSettings")}</span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>{t("Password")}</span>
                </h5>
            </div>
            <li className="list-item">
                <div className="row EditMailRow">
                    <div className="col-lg-7 EditEmailInput">
                        <input
                            className="col-lg-12 form-control EmailInput"
                            dir="rtl"
                            placeholder={t("CurrentPassword")}
                            minLength="8"

                            type={currentPasswordVisible ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <div className="EyeIcon" onClick={toggleCurrentPasswordVisibility}>
                            <FontAwesomeIcon icon={currentPasswordVisible ? faEyeSlash : faEye} />
                        </div>
                    </div>
                    <div className="col-lg-7 EditEmailInput">
                        <input
                            className="col-lg-12 form-control EmailInput"
                            dir="rtl"
                            placeholder={t("NewPassword")}
                            type={newPasswordVisible ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            minLength="8"
                            required
                        />
                        <div className="EyeIcon" onClick={toggleNewPasswordVisibility}>
                            <FontAwesomeIcon icon={newPasswordVisible ? faEyeSlash : faEye} />
                        </div>
                    </div>
                    <div className="col-lg-7 EditEmailInput">
                        <input
                            className="col-lg-12 form-control EmailInput"
                            dir="rtl"
                            placeholder={t("ConfirmPassword")}
                            type={confirmPasswordVisible ? "text" : "password"}
                            value={confirmPassword}
                            minLength="8"

                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <div className="EyeIcon" onClick={toggleConfirmPasswordVisibility}>
                            <FontAwesomeIcon icon={confirmPasswordVisible ? faEyeSlash : faEye} />
                        </div>
                    </div>
                    <div className="col-lg-7 LoginWithCol SavePasswordBtn">
                        <button className="btn btn-warning col-12 LoginBtn" onClick={handleChangePassword}>
                            <span className="Login">{t("Save")}</span>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default ChangePassword;
