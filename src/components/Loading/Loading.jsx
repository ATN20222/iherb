import React, { useState } from "react";
import './Loading.css'
import LoadingImg from '../../Assets/Images/logo gif_2.gif'
const Loading = () => {



  return (
    <div className="Overlay LoadingOverlay" >
      <div className="container">
       
          <div className="row Center">
           
             
              
            <div className="col-12 Center LoadingImgContainer">
                <img src={LoadingImg} width="100px" alt="" />
            </div>
             

             
          </div>
        
      </div>
    </div>
  );
};

export default Loading;
