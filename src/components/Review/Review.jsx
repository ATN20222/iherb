import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarBorder } from '@fortawesome/free-regular-svg-icons';
const Review =({data})=>{

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
                filledStars.push(<FontAwesomeIcon className="Star" key={i} icon={faStar} />);
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

    return(
        <div className='RevContainer'>
                                <div className="ReviewCard">
                                    <div className='RevHeader'>
                                        <div className="ImgAndName">
                                            <div className='RevImg'>
                                                <img src={data.profile_photo} width="40px" height="40px"  alt="" />
                                            </div>
                                            <h5> {data.name}</h5>
                                        </div>
                                        <div className="RevRate">
                                            <span>({data.rating || 0})</span>
                                            {generateStars(data.rating)}
                                            <span className='RevDate'>{data.added_on}</span>
                                        </div>

                                    </div>
                                    <div className="RevDetails">
                                        <h6>{data.title}</h6>
                                        <span> {data.description}</span>
                                    </div>
                                </div>
                            </div>
    );
}
export default Review;