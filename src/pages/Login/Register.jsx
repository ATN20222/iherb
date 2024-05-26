import React, { useState } from "react";
import './Login.css'
import { Link } from "react-router-dom";
import FacebbokIcon from '../../Assets/Images/Facebook.svg';
import AppleIcon from '../../Assets/Images/Apple.svg';
import GoogleIcon from '../../Assets/Images/Google.svg';
import Logo  from  '../../Assets/Images/I_H_H_LOGO.png';
import { useTranslation } from 'react-i18next';
import { AuthService } from "../../services/Services";

const Register = () => {
    const { t, i18n } = useTranslation();
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Validation checks
        if (password.length < 8) {
            setError("Password should be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        const deviceId = navigator.userAgent;
        setLoading(true);
        try {
            console.log(fullName,
                email,
                password,
                phoneNumber,
                localStorage.getItem("DeviceToken"),
                deviceId,
                3);
            const response =await AuthService.RegisterAccount(
                fullName,
                email,
                password,
                phoneNumber,
                "",
                deviceId,
                3
            );
            
            if(response.status){
                localStorage.setItem("email",response.data["email"] );
                localStorage.setItem("user_id",response.data["id"]);  
                window.location.href = "/login";
            }else{
                setError("Registration failed. Please try again later.");
            }
            console.log(response);
            setLoading(false);
        } catch (error) {
            setError("Registration failed. Please try again later.");
            console.error("Registration failed:", error);
            setError("Registration failed. Please try again later.");
            setLoading(false);

        }
    };

    return (
        <section className="LoginSection">
            <div className="container">
                <div className="row LoginRow Center container">
                    <div className="col-lg-10 LoginPageIHoneyLink">
                        <Link className="navbar-brand Center " to="/"> 
                            <img src={Logo} alt="" width="60px"/> 
                            <span className='LogoWords Center'>
                                <span className='Word-1'>I</span> <span className='Word-2 SecondWord'>HONEY</span><span className='Word-3'>HERB</span>
                            </span>
                        </Link>
                    </div>
                    <div className="col-10 col-lg-4 col-md-10 col-sm-10">
                        <div className="row LoginInnerRow">
                            <div className="col-lg-12 RightSide">
                                <div className="container">
                                    <h5>{t("RegisterInLogin")}</h5>
                                    <span className="Error">{error}</span>
                                    <form onSubmit={handleRegister}>
                                        <div className="row Center LoginWithRow">
                                            <div className="col-lg-10 LoginWithCol">
                                                <input
                                                    required 
                                                    className="col-lg-12 form-control PasswordInput"  
                                                    dir="rtl"  
                                                    placeholder={t("FullName")}
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-10 LoginWithCol">
                                                <input 
                                                    required
                                                    className="col-lg-12 form-control PasswordInput" 
                                                    type="tel"  
                                                    dir="rtl"  
                                                    placeholder={t("PhoneNumber")}
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-10 LoginWithCol">
                                                <input 
                                                    required
                                                    className="col-lg-12 form-control EmailInput" 
                                                    dir="rtl"  
                                                    placeholder={t("Email")}
                                                    value={email}
                                                    type="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-10 LoginWithCol">
                                                <input 
                                                    required
                                                    className="col-lg-12 form-control PasswordInput"  
                                                    dir="rtl" 
                                                    type="password"  
                                                    placeholder={t("Password")}
                                                    value={password}
                                                    minLength="8"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-10 LoginWithCol">
                                                <input 
                                                    required
                                                    className="col-lg-12 form-control PasswordInput"  
                                                    dir="rtl" 
                                                    type="password"  
                                                    placeholder={t("RePassword")}
                                                    value={confirmPassword}
                                                    minLength="8"
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-10 LoginWithCol">
                                            <button className="btn btn-warning col-12 LoginBtn" type="submit" disabled={loading}>
                                                    {loading ? "Loading..." : <span className="Login">{t("RegisterInLogin")}</span>}
                                                </button>
                                                <span className="RegisterUnderText">{t("ConfirmationCode")}</span>
                                            </div>
                                            <hr className="HrContainer" />
                                            <div className="col-lg-10 LeftSide">
                                                <div className="container">
                                                    <h5 className="SignInWithInRegister"> {t("OrSignInWith")}</h5>
                                                    <span>{t("ByReg1")} <br /> {t("ByReg2")}</span>
                                                    <div className="row Center LoginWithRow">
                                                        <div className="col-lg-10 LoginWithCol">
                                                            <button className="btn btn-outline-dark col-12 LogInWithBtn">
                                                                <div className=" LogInWithBtnRow">
                                                                    <div className="col-8">
                                                                        <span>{t("LoginWithGoogle")}</span>
                                                                    </div>
                                                                    <div className="col-2 LoginWithIcon">
                                                                        <img src={GoogleIcon} alt="" />
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        </div>
                                                        <div className="col-lg-10 LoginWithCol">
                                                            <button className="btn btn-outline-dark col-12 LogInWithBtn">
                                                                <div className="row LogInWithBtnRow">
                                                                    <div className="col-8">
                                                                        <span> {t("LoginWithFacebook")} </span>
                                                                    </div>
                                                                    <div className="col-2 LoginWithIcon">
                                                                        <img src={FacebbokIcon} alt="" />
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        </div>
                                                        <div className="col-lg-10 LoginWithCol">
                                                            <button className="btn btn-outline-dark col-12 LogInWithBtn">
                                                                <div className="row LogInWithBtnRow">
                                                                    <div className="col-8">
                                                                        <span> {t("LoginWithApple")}</span>
                                                                    </div>
                                                                    <div className="col-2 LoginWithIcon">
                                                                        <img src={AppleIcon} alt="" />
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
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

export default Register;
