import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CartService, ProfileService, productService } from '../../services/Services.js';
import CategoriesBar from '../../components/Categories/CategoriesBar.jsx';
import AddressItem from '../../components/Adress/AdressItem.jsx';
import EditLocation from '../MyProfile/PersonalSettings/DeliveryLocations/EditLocation.jsx';
import DeleteLocation from '../MyProfile/PersonalSettings/DeliveryLocations/DeleteLocation.jsx';
import WalletImg from   '../../Assets/Images/Wallet.png'
import './Checkout.css'
import DeliveryLocations from '../MyProfile/PersonalSettings/DeliveryLocations/DeliveryLocations.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const Checkout = (props) => {
  const { t, i18n } = useTranslation();
  useEffect(()=>{
    if(localStorage.getItem("token")=="663c80d0af3d373895922158844jb768"||localStorage.getItem("user_id")==0){
      window.location.href="/login";
      alert("You Must Login First");
      
    }
  } , []);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
};
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCollapseToggle = (isOpen, newCheckedItems) => {
    if (!isOpen) {
      setCheckedItems(newCheckedItems);
    }
  };
  const [paymentMethod, setPaymentMethod] = useState('1'); 
  const [useWalletBalance, setUseWalletBalance] = useState(false);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleUseWalletBalanceChange = (e) => {
    setUseWalletBalance(e.target.checked);
  };
  const [products, setProducts] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("Location 1");
  const [showEditLocation, setShowEditLocation] = useState(false);
  const [showDeleteLocation, setShowDeleteLocation] = useState(false);
  const [MainLocation, setMainLocation] = useState('');
  const [AppliedCoupon , SetAppliedCoupon] = useState(false);
  const [NumOfProducts , setNumOfProducts] = useState(0);
  const [Coupon , SetCoupon] = useState(null);
  const [Error , SetError] = useState(false);
  const [Balance , SetBalance ] = useState(0);

  const [cartData, setCartData] = useState({
    price: 0,
    discount_coupon: null,
    discount: 0,
    vat: 0,
    total_price: 0
  });

  useEffect(()=>{
    GetCartData();
  },[])
  async function GetCartData(){
    try {
      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');


      const response = await CartService.CartDetails(auth_key , user_id);
      console.log(response);
      if(response.status){
        const updatedCart = response.data;
        
        if(response.data.products.length !=0){
          setCartData({
            price: response.data.price,
            discount_coupon: response.data.discount_coupon,
            discount: response.data.discount,
            vat: response.data.vat,
            total_price: response.data.total_price
          });
      setNumOfProducts(response.data.products.length);
      SetCoupon(response.data.discount_coupon);
      if(response.data.discount_coupon != null){
        SetAppliedCoupon(true);
      }
        }
      }else{
        SetError(true);
      }
      console.log(response)
      
    } catch (error) {
      console.error('Error getting cart details:', error);
    }
  }

  const handleLocationChange = (e) => {
      setSelectedLocation(e.target.value);
  };


  const handleDeleteLocation = (e) => {
      setShowDeleteLocation(e);
  };

  const handleEditLocation = (e) => {
      setShowEditLocation(e);
  };


  const PayNow = async ()=> {
    console.log(paymentMethod);
    console.log(useWalletBalance);
    const id = await getMainLocation();
    await Pay(id);

  }
  async function Pay(id){
    try {
      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      console.log("id" , id);
      const response = await CartService.PayNow(auth_key, user_id ,id , useWalletBalance ?  1 : 0 ,paymentMethod );
      console.log(response);
      if (response.status) {
          alert("success");
          window.location.href='/myprofile/orders';
      } else {
          alert("Error while pay");
      }
      } catch (error) {
        alert("Error while pay");
    }
  }

  async function getMainLocation(){
    try {
      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response = await ProfileService.ListLocations(auth_key, user_id);
      if (response.status) {
          const primaryLocation = response.data.find(loc => loc.primary === '1');
          console.log("primaryLocation.id", primaryLocation.id);
          return primaryLocation.id;
          
      } else {
          alert("Error loading locations");
      }
      } catch (error) {
        alert("Error loading locations");
    }
  }
  async function AddCoupon(){
    var msg = '';
    try{
      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response  = await CartService.AddCoupon(auth_key , user_id , Coupon);
      console.log(response);
      if(response.status){
        SetCoupon(response.data.discount_coupon);
        
        SetAppliedCoupon(true);


        setCartData({
          price: response.data.price,
          discount_coupon: response.data.discount_coupon,
          discount: response.data.discount,
          vat: response.data.vat,
          total_price: response.data.total_price
        });
        setNumOfProducts(response.data.products.length);


      }else{
        msg=response.msg;
        SetError(msg);
      }

    }catch(e){
      SetError(msg);
    }
  }

  async function RemoveCoupon(){
    var msg = '';
    try{
      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response  = await CartService.RemoveCoupon(auth_key , user_id , Coupon);
      console.log(response);
      if(response.status){
        SetCoupon(response.data.discount_coupon);
        SetAppliedCoupon(false);



        setCartData({
          price: response.data.price,
          discount_coupon: response.data.discount_coupon,
          discount: response.data.discount,
          vat: response.data.vat,
          total_price: response.data.total_price
        });
        setNumOfProducts(response.data.products.length);

      }else{
        msg=response.msg;
        SetError(msg);
      }

    }catch(e){
      SetError(msg);
    }
  }


  useEffect(()=>{
    GetData();
},[]);
async function GetData(){
    try {
        const auth_key = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        const response = await ProfileService.GatWalletBalance(auth_key, user_id); 
        if (response.status) {
            SetBalance(response.data.balance);
            
        } else {
            alert("Failed to  get data");
        }
    } catch (error) {
        alert("Failed to get data");
    }
}


  return (

    <section className='AllProductsSection'>
                  
            {showEditLocation && <EditLocation onClick={handleEditLocation} />}
            {showDeleteLocation && <DeleteLocation onClick={handleDeleteLocation} />}
      {/* <div className="Container">
            <div className="HeaderRow row">
              <div className="col-lg-7">
                <div className="">
                  <CategoriesBar/>
                </div>
              </div>
              <div className="col-lg-3">
                

                </div>
            </div>

            
      </div> */}

      <div className="AllProductsContainer">

        <div className="MainCartRow row">
          <div className="col-lg-8 ">
            
            <div className="row">
                <div className="col-lg-12 CartTitle">
                    <h4>{t("Checkout")}</h4>
                </div>
            </div>
            
            



                
            
            <DeliveryLocations InCart={true} />
          
            <div className="col-lg-12 TitleInCheckout">
                <h6>{t("PaymentDetails")}</h6>
            </div>
                <hr />  

            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3"></div>
                    <div className="col-lg-5 col-md-5 col-sm-12 WalletBalanceCol Center">


                  {Balance!=0&&
                    <div className="UseWalletBalance">
                            <span className='PayBalance' > {t("UAD")}  <span>({Balance})</span>   </span>
                            <img src={WalletImg} alt="" width="40px"/>
                            <label htmlFor="WalletBalance">{t("UseWalletBalance")}</label>
                            <input
                              type="checkbox"
                              name="useWalletBalance"
                              id="WalletBalance"
                              checked={useWalletBalance}
                              onChange={handleUseWalletBalanceChange}
                            />
                            
                        </div>

                  }

                    
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="OnlinePayment">
                        <label htmlFor="EPay">{t("OnlinePayment")}</label>
                        <input
                          type="radio"
                          value="2"
                          name="paymentMethod"
                          id="EPay"
                          checked={paymentMethod === '2'}
                          onChange={handlePaymentMethodChange}
                        />
                        </div>
                       <div className="CashOnDelivery">
                       <label htmlFor="Cash">{t("CashOnDelivery")}</label>
                      <input
                        type="radio"
                        value="1"
                        name="paymentMethod"
                        id="Cash"
                        checked={paymentMethod === '1'}
                        onChange={handlePaymentMethodChange}
                      />
                       </div>
                       
                    </div>
                </div>
            </div>




          </div>
          
          <div className="col-lg-3 col-md-12 PaymentCol">
            <div className="card PaymentCard">
              <div className="AllSettingsContainer">
                <div className="row PaymentCardRow Center">

                   
                <div className="col-lg-10 ">
                        <div className=' form-control EmailInput PromoCode'>
                            {AppliedCoupon&&
                              <button className=' RemoveCoupon btn btn-warning' onClick={RemoveCoupon} >
                              
                                 <span>{t("Delete")}</span>
                                 <FontAwesomeIcon icon={faTrash} />
                              </button>
                            }
                            
                            
                            {!AppliedCoupon&&
                              <button className='btn btn-warning' onClick={AddCoupon}>
                                 <span>{t("Redeeme")}</span> 
                              </button>
                              
                              
                            
                            }
                            
                            
                            <input 
                              type="text" 
                              className='form-control' 
                              placeholder='Promo Code'
                              disabled={AppliedCoupon}
                              value={Coupon || ''}
                              onChange={(event) => SetCoupon(event.target.value)}
                              />
                        </div>
                    </div>
                    <div className="col-lg-10 MoreOrderDetails CartDetails">
                            <ul className="list-unstyled">
                                <li className="list-item"> 
                                    <span className="DetailsItem"> {t("NumberOfProducts")}</span>
                                    <span>{NumOfProducts}</span>
                                </li>
                               
                                <li className="list-item"> 
                                    <span className="DetailsItem">{t("Price")}</span>
                                    <span dir="rtl"> <span>{cartData.price}</span> {t("UAD")}  </span>
                                </li>
                                {cartData.discount !=0&&
                                  <li className="list-item"> 
                                    <span className="DetailsItem">{t("Off")}</span>
                                    <span dir="rtl"> <span>  {"-"+cartData.discount}</span> {t("UAD")} </span>
                                  </li>
                                }
                                
                                <li className="list-item"> 
                                    <span className="DetailsItem"> {t("Vat")}</span>
                                    <span dir="rtl"> <span>{cartData.vat}</span> {t("UAD")} </span>
                                </li>
                                <li className="list-item TotalPriceItem"> 
                                    <span className="DetailsItem"> {t("Total")}</span>
                                    <span className="TotalPrice" dir="rtl"> <span>{cartData.total_price}</span>  {t("UAD")}  </span>
                                </li>
                                
                            </ul>
                             
                      </div>
                  <div className="col-lg-10">
                    <button className='btn btn-warning  LoginBtn ConfirmOrderBtn Center' onClick={PayNow}> {t('ConfirmOrder')}</button>
                  </div>
                </div>
              </div>
            </div>

       
          </div>

          

        </div>
      </div>
    </section>
    
  );
};

export default Checkout;
