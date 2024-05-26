import React from "react";
import './Slider1.css'
import ProductCard  from '../Product/ProductCard';
import Slider from 'react-slick';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const CategoriesSlider3=({categories})=>{
    const CustomPrevArrow = (props) => (
       
        <div className="nextCat" onClick={props.onClick}>
                
            <FontAwesomeIcon icon={faChevronLeft}/>
        </div>
    );

    const CustomNextArrow = (props) => (
        <div className="prevCat" onClick={props.onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
            
        </div>
    );
    var settings = {
        
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                className: "center",
                breakpoint: 1290,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false
                }
                },
            {
            className: "center",
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false
            }
            },
            {
                className: "center",
                breakpoint: 990,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
                },
            {
            className: "center",
            breakpoint: 776,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 2,
                dots: false

            }
            },
            {
            className: "center",
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: false
            }
            }
        ],
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
        };


    return(
        <div className="slider-container container">
            
            


        <Slider {...settings}>
                {categories&&categories.map((category, index) => (
                    <Link to={`/products?category=${category.id}`} className="CatName" key={index}>{category.cat_name}</Link>
                ))}

          

        </Slider>
        </div>
        
        
    );

}
export default CategoriesSlider3;