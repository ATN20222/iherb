import React, { useEffect, useState } from 'react';
import './ProductCard.css';
import ProductImg from '../../Assets/Images/ProductImage.png'
import Star from '../../Assets/Images/star.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarBorder } from '@fortawesome/free-regular-svg-icons';
import { t } from 'i18next';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {
    const [isFav, setIsFav] = useState(false);
    const handleFavClick = () => {
        setIsFav(!isFav);
    };



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

    const buttonClass = `btn FavBtn ${isFav ? 'AddedToFav' : ''}`;
    return(
        
        <Link to={`/details/${props.product.id}`} className=" card col-lg-2 col-sm-2 CardProduct ">
                
                {!props.IsInHome && (
                        
                            <button className={buttonClass} onClick={handleFavClick}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>   
                        
                    )}
                <div className="col-lg-12 Center ImageCardContainer">
                    <img src={props.product.main_image} width="100%" alt="" srcset="" />
                </div>
                <div className="col-lg-12">
                <div className="row">
                    
                    <div className="col-lg-6 col-md-6 col-sm-6 ProductCol PricingPart">
                        <span className='ProductRegularPrice' dir='rtl'>
                            <span className='Price'> {props.product.sale_price}  </span>
                            <span className='CurrancyName'> {t("UAD")} </span>
                            
                        </span>
                            <p className='ProductDiscountPrice' dir='rtl'>
                                <span className='DiscountPrice'> {props.product.list_price} </span>
                                <span className='CurrancyName'> {t("UAD")} </span>
                                
                            </p>
                            {props.product.discount>0&&
                                <div className='DiscountContainer'>
                                    <span> {t("Sale")} % {props.product.discount} </span>
                                </div>
                            }
                            
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 ProductCol NamingPart">
                        <h6 className='ProductName'> {props.product.name}</h6>
                        <p className='ProductDescription'>
                            {props.product.short_desc}
                        </p>
                    </div>
                    <div className='Rate'>
                            {generateStars(props.product.rating)}
                            <span>({props.product.rating || 0})</span>
                    </div>
                        
                    
                    
                </div>
            </div>
            
            
            
        </Link>
    );

}

export default ProductCard;