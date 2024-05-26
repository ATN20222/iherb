import React, { useEffect, useState } from 'react';

import CategoriesBar from "../../components/Categories/CategoriesBar";
import { useParams } from "react-router-dom";
import SpecialOfferImg from '../../Assets/Images/special offer.png'
import './Details.css'
import ProductDetailsImage from '../../Assets/Images/ProductDetailsImage.png';
import StarImg from '../../Assets/Images/star.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarBorder } from '@fortawesome/free-regular-svg-icons';
import { ListService, ProductsService, productService } from '../../services/Services';
import { t } from 'i18next';
import Review from '../../components/Review/Review';
import AddToList from './AddToList';

const Details = () => {
    const [IsSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
    const [selectedVariationId, setSelectedVariationId] = useState(null);
    const [isLoadingVariationTwo, setIsLoadingVariationTwo] = useState(false); 
    const [showAddToList, setShowAddToList] = useState(false);
    const [mainImage, setMainImage] = useState(false);


    const handleSeeButtonClick = () => {
        setIsSeeMoreOpen(!IsSeeMoreOpen);
    };

    const handleShadowDivClick = () => {
        if (IsSeeMoreOpen) {
            setIsSeeMoreOpen(false);
        }
    };

    const handleInnerDivClick = (e) => {
        e.stopPropagation();
    };

    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([]);
    const [VariationOne, SetVariationOne] = useState(null);
    const [VariationTwo, SetVariationTwo] = useState(null);
    const [ProductPhotos, SetProductPhotos] = useState([]);
    const [InStock , SetInStock] = useState("");
    const [Reviews , SetReviews] = useState([]);

    useEffect(() => {
        GetDetails();
    }, []);

    async function GetDetails() {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            const response = await ProductsService.GetProductDetails(auth_key, user_id, productId);
            console.log(response.data);
            if (response.status) {
                setProduct(response.data);
                SetReviews(response.data.reviews)
                SetProductPhotos(response.data.photos);
                SetVariationOne(response.data.variations[0]);
                SetVariationTwo(response.data.variations[1]);
                setMainImage(response.data.main_image);
                SetInStock(response.data.stock);
            } else {
                window.location.href = '/notfound';
            }
        } catch (error) {
            console.error('Error fetching product:', error);

        }
    }

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlus = () => {
        setQuantity(quantity + 1);
    };

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

    async function addToCart() {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            const response = await ProductsService.AddToCart(auth_key, user_id, productId, quantity)
            if (response.status) {
                alert("Product added successfully");

            } else {
                alert("Failed to add");
            }
        } catch (error) {
            alert("Failed to add");

        }
    }

    async function addToFav() {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            const response = await ProductsService.AddtoList(auth_key, user_id, localStorage.getItem('FavId'), productId);
            if (response.status) {
                alert("Product added successfully");

            } else {
                alert("Failed to add");
            }
        } catch (error) {
            alert("Failed to add");

        }
    }

    async function RemoveFav() {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            const response = await ListService.RemoveProductInList(auth_key, user_id, localStorage.getItem('FavId'), productId);
            if (response.status) {
                alert("Product removed successfully");

            } else {
                alert("Failed to remove");
            }
        } catch (error) {
            alert("Failed to remove");

        }
    }

    const buttonClass = `btn FavBtn ${isFav ? 'AddedToFav' : ''}`;

    function VariationOneHandle(id, name) {
        if (VariationTwo == null) {
            window.location.href = `${id}`;
        } else {
            setIsLoadingVariationTwo(true); 
            getSecVar(VariationOne.variation_id, VariationOne.main_product_id, name);
        }
    }

    function VariationTwoHandle(id) {
        window.location.href = `${id}`;
    }

    async function getSecVar(varId, mId, name) {
        try {
            const auth_key = localStorage.getItem('token');
            const response = await productService.GetSecondVariation(auth_key, varId, mId, name);

            if (response.status) {
                var newData = VariationTwo;
                newData.options = response.data;
                SetVariationTwo(newData);
            } else {
                alert("Failed");
            }
        } catch (error) {
            alert("Failed");
        } finally {
            setIsLoadingVariationTwo(false); 
        }
    }
    const handleAddLocation = (e) => {
        setShowAddToList(e);
    };

    return (
        <section className="AllProductsSection">
            {showAddToList && <AddToList onClick={handleAddLocation} productId={productId}  />}

            {IsSeeMoreOpen && (
                <div className={`Shadow ${IsSeeMoreOpen ? 'active' : ''}`} onClick={handleShadowDivClick}>
                    <div className="card SettingsCard CardFilters GalleryCard" onClick={handleInnerDivClick}>
                        <div className="container">
                            <div className="row Center GalleryRow">
                                {ProductPhotos && ProductPhotos.map((photo, index) => (
                                    <div key={index} className="GItem card GalleryItem col-lg-3 col-sm-3 ">
                                        <img src={photo.photo} width="100%" alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* <div className="Container">
                <div className="HeaderRow row">
                    <div className="col-lg-7">
                        <div className="">
                            <CategoriesBar />
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div> */}
            <div className="AllProductsContainer">
                <div className="ProductsRow row">
                    <div className="col-lg-3 col-md-7 col-sm-7 ProductImagesContainer">
                        <button className={buttonClass + " FavBtnInDetails"} onClick={(e) => {
                            handleFavClick()
                            addToFav()

                        }}>
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                        <div className="container">
                            <div className="row Center">
                                <div className="col-lg-12 col-md-12 MainImageContainer">
                                    <img src={mainImage} width="90%" alt="" />
                                </div>
                                    <div  onClick={()=>setMainImage(product.main_image)} className="col-lg-3 col-md-2 col-sm-2 card SubImageCard" >
                                        <img src={product.main_image} width="100%" alt="" />
                                    </div>
                                {ProductPhotos && ProductPhotos.map((photo, index) => (
                                    <div  onClick={()=>setMainImage(photo.photo)} className="col-lg-3 col-md-2 col-sm-2 card SubImageCard" key={index}>
                                        <img src={photo.thumbnail_photo} width="100%" alt="" />
                                    </div>
                                ))}
                                {/* {ProductPhotos.length > 1 &&
                                    <div className="col-lg-3 col-md-2 col-sm-2 card SubImageCard" onClick={handleSeeButtonClick}>
                                        <div className='SubImageSeeMore Center'>
                                            see more
                                        </div>
                                        <img src={product.main_image} width="100%" alt="" />
                                    </div>
                                } */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 CenterDetailsCol" dir='rtl'>
                        <div className="DetailsHeader">
                            <h2 className='d-block'>{product.name}</h2>
                            <p> {product.short_desc} </p>
                        </div>
                        <div className="RateInDetails">
                            <span>({product.rating || 0})</span>
                            {generateStars(product.rating)}
                        </div>
                        <div className="RateInDetails stock">
                            {InStock>0?<span> ({InStock}) {t("stock")} </span>
                            : <span> {t("OutOfStock")} </span>
                            }
                            
                        </div>

                        <hr className='DetailsHr' />
                        <div className="VariationsContainer">
                            {VariationOne &&
                                <div className="VariationOne">
                                    <div className="row">
                                        <h6 className='VariationName Center col-2' dir='ltr'> : {VariationOne.variation_name}</h6>
                                        {VariationOne.options.map((option, index) => (
                                            (option.product_id != null) &&
                                            <button
                                                onClick={() => {
                                                    VariationOneHandle(option.product_id, option.option_value);
                                                    setSelectedVariationId(option.product_id);
                                                }}
                                                key={index}
                                                className={`btn VarItemBtn col-2 ${option.product_id === selectedVariationId ? "btn-warning" : "btn-outline-dark"}`}
                                                // disabled={option.product_id == null || option.product_id == productId}
                                            >
                                                {option.option_value}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            }
                            {VariationTwo &&
                                <div className="VariationTwo">
                                    <div className="row">
                                        <h6 className='VariationName Center col-2' dir='ltr'> : {VariationTwo.variation_name}</h6>
                                        {isLoadingVariationTwo ? (
                                            <div className='LoadingVarTwo'>Loading...</div> 
                                        ) : (
                                            VariationTwo.options.map((option, index) => (
                                                (option.product_id != null) &&
                                                <button
                                                    onClick={() => {
                                                        VariationTwoHandle(option.product_id);
                                                        setSelectedVariationId(option.product_id);
                                                    }}
                                                    key={index}
                                                    className="btn VarItemBtn col-2  btn-outline-dark"
                                                >
                                                    {option.option_value}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                                    
                            
                            }
                            {VariationOne&&
                            <hr className='DetailsHr' />
                            }
                        </div>
                        
                        <div className="ProductDetailsInDetails">
                            <h6 className='DetailsHeader'>{t("ProductDetails")}</h6>
                            <span>{product.description}</span>
                            <hr className='DetailsHr' />

                        </div>
                        {Reviews.length>0&&
                            
                        <div className="ProductDetailsInDetails AllReviewsContainer">
                  
                            <h6 className='DetailsHeader'>{t("Reviews")}</h6>
                            {
                                Reviews.map((review)=>(
                                    <Review data={review} />
                                ))
                            }
                           
                           <hr className='DetailsHr' />
                        </div>
                        }
                       
                        

                    </div>
                    <div className="col-lg-2 col-md-5 col-sm-5 MostRightFilterCol">
                        <div className="PricesContainer">
                            <h4> <span className="PriceInDetails">{product.sale_price}</span> {t("UAD")} </h4>
                            <s ><h5 className="PriceBeforeInDetails"> <span >{product.list_price}</span> {t("UAD")}</h5></s>
                            {product.discount > 0 &&
                                <div className="Container">
                                    <div className='DiscountInDetails Center'>
                                       {t("Sale")}% {product.discount}
                                    </div>
                                </div>
                            }
                            <div className="CartFavQuantContainer" dir='rtl'>
                                {InStock>0&&
                                    <div className="Quantity">
                                        <h5 className='d-inline'>{t("Quantity")} : </h5>
                                        <div className="PlusMinusBtn d-inline">
                                            <button className='btn btn-warning' onClick={handlePlus}> <FontAwesomeIcon icon={faPlus} /> </button>
                                            <h5 className='d-inline'>{quantity}</h5>
                                            <button className='btn btn-warning' onClick={handleMinus}> <FontAwesomeIcon icon={faMinus} /> </button>
                                        </div>
                                    </div>
                                }
                                
                                <div className="RightSideBtns">
                                    {InStock>0&&
                                        <button className='btn btn-warning CardDetailsBtn' onClick={addToCart}>
                                            <span>{t("AddToCart")}</span>
                                            <FontAwesomeIcon icon={faCartShopping} />
                                        </button>
                                    }
                                    
                                    <button className='btn btn-outline-dark FavDetailsBtn' onClick={()=>setShowAddToList(true)}>
                                        <span> {t("AddToList")}</span>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Details;
