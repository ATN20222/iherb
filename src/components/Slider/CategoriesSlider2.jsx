import React from "react";
import './Slider1.css'
import ProductCard  from '../Product/ProductCard';
import Slider from 'react-slick';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { t } from "i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const CategoriesSlider2=({categories})=>{

    const responsive = {
        superLargeDesktop: {
  
          breakpoint: { max: 4000, min: 3000 },
          items: 10
        },
        
        desktop: {
          breakpoint: { max: 3000, min: 1200 },
          items: 8
        },
        ipad: {
          breakpoint: { max: 1200, min: 990 },
          items: 7
        },
        tablet: {
            breakpoint: { max: 990, min: 768 },
            items: 3
          },

        mobile: {
          breakpoint: { max: 768, min: 446 },
          items: 4
        },
        smobile: {
            breakpoint: { max: 446, min: 328 },
            items: 4 
          },
          xsmobile: {
            breakpoint: { max: 328, min: 0 },
            items: 2
          }

      };
    return(
        <div className="slider-container container CatsSliderHome">
            
            


            <Carousel responsive={responsive}>
                {categories&&categories.map((category, index) => (
                    <Link to={`/categories/${category.id}`} className="CatContainer">
                        <div className="circle-image">
                            <img src={category.icon} alt="Your Image" />
                        </div>
                        <div className="text">
                            <p>{category.cat_name}</p>
                        </div>
                    </Link>
                ))}

</Carousel>
        </div>
        
        
    );

}
export default CategoriesSlider2;