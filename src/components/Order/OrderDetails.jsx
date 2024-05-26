import React, { useState } from "react";
import ProductImage from '../../Assets/Images/ProductImage.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faClose } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import CancelOrder from "./CancelOrder";
import { Link } from "react-router-dom";

const OrderDetails = ({data,onClick})=>{
    const [showDetails, setShowDetails] = useState(false);
    const handleDetailsClick= ()=>{
        setShowDetails(!showDetails);
        return showDetails;
    }
    const [showCancelOrder, setSshowCancelOrder] = useState(false);
    const handleCancelClick = () => {
        setSshowCancelOrder(true);
    };
    const handleDetailsCardClick = (event) => {
        event.stopPropagation();
    }

    async function handleConfirmCancel (){
       
          
        setSshowCancelOrder(false);

       
    }
    const ToRefund =()=>{
        window.location.href=`/myprofile/refund/${data.id}`
    }
    const ToRate =()=>{
        window.location.href=`/myprofile/rate/${data.product_id}`
    }
    return(
        <div className="Overlay" onClick={() => onClick(handleDetailsClick)} >
            {showCancelOrder && <CancelOrder onClick={() => setSshowCancelOrder(false)} onConfirmDelete={handleConfirmCancel} />}

            <div className="container">
                <div className="row  Center">
                    <div className="col-lg-5 col-md-7 col-sm-9 col-10 card OrderDetailsCard "onClick={handleDetailsCardClick}   >
                        <div className="CloseDetailsItem"  onClick={() => onClick(handleDetailsClick)} >
                            <FontAwesomeIcon icon={faClose}/>
                        </div>
                        <h5 className="OrderDetailsItem">{data.product_name} </h5>
                        <span className="OrderDetailsItem" >    {t("OrderNumber")} : {data.order_id} 
                        {(data.status_id==1||data.status_id==2)&&
                            <span className="OrderCancel" onClick={handleCancelClick}>{t("Cancel")} </span> 
                        
                        }
                        
                        </span>
                        <span className="OrderDetailsItem">{t("OrderDate")} : {data.order_date}  </span>
                        <span className="OrderDetailsItem">{t("ArrivalDate")} : {data.arrival_date} </span>

                        <div className="col-lg-12 OrderImageCol Center OrderDetailsItem">
                            <div className="card Center">
                                <img src={data.main_image} width="80%" alt="" />
                            </div>
                        </div>
                        {data.status_id==3&&

                            <div className="OrderDetailsItem RateProduct" onClick={ToRate}> 
                                <FontAwesomeIcon icon={faChevronLeft}/> 
                                    <span >{t("RateProduct")}</span>
                            </div>
                        }
                        
                        <div className="col-lg-9 MoreOrderDetails OrderDetailsItem">
                            <ul className="list-unstyled">
                               
                                <li className="list-item TotalPriceItem"> 
                                    <span className="DetailsItem"> {t("Price")}</span>
                                    <span className="TotalPrice" dir="rtl"> <span>{data.price_at_purchase}</span> {t("UAD")}  </span>
                                </li>
                                
                            </ul>
                             
                        </div>
                        <div className="OrderPaymentMethod">
                                <span>    {t("PaymentMethod")} : </span>
                                <span>{data.payment_method} </span>
                            </div> 
                        {data.status_id==3&&
                            <Link onClick={ToRefund} className="OrderDetailsItem RefundLink">{t("Refund")}</Link>
                        }

                        </div>


                        
                </div>
            </div>
        </div>
    );
}
export default OrderDetails;