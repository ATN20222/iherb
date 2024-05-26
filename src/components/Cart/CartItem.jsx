import React, { useEffect, useState } from "react";
import '../../pages/Cart/Cart.css'
import { t } from "i18next";
import ProductImg from '../../Assets/Images/ProductImage.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartService } from "../../services/Services";

const CartItem= ({ product , updateCart }) => {

    const [quantity, setQuantity] = useState(parseInt(product.quantity));
    const [cartItemId, setCartItemId] = useState(product.id);
    const [productData, setProductData] = useState(product);
    const [NumOfProducts , setNumOfProducts] = useState(0);

    const [loading, setLoading] = useState(false);

    const IncreaseQuantity = async () => {
        setLoading(true);
        const newQ = quantity + 1;
        setQuantity(newQ);
        await ChangeQuantity(newQ);
        setLoading(false);
    }

    const DecreaseQuantity = async () => {
        setLoading(true);
        const newQ = quantity - 1;
        setQuantity(newQ);
        await ChangeQuantity(newQ);
        setLoading(false);
    }

    const ChangeQuantity = async (newQ) => {
        try {
            const authKey = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');

            const response = await CartService.ManageQuantity(authKey, userId, cartItemId, newQ);
            if(response.status) {
                const updatedCart = response.data;
                updateCart(updatedCart)
                const updatedProduct = response.data.products.find(item => item.id === cartItemId);
                setProductData(updatedProduct);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }

    const RemoveItem = async()=>{
        setLoading(true);
        const newQ = 0;
        setQuantity(newQ);
        await ChangeQuantity(newQ);
        setLoading(false);
    }

    if (quantity === 0) {
        return null; 
    }

    return (
        <div className="col-lg-12 CartItem">
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2 Center DeleteItemInCart">
                    <button className='btn' onClick={RemoveItem}> 
                        {t("Delete")}
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-6 NumberOfItemsInCart">
                    <button className='btn btn-outline-dark Center' onClick={DecreaseQuantity} disabled={loading}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <h5>{quantity}</h5>
                    <button className='btn btn-outline-dark Center' onClick={IncreaseQuantity} disabled={loading}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-6 PriceItemInCart">
                    <h5><span>{productData.total_price}</span> {t("UAD")}  </h5> 
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 DescriptionItemInCart">
                    <h5> {productData.name}</h5>
                    <span>{productData.short_desc}</span>
                    {/* <div className="VariationBtnsInCart">
                        <div className="btn btn-warning">
                            1Kg
                        </div>
                        <div className="btn btn-warning">
                            200
                        </div>
                    </div> */}                
                    
                    </div>
                <div className="col-lg-2 col-md-2 col-sm-2 ImageCardInCart"><img src={productData.main_image} width="80%" alt="" /></div>
            </div>
            <hr /> 
        </div>
    );
}

export default CartItem;
