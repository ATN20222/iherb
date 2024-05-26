import { t } from "i18next";
import React, { useEffect, useState } from "react";
import Order from "../../../components/Order/Order";
import OrderDetails from "../../../components/Order/OrderDetails";
import { ProfileService } from "../../../services/Services";
import './Orders.css'
const Orders = ()=>{
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetails, SetshowDetails] = useState(false);

    const [Orders , SetOrders] = useState([]);
    const handleOrderClick = (orderId) => {
        const order = Orders.find(order => order.id === orderId);
        setSelectedOrder(order);
        
    };
    const handleDetailsClick = (Show) => {
        setSelectedOrder(Show);
    };

    



    useEffect(()=>{
        GetOrders();
    },[])
    async function GetOrders(){
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            const response = await ProfileService.ListOrders(auth_key, user_id);
            if (response.status) {
                SetOrders(response.data);
                console.log(response.data)
            } else {
                alert("Failed to get orders try again later");
            }
        } catch (error) {
            alert("Failed to get orders try again later");

        }
    }

    return(
        <ul className="list-unstyled">
            
        <div className="CurrentLocationInProfile">
            <h5>
                <span>{t("MyOrders")}</span>
            </h5>
        </div>
        
        <li className="list-item OrdersLi">
            <div className="row EditMailRow OrdersRow">
                {
                    Orders.map((order , index)=>(

                        <Order key={index} data={order} onClick={handleOrderClick}/>

                    ))
                }
                
                
            </div>
        </li>
        {selectedOrder && <OrderDetails data={selectedOrder} onClick={handleDetailsClick}  />}

        </ul>
    );
}
export default Orders;