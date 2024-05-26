import React, { useEffect, useState } from "react";
import './Login.css'
import { Link } from "react-router-dom";
import Logo from '../../Assets/Images/I_H_H_LOGO.png';
import { useTranslation } from 'react-i18next';
import { AuthService, ProfileService } from "../../services/Services";

const OTP = () => {
    const { t } = useTranslation();
    const [timer, setTimer] = useState(59);
    const [data , setData] = useState('');
    const [inputValues, setInputValues] = useState(['', '', '', '']);
    const [timerExpired, setTimerExpired] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        if (timer === 0) {
            clearInterval(interval);
            setTimerExpired(true);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const initializeTimer = () => {
        setTimer(59);
        setTimerExpired(false);
    };

    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const otp = inputValues.join('');
        setLoading(true);
        console.log(localStorage.getItem("TempEmail"));
        console.log(otp);
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ProfileService.ActivateNewEmail(auth_key,user_id ,localStorage.getItem("TempEmail"), otp);
            console.log("ActiveAcount",response);
            if (response.status) {
                localStorage.setItem('email' , localStorage.getItem("TempEmail"));
                localStorage.removeItem('TempEmail');
                window.location.href="/";
            } else {
                alert("Try again later");
            }
        } catch (error) {
            console.error("Failed to submit OTP:", error);
            alert("Try again later");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await ProfileService.ActivateNewEmail(localStorage.getItem("TempEmail"));
            console.log(response);
            if (response.status) {
                initializeTimer();
                setData(response.data);
            }
        } catch (error) {
            console.error("Failed to resend OTP:", error);
        }
    };

    return (
        <section className="LoginSection">
            <div className="container">
                <div className="row LoginRow Center container">
                    <div className="col-lg-10 LoginPageIHoneyLink">
                        <Link className="navbar-brand Center " to="/">
                            <img src={Logo} alt="" width="60px" />
                            <span className='LogoWords Center'>
                                <span className='Word-1'>I</span> <span className='Word-2 SecondWord'>HONEY</span><span className='Word-3'>HERB</span>
                            </span>
                        </Link>
                    </div>
                    <div className="col-10 col-lg-4 col-md-10 col-sm-10">
                        <div className="row LoginInnerRow">
                            <div className="col-lg-12 RightSide">
                                <div className="container">
                                    <h5>{t("OTP")}</h5>
                                    <span className="RegisterUnderText">{t("OTPText")}</span>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row Center LoginWithRow OTPRow">
                                            {[...Array(4)].map((_, index) => (
                                                <div key={index} className="col-3 Center col-lg-2 LoginWithCol OTPInput">
                                                    <input
                                                        className="col-lg-12 form-control PasswordInput Center"
                                                        dir="rtl"
                                                        type="text"
                                                        maxLength="1"
                                                        required
                                                        value={inputValues[index]}
                                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                                    />
                                                </div>
                                            ))}
                                            <div className="col-lg-10 LoginWithCol ConfirmOTP">
                                                <button className="btn btn-warning col-12 LoginBtn" type="submit" disabled={loading}>
                                                    {loading ? 'Loading...' : <span className="Login"> {t("Submit")} </span>}
                                                </button>
                                                <div className="col-lg-12 OTPInfo">
                                                    <button
                                                        onClick={handleResendOTP}
                                                        type="button"
                                                        className="RegisterUnderText ResendOtp"
                                                        disabled={!timerExpired || loading}
                                                    >{t("ResendOTP")}</button>
                                                    <span className="RegisterUnderText OtpExpireCount">({timer}) {t("OTPExpiration")}</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-10 Center text-success ">
                                                <span className="OtpSent">{data}</span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OTP;
