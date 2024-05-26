import React from 'react';
import NotFoundImg from '../Assets/Images/PageNotFound.png'
const NotFound = () => {
  return (
    <div className='container'>
        <div className="row">
            <div className="col-lg-12">
                <img src={NotFoundImg} alt="" height="100%" width="500px" />
            </div>
            <div className="col-lg-12">
                <h2>404 - Not Found</h2>
                <p>The page you are looking for does not exist.</p>
            </div>
        </div>

    </div>
  );
};

export default NotFound;
