import React, { useEffect, useState } from "react";
import { faCamera, faCaretDown, faCaretLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import { ProductsService, ProfileService } from "../../../services/Services";
import TestImg from '../../../Assets/Images/ProductImage.png';
import './RatingProduct.css';
import { faStar as faStarBorder } from '@fortawesome/free-regular-svg-icons';

const RatingProduct = () => {
    const [textareaValue, setTextareaValue] = useState('');
    const [RevTitle, setRevTitle] = useState('');
    const [rating, setRating] = useState(0);
    const { ItemId } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        GetDetails();
    }, []);

    async function GetDetails() {
        try {
            
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            console.log(auth_key, user_id, ItemId); 
            const response = await ProductsService.GetProductDetails(auth_key, user_id, ItemId);
            console.log(response);

            if (response.status) {
                setProduct(response.data); 

            } else {
                window.location.href = '/notfound';
            }
            console.log("product details", response.data);
        } catch (error) {
            console.error('Error fetching product:', error);

        }
    }

    const { t } = useTranslation();

    const handleTextAreaChange = (event) => {
        setTextareaValue(event.target.value);
    };

    async function handleSendButtonClick () {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            console.log(auth_key, user_id, ItemId, RevTitle , textareaValue , rating);
            // return
            const response = await ProfileService.RateProduct(auth_key, user_id, product.id, RevTitle , textareaValue , rating);
            if (response.status) {
                alert("request has been sent");
                window.location.href=`/details/${product.id}`
            } else {
                alert("Failed to rate product try again later");
            }
        } catch (error) {
            alert("Failed to rate product try again later");

        }
    };

    const handleTitleChanged = (event) => {
        setRevTitle(event.target.value);
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesomeIcon
                
                    key={i}
                    icon={i <= rating ? faStar : faStarBorder}
                    className={`${i <= rating ? "star-icon ActiveStar" : "star-icon"} StarsRate`}
                    onClick={() => handleStarClick(i)}
                />
            );
        }
        return stars;
    };

    return (
        <ul className="list-unstyled">
            <div className="CurrentLocationInProfile">
                <h5>
                    <span>{t("RateProduct")}</span>
                </h5>
            </div>

            <li className="list-item">
                <div className="row EditMailRow">
                    <div className="col-lg-8 ProductImgRev">
                        <div className="RevImgCont">
                            <img src={product.main_image} alt="" width="100px" />
                        </div>

                        <h5 className="LabelInEditProfile">
                            {product.name}
                        </h5>
                    </div>

                    <div className="col-lg-8">
                        <h5 className="LabelInEditProfile">{t("WhatIsYourRate")}</h5>
                        <div className="RatingStars">
                            {renderStars()}
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <h5 className="LabelInEditProfile">{t("ReviewTitle")}</h5>
                    </div>

                    <div className="col-lg-8 EditEmailInput">
                        <input
                            required
                            type="text"
                            className="col-lg-12 form-control EmailInput"
                            dir="rtl"
                            placeholder={t("ReviewTitle")}
                            value={RevTitle}
                            onChange={handleTitleChanged}
                        ></input>
                    </div>

                    <div className="col-lg-8">
                        <h5 className="LabelInEditProfile">{t("ReviewDescription")}</h5>
                        <textarea
                            className="col-lg-12 form-control EmailInput RefundTextArea"
                            dir="rtl"
                            placeholder={t("WriteYourReview")}
                            type="text"
                            value={textareaValue}
                            onChange={handleTextAreaChange}
                        />
                    </div>
                    <div className="col-lg-8 LoginWithCol SavePasswordBtn">
                        <button className="btn btn-warning col-12 LoginBtn " onClick={handleSendButtonClick}>
                            <span className="Login">{t("Done")}</span>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default RatingProduct;
