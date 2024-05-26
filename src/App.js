import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Header/NavBar';

import NotFound from './pages/NotFound';
import Deals from './pages/Deals';
import Products from './pages/Products/Products';
import React, { useEffect } from 'react';
import Favourites from './pages/Favourites/Favourites.jsx';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Login/Register.jsx';
import Auth from './pages/Login/Auth.jsx';
import MyProfile from './pages/MyProfile/MyProfile.jsx';
import EditEmail from './pages/MyProfile/PersonalSettings/EditEmail.jsx';
import PersonalSettings from './pages/MyProfile/PersonalSettings/PersonalSettings.jsx';
import MyProfileSideBar from './pages/MyProfile/MyProfileSideBar.jsx';
import Help from './pages/MyProfile/Help/Help.jsx';
import Wallet from './pages/MyProfile/Wallet/Wallet.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import WellnessQuiz from './pages/WellnessQuiz/WellnessQuiz.jsx';
import QuizPage from './pages/WellnessQuiz/QuizPage.jsx';
import QuizResult from './pages/WellnessQuiz/QuizResult.jsx';
import PrivacyPolicy from './pages/Policies/PrivacyPolicy.jsx';
import TermsOfConditions from './pages/Policies/TermsOfConditions.jsx';
import Details from './pages/ProductDetails/Details.jsx';

import OTP from './pages/Login/OTP.jsx';
import Parent from './pages/Products/Parent.jsx';
import EmailToSendOtp from './pages/Login/EmailToSendOtp.jsx';
import ForgetPasswordOTP from './pages/Login/ForgetPasswordOTP.jsx';
import ForgetPassword from './pages/Login/ForgetPassword.jsx';
import Categories from './pages/Products/Categories.jsx';
import Groups from './pages/Products/Groups.jsx';
function App() {
  useEffect(()=>{
    if(!localStorage.getItem('language')){
      localStorage.setItem('language',"en")
    }
  },[])
 
  const PrivateRoute = ({ element, ...rest }) => {
    if(localStorage.getItem("token")==null||localStorage.getItem("user_id")==null){
      localStorage.setItem("token" , "663c80d0af3d373895922158844jb768");
      localStorage.setItem('user_id' , 0);
    }
    const isAuthenticated = !!localStorage.getItem("token");
  
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  
  
  
  return (
    <Router>
      <div className="App"> 
      <Outlet>
          <Route path="/myprofile" element={<MyProfileSideBar />} />
      </Outlet>

        <Navbar />
        <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="A" element={<Parent />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />


          <Route path="/Favourites" element={<PrivateRoute element={<Favourites />} />} />
          <Route path='/products' element={<PrivateRoute element={<Products />} />}></Route>
          <Route path='/categories/:id' element={<PrivateRoute element={<Categories />} />}></Route>
          <Route path='/groups/:id' element={<PrivateRoute element={<Groups />} />}></Route>
          <Route  path='/products/:homeType' element={<PrivateRoute element={<Products />} />}></Route>
          <Route path='/cart' element={<PrivateRoute element={<Cart />} />}></Route>
          <Route path='/checkout' element={<PrivateRoute element={<Checkout />} />}></Route>
          <Route path='/offers'  element={<PrivateRoute element={<Products IsDeals={true} />} />}></Route>
          <Route path="*" element={<NotFound />} />
          <Route path="OTP" element={<OTP />}  />
          <Route path='/Details/:productId' element={<PrivateRoute element={<Details />} />} />
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/emailtosendotp' element={<EmailToSendOtp/>}></Route>
          <Route path='/forgetpasswordotp' element={<ForgetPasswordOTP/>}></Route>
          <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>
          <Route path='/WellnessQuiz'element={<PrivateRoute element={<WellnessQuiz/>} />}  ></Route>
          <Route path='/quiz'  element={<PrivateRoute element={<QuizPage/>} />}></Route>
          <Route path='/privacypolicy' element={<PrivacyPolicy/>} ></Route>
          <Route path='/termsofconditions' element={<TermsOfConditions/>}  ></Route>
          <Route path='/quizresult' element={<PrivateRoute element={<QuizResult/>} />} ></Route>
          <Route path='/Register' element={<Register/>}></Route>
          <Route path='/Auth' element={<Auth/>} ></Route>
          <Route path='/myprofile/lists' element={<PrivateRoute element={<MyProfile Component="Lists"/>} />} ></Route>
          <Route path='/myprofile/Wallet' element={<MyProfile Component="Wallet"/>} />
          <Route path="/myprofile/editemail" element={<PrivateRoute element={<MyProfile Component="EditEmail"/>}/>}  />
          <Route path="/myprofile/help"  element={<PrivateRoute element={<MyProfile Component="Help"/>}/>} />
          <Route path="/myprofile/orders"  element={<PrivateRoute element={<MyProfile Component="MyOrders"/>}/>} />
          <Route path="/myprofile/refund/:ItemId"  element={<PrivateRoute element={<MyProfile Component="Refund"/>}/>}  />
          <Route path="/myprofile/rate/:ItemId" element={<PrivateRoute element={<MyProfile Component="RatingProduct"/>}/>}/>
          <Route path='/myprofile/personalsettings' element={<PrivateRoute element={<MyProfile Component="PersonalSettings"/>}/>} ></Route>       
          <Route path="/myprofile" element={<PrivateRoute element={<MyProfile/>} />}>
            <Route index element={<PrivateRoute element={<PersonalSettings/>} />} />
            <Route path='PersonalSettings' element={<PrivateRoute element={<PersonalSettings/>} />} >              
            </Route>
            
          </Route>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;