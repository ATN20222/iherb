// YourComponent.js
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
import { useLocation, useParams } from 'react-router-dom';
import Filters from './Filters.jsx';
import FilterImg from '../../Assets/Images/filter.svg';
import CategoriesSlider2 from '../../components/Slider/CategoriesSlider2.jsx';
import CategoriesSlider3 from '../../components/Slider/CategoriesSlider3.jsx';
import NoItemsImage from '../../Assets/Images/JAR ICON-01.svg'
import CategoriesSlider1 from '../../components/Slider/CategoriesSlider1.jsx';
import SubCategoriesSlider from '../../components/Slider/SubCategoriesSlider.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';

const Products = (props) => {




  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
};
const [categories , setCategories] = useState([]);

  const [checkedItems, setCheckedItems] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);
  const [IsSearch , setIsSearch] = useState(false);
  const { homeType } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const categoryQuery = searchParams.get('category');
  const groupQuery = searchParams.get('group');
  const [isSmallWidth, setIsSmallWidth] = useState(window.innerWidth < 990);
  const [CurselectedCategoryId, setCurSelectedCategoryId] = useState(null);
  const [CurselectedPriceRange, setCurSelectedPriceRange] = useState(null);
  const [CurselectedRating, setCurSelectedRating] = useState(null);
  const [CurselectedOrder, setCurSelectedOrder] = useState(null);
  const [start, setstart] = useState(0);
  const [limit, setlimit] = useState(30);
  const [TotalProducts, seTotalProducts] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [EnableShowMore, setEnableShowMore] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallWidth(window.innerWidth < 990);
    };

    
  }, []);
  const handleFilterApply = (selectedCategoryId , selectedOrder ,selectedPriceRange ,selectedRating) => {
    console.log(selectedCategoryId , selectedOrder ,selectedPriceRange ,selectedRating);
    setCurSelectedCategoryId(selectedCategoryId);
    setCurSelectedPriceRange(selectedPriceRange);
    setCurSelectedRating(selectedRating);
    setCurSelectedOrder(selectedOrder);
    HandleApply(selectedCategoryId , selectedOrder ,selectedPriceRange ,selectedRating);
  };



  const [isFilterListOpen, setIsFilterListOpen] = useState(false);

  const handleFilterButtonClick = () => {
    setIsFilterListOpen(!isFilterListOpen);
  };

  const handleShadowDivClick = () => {
    if (isFilterListOpen) {
      setIsFilterListOpen(false);
    }
  };
  const handleInnerDivClick = (e) => {
    e.stopPropagation();
  };



  useEffect(() => {
      GetCats();
      console.log('categoryQuery:', categoryQuery);
      if(searchQuery != null ||searchQuery != ""&&categoryQuery==null &&groupQuery==null)
        setIsSearch(true)
      else if(categoryQuery!=null &&groupQuery!=null){
        setIsSearch(false);
      }
  }, [searchQuery]);

  const handleCollapseToggle = (isOpen, newCheckedItems) => {
    if (!isOpen) {
      setCheckedItems(newCheckedItems);
    }
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchQuery&&!categoryQuery&&!groupQuery) {
      console.log("GetProducts(true)");
      GetProducts(true);
    }
    else {
      console.log("GetProducts(false)");
      
      GetProducts(false);
    }
  }, [searchQuery]);

 

  async function GetProducts(IsSearch) {
    try {
      
      
      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      var response =[];
      if(IsSearch)
        response= await ProductsService.GetProductsWith(auth_key, user_id, start, limit ,homeType ,"keyword" ,searchQuery );
      else if(homeType!=null)
        response= await ProductsService.GetProductsWith(auth_key, user_id, start, limit ,homeType);
      else
        response= await ProductsService.GetProductsWith(auth_key, user_id, start, limit ,homeType ,"keyword" ,"" );

      console.log("GetProducts" , response);

      // console.log(response); 
      if(response.status){

        setProducts([...products, ...response.data]); 
        if(response.data.length== 30){
          setEnableShowMore(true);
          
        }else{
          setEnableShowMore(false);

        }
        
      }
    } catch (error) {
      console.error('Error fetching products:', error);

    }
  }
  async function HandleApply(selectedCategoryId , selectedOrder ,selectedPriceRange ,selectedRating){
    try {
        const auth_key = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        var PriceFrom =null;
        var PriceTo = null;
        if(selectedPriceRange){
            PriceFrom = selectedPriceRange.split(",")[1];
            PriceTo = selectedPriceRange.split(",")[0];
        }
        

        console.log(auth_key , user_id , selectedCategoryId , start , limit , selectedRating ,PriceFrom , PriceTo, selectedOrder);
        

        const response = await ProductsService.Filter(auth_key , user_id , selectedCategoryId , start , limit , selectedRating ,PriceFrom , PriceTo, selectedOrder);
        console.log(response);
        if(response.status){
          setProducts(response.data)
          setCurSelectedCategoryId(null);
          setCurSelectedOrder(null);
          setCurSelectedPriceRange(null);
          setCurSelectedRating(null);
          if(response.data[0].total_products>30){
            setEnableShowMore(true);
          }
          if(limit>TotalProducts){
            setIsLastPage(true);
            return;
          }
        }
       
        
      } catch (error) {
        console.error('Error fetching home data:', error.message);
      }
  }

  useEffect(()=>{
    if(props.IsDeals)
      GetOffers();
  },[]);
  async function GetOffers(){
    try {
      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
     
      
        const response= await ProductsService.GetOffers(auth_key, user_id, start, limit  );
      if(response.status){
        setProducts(response.data); 
        if(response.data[0].total_products>30){
          setEnableShowMore(true);
        }
        if(limit>TotalProducts){
          setIsLastPage(true);
          return;
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);

    }
  }
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
  const handleShowMore = async () => {

        const newLimit = limit+30;
        const newStart = start+30;
        console.log(newLimit);
        console.log(newStart);
        
        setlimit(newLimit);
        setstart(newStart);
        
        if (searchQuery&&!categoryQuery&&!groupQuery) {
          console.log("GetProducts(true)");
          GetProducts(true);
        }
       
        else {
          console.log("GetProducts(false)");
          
          GetProducts(false);
        }

      
    
};
  return (
 
    <section className='AllProductsSection'>

      {categoryQuery&&
        
          SubCategories.length>0?<SubCategoriesSlider categories={SubCategories||[]}/>:" "

        
      }
      <div className="AllProductsContainer">
      {isSmallWidth &&isFilterListOpen && (
          <div className={`Shadow Flow ${isFilterListOpen ? 'active' : ''}`} onClick={handleShadowDivClick}>
            <div className="card SettingsCard CardFilters" onClick={handleInnerDivClick}>
              <Filters Apply={handleFilterApply} />
            </div>
          </div>
        
          )}
        <div className="ProductsRow row">
          <div className="col-lg-8">

          {isSmallWidth && (
                  
              <button onClick={handleFilterButtonClick} className='btn d-flex Center FiltersBtn'><img src={FilterImg} width="15px"  alt="" />FILTER</button>
            )}
            
            {products.length==0&&
              <div className="NoFound">
                <img src={NoItemsImage} width="250px" alt="" />
                <h1>{t("NoItemsFound")}</h1>
              </div>
            }  
            {!props.IsDeals && (
              
              <div className="row AllProductsRow">
                {products&&products.map((product, index) => (
                    <ProductCard  product={product} IsInHome={true} key={index} />
                ))}
              </div>
                    
                )}

              {props.IsDeals && (
                        
                        <div className="row AllProductsRow">
                          {products&&products.map((product, index) => (
                    <ProductNewCard key={index} product={product} IsInHome={false}/>
                ))}
              
            </div>
                    
                )}
                
                {EnableShowMore && (
                    <div className="text-center ShowMoreBtn">
                        <button className="btn btn-warning" onClick={handleShowMore}> Show more <FontAwesomeIcon icon={faAnglesDown}/> </button>
                    </div>
                )}
          </div>
          
          <div className="col-lg-3 col-md-5 col-sm-5 RightFilterCol">
            {!isSmallWidth && (
            <div className="card SettingsCard CardFilters">
              
              <Filters Apply={handleFilterApply} />

            </div>
              )}
            

          </div>

          

        </div>
      </div>
    </section>
    
  );
};

export default Products;
