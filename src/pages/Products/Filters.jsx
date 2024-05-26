import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductsService, homeService, productService } from '../../services/Services.js';
import './Products.css'
import CategoriesBar from '../../components/Categories/CategoriesBar.jsx';
import ProductCard from '../../components/Product/ProductCard.jsx';
import Star from '../../Assets/Images/star.png';
import Ad from '../../Assets/Images/AD.png'
import Collapse from '../../components/Collapse/Collapse.jsx';
import ProductNewCard from '../../components/ProductNewCard/ProductNewCard.jsx';


const Filters = (props) => {
  const { t, i18n } = useTranslation();
  const [categories , setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
};
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCollapseToggle = (isOpen, newCheckedItems) => {
    if (!isOpen) {
      setCheckedItems(newCheckedItems);
    }
  };

  const handleOrderChange = (Order) => {
    console.log(Order);
    setSelectedOrder(Order === selectedOrder ? null : Order);
  };
  

  const handleCategoryChange = (categoryId) => {
    console.log(categoryId);
    setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
  };
  const handlePriceRangeChange = (priceRange) => {
    console.log(priceRange);
    setSelectedPriceRange(priceRange === selectedPriceRange ? null : priceRange);
  };

  const handleRatingChange = (rating) => {
    console.log(rating);

    setSelectedRating(rating === selectedRating ? null : rating);
  };
  useEffect(()=>{
    GetCats();
  },[]);
  async function GetCats(){
    try {
      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');

     
      const Cats = await homeService.GetCategories(auth_key , user_id);
      if(Cats.status)
        setCategories(Cats.data)
      
    } catch (error) {
      console.error('Error fetching home data:', error.message);
    }
  }

  const handleClearFilters = () => {
    setSelectedCategoryId(null);
    setSelectedPriceRange(null);
    setSelectedRating(null);
    setSelectedOrder(null);
  };
  
    
  return(
    <div className="AllSettingsContainer">
                <div className="row">
                  <div className="col-lg-12">
                  <div>
                  <Collapse title={t('Category')}>
                    <div className="CollapsedItems" dir="ltr">
                    <div className="ItemCheckBox">
                            <label className="form-check-label" htmlFor={`category_00`}>
                                {t("All")}
                            <input
                                className="form-check-input"
                                type="radio"
                                id={`category_00`}
                                value={null}
                                onChange={() => handleCategoryChange(null)}
                                checked={selectedCategoryId === null}
                            />
                            </label>
                        </div>
                        {categories.map((category, index) => (
                        <div className="ItemCheckBox" key={index}>
                            <label className="form-check-label" htmlFor={`category_${index}`}>
                            {category.cat_name}
                            <input
                                className="form-check-input"
                                type="radio"
                                id={`category_${index}`}
                                value={category.id}
                                onChange={() => handleCategoryChange(category.id)}
                                checked={selectedCategoryId === category.id}
                            />
                            </label>
                        </div>
                        ))}
                    </div>
                </Collapse>


                <Collapse title={t('Price')}>
              <div className="CollapsedItems" dir="ltr">
                <div className="ItemCheckBox">
                  <label className="form-check-label" htmlFor="price_10_50">
                    {t("From")} 10 {t("To")} 49 {t("UAD")}
                    <input
                      className="form-check-input"
                      type="radio"
                      id="price_10_50"
                      onChange={() => handlePriceRangeChange('10,49')}
                      checked={selectedPriceRange === '10,49'}
                    />
                  </label>
                </div>

                <div className="ItemCheckBox">
                  <label className="form-check-label" htmlFor="price_50_100">
                  {t("From")} 50 {t("To")} 100 {t("UAD")}
                    <input
                      className="form-check-input"
                      type="radio"
                      id="price_50_100"
                      onChange={() => handlePriceRangeChange('50,100')}
                      checked={selectedPriceRange === '50,100'}
                    />
                  </label>
                </div>

                <div className="ItemCheckBox">
                  <label className="form-check-label" htmlFor="price_above_100">
                    {t("MoreThan")} 100 {t("UAD")}
                    <input
                      className="form-check-input"
                      type="radio"
                      id="price_above_100"
                      onChange={() => handlePriceRangeChange('99999,100')}
                      checked={selectedPriceRange === '99999,100'}
                    />
                  </label>
                </div>
              </div>
            </Collapse>


                    

            <Collapse title={t('Rate')}>
              <div className="CollapsedItems" dir="ltr">
                <div className="ItemCheckBox">
                  <label className="form-check-label" htmlFor="rating_1">
                  {t("Up")}<img src={Star} alt="" />
                    <input
                      className="form-check-input"
                      type="radio"
                      id="rating_1"
                      onChange={() => handleRatingChange(1)}
                      checked={selectedRating === 1}
                    />
                  </label>
                </div>

                <div className="ItemCheckBox">
                  <label className="form-check-label" htmlFor="rating_2">
                  {t("Up")}<img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <input
                      className="form-check-input"
                      type="radio"
                      id="rating_2"
                      onChange={() => handleRatingChange(2)}
                      checked={selectedRating === 2}
                    />
                  </label>
                </div>

                <div className="ItemCheckBox">
                  <label className="form-check-label" htmlFor="rating_3">
                  {t("Up")}<img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <input
                      className="form-check-input"
                      type="radio"
                      id="rating_3"
                      onChange={() => handleRatingChange(3)}
                      checked={selectedRating === 3}
                    />
                  </label>
                </div>

                <div className="ItemCheckBox">
                  <label className="form-check-label" htmlFor="rating_4">
                  {t("Up")}<img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <img src={Star} alt="" />
                    <input
                      className="form-check-input"
                      type="radio"
                      id="rating_4"
                      onChange={() => handleRatingChange(4)}
                      checked={selectedRating === 4}
                    />
                  </label>
                </div>

                
              </div>
            </Collapse>


            <Collapse title={t('OrderdBy')}>
              <div className="CollapsedItems" dir="ltr">
                

              <div className="ItemCheckBox">
                  <label className="form-check-label" htmlFor="desc">
                  {t("Desc")}
                    <input
                      className="form-check-input"
                      type="radio"
                      id="desc"
                      onChange={() => handleOrderChange("desc")}
                      checked={selectedOrder === "desc"}
                    />
                  </label>
                </div>

               

                <div className="ItemCheckBox">
                  <label className="form-check-label" htmlFor="asc">
                  {t("Asc")}
                    <input
                      className="form-check-input"
                      type="radio"
                      id="asc"
                      onChange={() => handleOrderChange("asc")}
                      checked={selectedOrder === "asc"}
                    />
                  </label>
                </div>

                
              </div>
            </Collapse>

                  </div>
                    <button className='btn btn-warning ApplyBtn' onClick={()=>props.Apply(selectedCategoryId , selectedOrder ,selectedPriceRange ,selectedRating)}>{t('Apply')}</button>
                  </div>

                  <div className="btn " onClick={handleClearFilters}>
                    {t("Clear")}
                  </div>
                </div>
    </div>
  );
}
export default Filters;