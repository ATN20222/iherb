import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import { ProfileService } from "../../../../services/Services";

const AddLocation = ({ onClick }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    primary: false
  });

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
    return showDetails;
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
    try {
        const auth_key = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        

      const response = await ProfileService.AddLcation(
        auth_key,
        user_id,
        formData.name,
        formData.phone,
        formData.primary ? 1 : 0,
        formData.address
      );
      if(response.status){
        alert("location added successfully");

        window.location.reload();
      }else{
        alert("Failed to add location");
      }
      setFormData({
        name: "",
        phone: "",
        address: "",
        primary: false
      });
      
      setShowDetails(false);
    } catch (error) {
        alert("Failed to add location");
      
    }
  };

  const handleDetailsCardClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="Overlay" onClick={() => onClick(handleDetailsClick)}>
      <div className="container">
        <form className="LocationsForm" onSubmit={handleSubmit}>
          <div className="row Center">
            <div
              className="col-lg-5 col-md-7 col-sm-9 col-10 card OrderDetailsCard"
              onClick={handleDetailsCardClick}
            >
              <div
                className="CloseDetailsItem"
                onClick={() => onClick(handleDetailsClick)}
              >
                <FontAwesomeIcon icon={faClose} />
              </div>
              <div className="col-lg-9 AddLocationTitle">
                <h4>{t("AddDeliveryLocation")}</h4>
              </div>

              <div className="col-lg-9 EditEmailInput">
                <input
                  className="col-lg-12 form-control EmailInput"
                  dir="rtl"
                  placeholder={t("Name")}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-lg-9 EditEmailInput">
                <input
                  className="col-lg-12 form-control EmailInput"
                  dir="rtl"
                  placeholder={t("PhoneNumber")}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-lg-9 EditEmailInput AddLocTextArea">
                <textarea
                  className="col-lg-12 form-control EmailInput"
                  dir="rtl"
                  placeholder={t("Address")}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="col-lg-9 EditEmailInput SetDefaultCol">
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

              <div className="col-lg-12 LoginWithCol ">
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

export default AddLocation;
