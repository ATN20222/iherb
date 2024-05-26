import React, { useState } from "react";
import './Login.css';
import { Link } from "react-router-dom";
import Logo from '../../Assets/Images/I_H_H_LOGO.png';
import { useTranslation } from 'react-i18next';
import { AuthService, ForgetPasswordServices } from "../../services/Services";

const ForgetPassword = () => {
    const { t } = useTranslation();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setError("Password should be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        
        

        setLoading(true);
        try {
            const response = await ForgetPasswordServices.ChangePasswrdServ(localStorage.getItem("email") ,password );
            if (response.status) {
                alert("success");
                window.location.href='/login';
            } else {
                setError("faild to send otp");
            }
            setLoading(false);
        } catch (error) {
            setError("faild to send otp. Please try again later.");
            console.error("faild to send otp:", error);
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
                                    <h5>Password Reset</h5>
                                    <span className="Error">{error}</span>
                                    <form onSubmit={handleRegister}>
                                        <div className="row Center LoginWithRow">
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
                                                    {loading ? "Loading..." : <span className="Login">{t("Save")}</span>}
                                                </button>
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

export default ForgetPassword;
