import React, { useState } from "react";
import './Login.css'
import { Link } from "react-router-dom";
import FacebbokIcon from '../../Assets/Images/Facebook.svg';
import AppleIcon from '../../Assets/Images/Apple.svg';
import GoogleIcon from '../../Assets/Images/Google.svg';
import Logo  from  '../../Assets/Images/I_H_H_LOGO.png';
import { useTranslation } from 'react-i18next';
import { AuthService } from "../../services/Services";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [Remember , setRemember] = useState(false);
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const deviceId = navigator.userAgent;
        console.log("deviceId", deviceId);

        try {
            const response = await AuthService.Login(email, password, 'asd342dsdddsd323dsdadasd3e', 3, deviceId);
            // Assuming the API returns a token upon successful login
            
            console.log(response);
           
            
            if(!response.status){
                setError(response.msg);
                
            }else{
                const IsActive = (response.data["active"] == 0);
                if(IsActive){
                    try{
                        console.log(IsActive);
                        const otp = await AuthService.OTP(response.data["email"]);
                        if(otp.status){
                            localStorage.setItem('email', response.data["email"]);
                            localStorage.setItem('DeviceToken', "");
                            localStorage.setItem('Platform', "3");
                            localStorage.setItem('DeviceId', deviceId);
                            localStorage.setItem('token', response.data["auth_key"]);
                            localStorage.setItem('Code',otp.Code);
                            
                            localStorage.setItem('FavId',response.data['Favorite_id'] );
    
                            window.location.href="/Auth";
                            
                        }
                    }catch(e){
                        setError("Failed to login. Please check your credentials.");
    
                    }
                }
                if(!IsActive){
                    localStorage.setItem('user_id', response.data["id"]);
                    localStorage.setItem('token', response.data["auth_key"]);
                    
                    localStorage.setItem('FavId',response.data['Favorite_id'] );
                    
                    window.location.href="/home";
    
    
                }
            }
            
            
        } catch (error) {
            setError("Failed to login. Please check your credentials.");
        }
    };
    return (
        <section className="LoginSection">
            <div className="container">
                <div className="row LoginRow Center">
                    <div className="col-lg-10 LoginPageIHoneyLink">
                        <Link className="navbar-brand Center " to="/"> 
                            <img src={Logo} alt="" width="60px"/> 

                            <span className='LogoWords Center'>
                            <span className='Word-1'>I</span> <span className='Word-2 SecondWord'>HONEY</span><span className='Word-3'>HERB</span>

                            </span>
                        </Link>
                    </div>
                    <div className="col-lg-10">
                        <div className="row LoginInnerRow">
                        <div className="col-lg-6 col-md-6 LeftSide">
                        <div className="container">
                            <h5> {t("OrSignInWith")}</h5>
                            <span>{t("ByReg1")} <br /> {t("ByReg2")}
                            </span>
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
                    <div className="col-lg-6 col-md-6 RightSide">

                        <div className="container">
                                <h5>{t("HaveAnAccount")}</h5>
                                <form onSubmit={handleSubmit}>
                                        <div className="row Center LoginWithRow">
                                            <div className="col-lg-10 LoginWithCol">
                                                <input
                                                    type="email"
                                                    className="col-lg-12 form-control EmailInput"
                                                    dir="rtl"
                                                    placeholder={t("Email")}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-lg-10 LoginWithCol">
                                                <input
                                                    minLength="8"
                                                    type="password"
                                                    className="col-lg-12 form-control PasswordInput"
                                                    dir="rtl"
                                                    placeholder={t("Password")}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            



                                            <div className="col-lg-10 LoginWithCol">
                                            <div className="row">
                                            <div className="col-6">
                                                <Link to="/emailtosendotp" className="ForgetPassword">{t("ForgetPassword")}</Link>
                                            </div>
                                                <div className="col-6 form-check RememberMe">
                                                    <label htmlFor=""> {t("RememberMe")}</label>
                                                    <input type="checkbox" name="" id="" 
                                                        onChange={(e) => setRemember(!Remember)}
                                                    />
                                                </div>
                                                
                                            </div>
                                        
                                        </div>

                                            <div className="col-lg-10 LoginWithCol">
                                                <button type="submit" className="btn btn-warning col-12 LoginBtn">
                                                    <span className="Login">{t("Login")}</span>
                                                </button>
                                            </div>
                                            {error && <div className="col-lg-10 LoginWithCol error-message">{error}</div>}
                                            <div className="col-lg-10 LoginWithCol NotHaveAccount">
                                                <span> {t("DontHaveAccount")}  </span>
                                                <Link className="btn btn-warning col-12 RegisterBtn" to="/register">
                                                    <span className=""> {t("RegisterInLogin")}</span>
                                                </Link>
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

export default Login;