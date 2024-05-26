import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";

const CancelOrder = ({onClick , onConfirmDelete })=>{
    const [showDetails, setShowDetails] = useState(false);
    const handleDetailsClick= ()=>{
        setShowDetails(!showDetails);
        return showDetails;
    }
    const handleDetailsCardClick = (event) => {
        event.stopPropagation();
    }
    return(
        <div className="Overlay CancelOrder" onClick={() => onClick(handleDetailsClick)} >
            <div className="container">
                <div className="row  Center">
                    <div className=" col-lg-3 col-md-5 col-sm-7 col-8 card OrderDetailsCard "onClick={handleDetailsCardClick}   >
                        <div className="CloseDetailsItem"  onClick={() => onClick(handleDetailsClick)} >
                            <FontAwesomeIcon icon={faClose}/>
                        </div>
                        <div className="col-lg-9 DeleteLocationTitle" >
                            <h4 c >{t("ConfirmCancelOrder")}</h4>
                        </div>
                        
                        
                        <div className="col-lg-12 ConfirmDeleteBtns">

                            <div className="col-lg-4 Center ">
                                <button className="btn btn-warning col-12 LoginBtn" onClick={() => onClick(handleDetailsClick)}>
                                    <span className="Login"> {t("No")} </span>
                                </button>
                            </div>

                            <div className="col-lg-4 Center ">
                                <button className="btn btn-warning col-12 LoginBtn" onClick={onConfirmDelete}>
                                    <span className="Login"> {t("Yes")} </span>
                                </button>
                            </div>
                            
                        </div>
                       


                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CancelOrder;