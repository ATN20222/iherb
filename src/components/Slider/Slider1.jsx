import React, { useState, useEffect } from "react";
import './Slider1.css';
import ProductCard from '../Product/ProductCard';
import Slider from 'react-slick';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Slider1 = ({ products }) => {
    const responsive = {
        superLargeDesktop: {
  
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        
        desktop: {
          breakpoint: { max: 3000, min: 1200 },
          items: 5
        },
        ipad: {
          breakpoint: { max: 1200, min: 990 },
          items: 4
        },
        tablet: {
            breakpoint: { max: 990, min: 768 },
            items: 3
          },

        mobile: {
          breakpoint: { max: 768, min: 446 },
          items: 2
        },
        smobile: {
          breakpoint: { max: 446, min: 328 },
          items: 2
        },
        xsmobile: {
          breakpoint: { max: 328, min: 0 },
          items: 1
        }
      };



    return (
        <div className="slider-container container">
            
            <Carousel responsive={responsive}>
                 {products && products.map((product, index) => (
                    <ProductCard key={index} product={product} IsInHome={true} />
                ))}
            </Carousel>
                
          
            
        </div>
    );
}

export default Slider1;
