import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import { ProfileService } from "../../../../services/Services";

const EditLocation = ({ onClick, locationData }) => {
    const [showDetails, setShowDetails] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        primary: false
    });

    useEffect(() => {
        if (locationData) {
            setFormData({
                name: locationData.name,
                phone: locationData.phone,
                address: locationData.address,
                primary: locationData.primary === '1'
            });
        }
    }, [locationData]);

    const handleDetailsClick = () => {
        setShowDetails(!showDetails);
    };

    const handleDetailsCardClick = (event) => {
        event.stopPropagation();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);


        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            
            console.log(auth_key,
                user_id,
                locationData.id,
                formData.name,
                formData.phone,
                formData.primary ? 1 : 0,
                formData.address);
                
          const response = await ProfileService.EditLocation(
            auth_key,
            user_id,
            locationData.id,
            formData.name,
            formData.phone,
            formData.primary ? 1 : 0,
            formData.address
          );
          if(response.status){
            alert("location edited successfully");
    
            window.location.reload();
          }else{
            alert("Failed to edit location");
          }
          setFormData({
            name: "",
            phone: "",
            address: "",
            primary: false
          });
          
          setShowDetails(false);
        } catch (error) {
            alert("Failed to edit location");
          
        }


    };

   

    return (
        <div className="Overlay" onClick={handleDetailsClick}>
            <div className="container">
                <form className="LocationsForm" onSubmit={handleSubmit}>
                    <div className="row  Center">
                        <div className="col-lg-5 col-md-7 col-sm-9 col-10 card OrderDetailsCard" onClick={handleDetailsCardClick}>
                            <div className="CloseDetailsItem" onClick={() => onClick(handleDetailsClick)}>
                                <FontAwesomeIcon icon={faClose} />
                            </div>
                            <div className="col-lg-9 EditLocatoinCol AddLocationTitle">
                                <h4>{t("EditDeliveryLocation")}</h4>
                            </div>
                                <input type="hidden"  name="" id="" />
                                <div className="col-lg-9 EditLocatoinCol EditEmailInput">
                                    <input
                                        className="col-lg-12 form-control EmailInput"
                                        dir="rtl"
                                        placeholder={t("Name")}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-lg-9 EditLocatoinCol EditEmailInput">
                                    <input
                                        className="col-lg-12 form-control EmailInput"
                                        dir="rtl"
                                        placeholder={t("PhoneNumber")}
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-lg-9 EditLocatoinCol EditEmailInput AddLocTextArea">
                                    <textarea
                                        className="col-lg-12 form-control EmailInput"
                                        dir="rtl"
                                        placeholder={t("Address")}
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div className="col-lg-9 EditLocatoinCol EditEmailInput SetDefaultCol">
                                    <label htmlFor="SetMainAdd">{t("SetMainAdd")}</label>
                                    <input
                                        id="SetMainAdd"
                                        type="checkbox"
                                        className="form-checkbox"
                                        name="primary"
                                        checked={formData.primary}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>

                                <div className="col-lg-12 EditLocatoinCol LoginWithCol">
                                    <button className="btn btn-warning col-12 LoginBtn">
                                        <span className="Login">{t("Save")}</span>
                                    </button>
                                </div>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLocation;
