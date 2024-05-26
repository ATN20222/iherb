// YourComponent.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CartService, productService } from '../../services/Services.js';
import CategoriesBar from '../../components/Categories/CategoriesBar.jsx';
import ProductCard from '../../components/Product/ProductCard.jsx';
import './Cart.css'
import ProductImg from '../../Assets/Images/ProductImage.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import CartItem from '../../components/Cart/CartItem.jsx';
import { Link } from 'react-router-dom';

const Cart = (props) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
};
useEffect(()=>{
  if(localStorage.getItem("token")=="663c80d0af3d373895922158844jb768"||localStorage.getItem("user_id")==0){
    window.location.href="/login";
    alert("You Must Login First");
    
  }
} , []);
  const [checkedItems, setCheckedItems] = useState([]);
  const [Error , SetError] = useState(false);
  const [NoData ,SetNoData ] = useState(true);
  const [NumOfProducts , setNumOfProducts] = useState(0);
  const [Coupon , SetCoupon] = useState(null);
  const [CouponError, SetCouponError] = useState('');
  const[AppliedCoupon , SetAppliedCoupon] = useState(false);
  const handleCollapseToggle = (isOpen, newCheckedItems) => {
    if (!isOpen) {
      setCheckedItems(newCheckedItems);
    }
  };
  const [cartData, setCartData] = useState({
    price: 0,
    discount_coupon: null,
    discount: 0,
    vat: 0,
    total_price: 0
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    GetCartData();
  }, []);
  const updateCart = (updatedCart) => {
    setCartData({
      price: updatedCart.price,
      discount_coupon: updatedCart.discount_coupon,
      discount: updatedCart.discount,
      vat: updatedCart.vat,
      total_price: updatedCart.total_price
    });
    setNumOfProducts(updatedCart.products.length);
    console.log(
      "price:", updatedCart.price,
      "discount_coupon:", updatedCart.discount_coupon,
      "discount:", updatedCart.discount,
      "vat:", updatedCart.vat,
     " total_price: " ,updatedCart.total_price
    );
    
  };


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
        SetCouponError(msg);
      }

    }catch(e){
      SetCouponError(msg);
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
        SetCouponError(msg);
      }

    }catch(e){
      SetCouponError(msg);
    }
  }

  async function GetCartData(){
    try {
      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');


      const response = await CartService.CartDetails(auth_key , user_id);
      if(response.status){
        const updatedCart = response.data;
        // updateCart(updatedCart); 
        setProducts(response.data.products);
        if(response.data.products.length !=0){
          SetNoData(false);
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


  return (

    <section className='AllProductsSection'>
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
          {!NoData&&!Error&&

              <div className="col-lg-8 ">
                          
              <div className="row">
                  <div className="col-lg-12 CartTitle">
                      <h4>{t("Cart")}</h4>
                  </div>
              </div>
              <div className="row CartTableHeader">
                  <div className="col-lg-2 col-md-2 col-sm-2"></div>
                
                  <div className="col-lg-2 col-md-2 col-sm-2">
                      {t("Quantity")}
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-2">
                      {t("Price")}
                  </div>
                  <div className="col-lg-6 col-md-2 col-sm-2">
                      {t("Products")}
                  </div>
              </div>




                  

              <div className="col-lg-12">
                  <hr />
              </div>

              {products.map((product, index) => (
                <CartItem key={index} product={product}  updateCart={updateCart}/>
              ))}
              {/* <div className="col-lg-12">
                  <hr />
              </div> */}



              </div>
              
          }
          
          
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
                    
                    <div className="col-lg-10 ">
                        <hr />
                        {Error&&
                          <span>{Error}</span>
                        }
                    </div>
                    <div className="col-lg-10 MoreOrderDetails CartDetails">
                            <ul className="list-unstyled">
                                <li className="list-item"> 
                                    <span className="DetailsItem">{t("NumberOfProducts")} </span>
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
                                    <span className="DetailsItem">{t("Vat")}</span>
                                    <span dir="rtl"> <span>{cartData.vat}</span> {t("UAD")} </span>
                                </li>
                                <li className="list-item TotalPriceItem"> 
                                    <span className="DetailsItem"> {t("Total")}</span>
                                    <span className="TotalPrice" dir="rtl"> <span>{cartData.total_price}</span>  {t("UAD")}  </span>
                                </li>
                                
                            </ul>
                             
                      </div>

                  <div className="col-lg-10">
                    <Link to="/checkout" className='btn btn-warning  LoginBtn ConfirmOrderBtn Center'> {t('ConfirmOrder')}</Link>
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

export default Cart;
