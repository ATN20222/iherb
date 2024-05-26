import React from 'react';
import './ProductNewCard.css';
import ProductImg from '../../Assets/Images/ProductImage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarBorder } from '@fortawesome/free-regular-svg-icons';
import { t } from 'i18next';
import { Link } from 'react-router-dom';

const ProductNewCard = (props) => {
    const generateStars = (rating) => {
        const filledStars = [];
        const totalStars = 5;

        if (!rating || rating === 0) {
            
            for (let i = 0; i < totalStars; i++) {
                filledStars.push(<FontAwesomeIcon key={i} icon={faStarBorder} />);
            }
        } else {
            const fullStars = Math.floor(rating);
            const halfStar = rating - fullStars >= 0.5;

            
            for (let i = 0; i < fullStars; i++) {
                filledStars.push(<FontAwesomeIcon key={i} icon={faStar} />);
            }

            
            if (halfStar) {
                filledStars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} />);
            }

           
            const remainingStars = totalStars - filledStars.length;
            for (let i = 0; i < remainingStars; i++) {
                filledStars.push(<FontAwesomeIcon key={`border-${i}`} icon={faStarBorder} />);
            }
        }

        return filledStars;
    };

    return (
        <Link to={`/details/${props.product.id}`} className="card col-lg-2 ProductNewCard">
            {!props.IsInHome && (
                <div className='DiscountNewCardContainer'>
                    <span> <b>{props.product.discount}%</b> <br /> {t("Off")}</span>
                </div>
            )}

            <div className="col-lg-12 Center ImageNewCardContainer">
                <img src={props.product.main_image} width="100%" alt="" srcset="" />
            </div>
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-12">
                        <h6 className='ProductName'> {props.product.name}</h6>
                        <p className='ProductNewCardDescription'>{props.product.short_desc}</p>
                        <div className="RateNewCard Center">
                            {generateStars(props.product.rating)}
                            <span>({props.product.rating || 0})</span>
                        </div>
                        <div className="priceNewCard">
                            <s className='ProductRegularPrice' dir='rtl'>
                                <span className='Price'> {props.product.list_price} </span>
                                <span className='CurrancyName'> {t("UAD")} </span>
                            </s>
                            <br />
                            <span className='ProductRegularPrice' dir='rtl'>
                                <span className='Price'>  {props.product.sale_price} </span>
                                <span className='CurrancyName'> {t("UAD")}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductNewCard;
