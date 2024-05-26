import React, { useEffect, useState } from "react";
import { faCamera, faChevronLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import PersonImage from '../../../Assets/Images/RagelKobara.png';
import { ProfileService } from "../../../services/Services";
const EditProfile = () => {

    const[profileImg , setProfileImg] = useState('');
    const[UploadedImg , setUploadedImg] = useState(null);
    const[name , setName] = useState('');
    const[PhoneNumber , setPhoneNumber] = useState('');

    const { t } = useTranslation();

    useEffect(()=>{
        ProfileData();
    },[]);
    async function ProfileData(){
        try{
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
      
            const response = await ProfileService.GetProfileInfo(auth_key,user_id);
            console.log("response", response);
            if(response.status){
                setName(response.data['name']);
                setPhoneNumber(response.data['phone']);
                setProfileImg(response.data['profile_photo']);
                localStorage.setItem("user_id"  , response.data['id'])
            }else{
                alert("error geting data");
            }


        }catch(e){
            alert("error geting data");
        }
    }

    async function SubmitEdit () {
        if(PhoneNumber==''||name == ''){
            alert('fields is required');
            return;
        }
        try{
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            console.log(UploadedImg)
            const response = await ProfileService.EditProfileInfo(auth_key,user_id , UploadedImg , name, PhoneNumber);
            console.log("response", response);
            if(response.status){
                setName(response.data['name']);
                setPhoneNumber(response.data['phone']);
                setProfileImg(response.data['profile_photo']);
                console.log("newImg",response.data['profile_photo']);
                alert("data edited successfully")
            }else{
                alert("error editing data");
            }


        }catch(e){
            alert("error editing data");
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUploadedImg(file);
    };
    return (
        <ul className="list-unstyled">
            <div className="CurrentLocationInProfile">
                <h5>
                    <span>{t("PersonalSettings")}</span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>{t("EditPersonalProfile")}</span>
                </h5>
            </div>
            
            <li className="list-item ">
                <div className="row EditMailRow">

                    <div className="col-lg-7  ItemInEdit row">
                    <input 
                            type="file" 
                            id="file" 
                            className="file-input"
                            onChange={handleFileChange}
                        />

                        <div className="col-lg-5 col-md-5 col-sm-5 col-5" >
                            <img src={profileImg} width="100%" alt="" />
                        </div>
                        <label htmlFor="file" className="upload-btn col-lg-7 col-md-7 col-sm-7 col-7">

                            <FontAwesomeIcon icon={faCamera}/> {t("ChangePhoto")}

                        </label>
                        
                    </div>
                    <div className="hr col-lg-7 col-md-12 col-sm-12 col-12"></div>


                    <div className="col-lg-7  ItemInEdit">
                        <h5 className="LabelInEditProfile">{t("EditName")} </h5>
                        <input
                            
                            className="col-lg-12 form-control EmailInput"
                            dir="rtl"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t("FullName")}
                            type="text"
                        />
                        
                    </div>
                    
                   
                <div className="hr col-lg-7 col-md-12 col-sm-12 col-12"></div>
                <div className="col-lg-7  ItemInEdit">
                        <h5 className="LabelInEditProfile">{t("PhoneNumber")}</h5>
                        <input
                            className="col-lg-12 form-control EmailInput"
                            dir="rtl"
                            placeholder={t("PhoneNumber")}
                            type="number"
                            value={PhoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        
                    </div>
                    <div className="hr col-lg-7 col-md-12 col-sm-12 col-12"></div>

                   
                    <div className="col-lg-7  LoginWithCol SavePasswordBtn SaveProfileData">
                        <button className="btn btn-warning col-12 LoginBtn  " 
                            onClick={SubmitEdit}
                        >
                            <span className="Login"> {t("Save")} </span>
                        </button>
                    </div>


                </div>
            </li>
            
        </ul>
    );
}

export default EditProfile;
