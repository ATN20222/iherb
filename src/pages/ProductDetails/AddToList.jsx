import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import { ProductsService, productService } from "../../services/Services";
import { Link } from "react-router-dom";
import AddNewList from "../MyProfile/Lists/AddNewList";

const AddToList = ({ onClick , productId }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [ShowAddNewList,setShowAddNewList] = useState(false);

  const [formData, setFormData] = useState({
    selectedLists: []
  });
  const [myLists, setMyLists] = useState([]);

  useEffect(() => {
    
    const fetchMyLists = async () => {
      try {
        const auth_key = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        const response = await productService.ListMyLists(auth_key, user_id);
        if(response.status) {
          setMyLists(response.data);
        } else {
          alert("Failed to fetch MyLists");
        }
      } catch (error) {
        console.error("Error fetching MyLists: ", error);
        alert("Failed to fetch MyLists");
      }
    };

    fetchMyLists();
  }, []);

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
    return showDetails;
  };

 

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        selectedLists: [...formData.selectedLists, name]
      });
    } else {
      setFormData({
        ...formData,
        selectedLists: formData.selectedLists.filter(item => item !== name)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.selectedLists.length === 0) {
      alert("You must select at least one list");
      return;
    }
    try {
      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      
      console.log(
        auth_key,
        user_id,
        formData.selectedLists,
        productId
        );

      for (const listId of formData.selectedLists) {
        console.log(
            auth_key,
            user_id,
            listId,
            productId
            );
        const response = await ProductsService.AddToList(
          auth_key,
          user_id,
          listId,
          productId
          
        );
        
        console.log(response);
        if (!response.status) {
          alert("Failed to add product to list");
          return;
        }
      }
  
      alert("Product added to selected lists successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error adding to list: ", error);
      alert("Failed to add product to list ");
    }
  };
  

  const handleDetailsCardClick = (event) => {
    event.stopPropagation();
  };
  const handleAddList = (e) => {
    setShowAddNewList(e);
};
  return (
    <div className="Overlay" onClick={() => onClick(handleDetailsClick)}>
      <div className="container">
        {ShowAddNewList && <AddNewList onClick={handleAddList} />}
        <form className="LocationsForm" onSubmit={handleSubmit}>
          <div className="row Center">
            <div
              className="col-lg-5 col-md-7 col-sm-9 col-10 card OrderDetailsCard AddToListCard"
              onClick={handleDetailsCardClick}
            >
              <div
                className="CloseDetailsItem"
                onClick={() => onClick(handleDetailsClick)}
              >
                <FontAwesomeIcon icon={faClose} />
              </div>
              <div className="col-lg-9 AddLocationTitle">
                <h4>{t("AddToList")}</h4>
              </div>

             
         
              

              
              <div className="col-lg-9 EditEmailInput ListsCheckBoxes">
                {myLists.map(list => (
                  <div key={list.id} className="ListCheckBox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={list.id}
                      name={list.id}
                      checked={formData.selectedLists.includes(list.id)}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor={list.id}>
                      {list.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="AddListHeader AddListHeaderInAddToList">
                    <Link className="link-item" onClick={() => handleAddList(true)} >
                        
                        {t("AddNewList")}</Link>
                    <FontAwesomeIcon className="ListIcon AddIcon" icon={faPlusCircle} />
                
                
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

export default AddToList;
