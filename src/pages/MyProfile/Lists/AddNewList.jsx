import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import { ListService } from "../../../services/Services";

const AddNewList = ({onClick})=>{
    const [showDetails, setShowDetails] = useState(false);
    const [Name , SetName] = useState("");
    const handleDetailsClick= ()=>{
        setShowDetails(!showDetails);
        return showDetails;
    }
    const handleDetailsCardClick = (event) => {
        event.stopPropagation();
    }


    async function CreateList(){
        if(Name==""){
            alert("Name is required");
            return;
        }
        try{

            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ListService.CreateList(auth_key , user_id ,Name, 0 );
            console.log("response" , response);
            if(response.status){
                alert("List created successfully");
                window.location.reload();
            }else{
                alert("error");
            }


        }catch(e){
            alert("error");
        }
    }



    return(
        <div className="Overlay" onClick={() => onClick(handleDetailsClick)} >
            <div className="container">
                <div className="row  Center">
                    <div className="col-lg-5 col-md-7 col-sm-9 col-10 card OrderDetailsCard "onClick={handleDetailsCardClick}   >
                        <div className="CloseDetailsItem"  onClick={() => onClick(handleDetailsClick)} >
                            <FontAwesomeIcon icon={faClose}/>
                        </div>
                        <div className="col-lg-9 AddLocationTitle" >
                            <h4 >{t("AddNewList")}</h4>
                        </div>
                        <div className="col-lg-9 EditEmailInput">
                            <input 
                                className="col-lg-12 form-control EmailInput" 
                                dir="rtl"  
                                placeholder={t("ListName")}
                                onChange={(e) => SetName(e.target.value)}
                            
                            ></input>
                        </div>
                       
                        

                        <div className="col-lg-12 LoginWithCol ">
                            <button className="btn btn-warning col-12 LoginBtn" onClick={CreateList}>
                                <span className="Login"> {t("Save")} </span>
                            </button>
                        </div>


                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddNewList;