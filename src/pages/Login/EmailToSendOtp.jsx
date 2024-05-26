import React, { useState } from "react";
import './Login.css';
import { Link } from "react-router-dom";
import Logo from '../../Assets/Images/I_H_H_LOGO.png';
import { useTranslation } from 'react-i18next';
import { AuthService, ForgetPasswordServices } from "../../services/Services";

const EmailToSendOtp = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        
        
        if (!email) {
            setError("Please enter your email.");
            return;
        }

        setLoading(true);
        try {
            const response = await ForgetPasswordServices.SendCode(email);
            if (response.status) {
                localStorage.setItem("email", email);
                localStorage.setItem("Forget OTP" , response.Code);
                window.location.href = "/forgetpasswordotp";
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
                                                    className="col-lg-12 form-control EmailInput" 
                                                    dir="rtl"  
                                                    placeholder={t("Email")}
                                                    value={email}
                                                    type="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-lg-10 LoginWithCol">
                                                <button className="btn btn-warning col-12 LoginBtn" type="submit" disabled={loading}>
                                                    {loading ? "Loading..." : <span className="Login">Send OTP</span>}
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

export default EmailToSendOtp;
