import React from "react";
import './Slider1.css'
import ProductCard  from '../Product/ProductCard';
import Slider from 'react-slick';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const SubGroupsSlider=({categories})=>{
    const HandleClick = (id)=>{
        window.location.href=`/categories/${id}`
    }
    const responsive = {
      superLargeDesktop: {
  
        breakpoint: { max: 4000, min: 3000 },
        items: 10
      },
      
      desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 9
      },
      ipad: {
        breakpoint: { max: 1200, min: 990 },
        items: 6
      },
      tablet: {
          breakpoint: { max: 990, min: 768 },
          items: 4
        },

      mobile: {
        breakpoint: { max: 768, min: 446 },
        items: 4
      },
      smobile: {
        breakpoint: { max: 446, min: 328 },
        items: 3
      },
      xsmobile: {
        breakpoint: { max: 328, min: 0 },
        items: 2
      }
    };
    return(
        <div className="slider-container container SubCategoriesSlider SubCatsAndGroups">
            
            
            <Carousel responsive={responsive}>
                {categories&&categories.map((category, index) => (
                    <Link onClick={()=>HandleClick(category.id)} className="CatName GroupItem" key={index}>{category.group_name}</Link>
                ))}


            </Carousel>
                
          

       
        </div>
        
        
    );

}
export default SubGroupsSlider;