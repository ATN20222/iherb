import React, { useState } from "react";
import ProductImage from '../../Assets/Images/ProductImage.png';
import './Order.css';
import OrderDetails from "./OrderDetails";
import { t } from "i18next";
const Order = ({data ,onClick})=>{

    return(
        
        <div className="col-lg-10 col-md-10 OrderCard Center"  onClick={() => onClick(data.id)}>
           
            <div className="row">
                <div className="col-lg-3 col-md-3 OrderImageCol Center">
                    <div className="card Center">
                        <img src={data.main_image} width="80%" alt="" />

                    </div>
                </div>
                <div className="col-lg-6 col-md-6 OrderBriefCol Center">
                    <h5>{data.product_name} </h5>
                    <h6 className="LightBlack">{t("OrderNumber")}  : {data.order_id}</h6>
                </div>
                {/* <div className="col-lg-1 OrderHr"></div> */}
                <div className="col-lg-3 col-md-3 OrderStatusCol Center">
                    <h6 className={
                        `${ data.status_id == 4 ?"red":
                            data.status_id == 3 ?"green":
                            data.status_id == 6 ?"green":"orange"
                        }`
                        
                        }>{data.status} </h6>
                    <span className="LightBlack">{data.order_date}</span> 
                </div>
            </div>
        </div>
    );
}
export default Order;