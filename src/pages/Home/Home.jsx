import './Home.css';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FirstImg from '../../Assets/Images/ADS.png';
import Slider1 from '../../components/Slider/Slider1';
import Slider2 from '../../components/Slider/Slider2';
import SubscribingImage from '../../Assets/Images/SubscribingImage.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer/Footer';
import CategoriesBar from '../../components/Categories/CategoriesBar';
import { homeService } from '../../services/Services';
import { Link } from 'react-router-dom';
import CategoriesSlider1 from '../../components/Slider/CategoriesSlider1';
import CategoriesSlider2 from '../../components/Slider/CategoriesSlider2';
import Loading from '../../components/Loading/Loading';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [CurrentCategoryFont, setCurrentCategoryFont] = useState('BoldFontEn');
  const [CurrentDirection, setCurrentDirection] = useState('rtl');
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [ImageSlider, setImageSlider] = useState([]);
  const [randIndex, setRandIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (i18n.language === 'ar') {
      setCurrentCategoryFont('BoldFontAr');
      setCurrentDirection('ltr');
    } else {
      setCurrentCategoryFont('BoldFontEn');
      setCurrentDirection('rtl');
    }
    fetchHomeData();
  }, [i18n.language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandIndex(prevIndex => {
        const newIndex = Math.floor(Math.random() * ImageSlider.length);
        return newIndex !== prevIndex ? newIndex : (newIndex + 1) % ImageSlider.length;
      });
    }, 10000);

    setTimeout(function() {
     
      // console.log("Timeout completed after 10 seconds!");
    }, 10000);


    return () => clearInterval(interval);
  }, [ImageSlider]);

  async function fetchHomeData() {
    try {
      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');

      const homeData = await homeService.GetHomeData(auth_key, user_id);
      const Groups = await homeService.GetGroups(auth_key, user_id);
      if(homeData.status&&Groups.status){
        const { products, selected_products, new_products, slider, categories } = homeData.data;
        setGroups(Groups.data);
        setProducts(products);
        setSelectedProducts(selected_products);
        setNewProducts(new_products);
        setCategories(categories)
        setIsLoading(false); 
        console.log(homeData)
        const imagesArr = slider.map(item => item.image);
        if (imagesArr != null)
          setImageSlider(imagesArr);
      }else{
        if(homeData.msg ==="wrong key"){
          alert("session expired");
          window.location.href='/login'
        }
      }
      
    } catch (error) {
      console.error('Error fetching home data:', error.message);
    }
  }

  return (
    <div className='Home'>
      {isLoading&&
        <Loading />
      }
        
          <section className='CategoriesSlider1'>
        {groups&&
          groups.length>0?<CategoriesSlider1 categories={groups||[]}/>:" "

        }
        
      </section>
      <section className='FirstHomeSection container'>
        <img src={ImageSlider[randIndex]} alt="" width="100%" />
      </section>
      
      <section className='CategoriesSection'>
        <div className="container">
          {/* <CategoriesBar/> */}
          {categories&&
            <CategoriesSlider2 categories={categories ||[] }/>
          }
          

        </div>
        
      </section>
      {products&&
        <section className='FirstSliderSection'>
          <div className="container">
            <div className="SliderHeader" dir={CurrentDirection}>
            <Link to={`/products/${"products"}`} className={'btn btn-warning ShowMoreProductsBtn ' + CurrentCategoryFont}>
              {t('More')}
            </Link>            
            <h3 className={'ProductsSliderHeader ' + CurrentCategoryFont}>{t('products')}</h3>
            </div>
            
          </div>
          <Slider1 products={products||[]}/>
        </section>
    
      
      }
      

      {selectedProducts&&
        <section className='SecondSliderSection'>
        <div className="container">
          <div className="SliderHeader" dir={CurrentDirection}>
            <Link to={`/products/${"selected"}`} className={'btn btn-warning ShowMoreProductsBtn '+ CurrentCategoryFont}>{t('More')}</Link>
            <h3 className={'ProductsSliderHeader ' + CurrentCategoryFont}>{t('ForYou')}</h3>
          </div>
          
        </div>
        <Slider2 products={selectedProducts||[]}/>
        
      </section>
      }

    <hr className='container' />
      {newProducts&&
        <section className='SecondSliderSection'>
          <div className="container">
            <div className="SliderHeader" dir={CurrentDirection}>
              <Link to={`/products/${"new"}`} className={'btn btn-warning ShowMoreProductsBtn '+ CurrentCategoryFont}>{t('More')}</Link>
              <h3 className={'ProductsSliderHeader ' + CurrentCategoryFont}>{t('NewProducts')}</h3>
            </div>
            
          </div>
          <Slider2 products={newProducts||[]}/>
          
        </section>
      }
      
      
      <hr className='container'/>
      <section className='SubscribeSection'>
        <div className="container">
          <div className="row Center">
            <div className="col-lg-4">
              <img className='MailingImg' src={SubscribingImage} width="80%" alt="" />
            </div>
            <div className="col-lg-4">
              <div className={"SubscribingText " +CurrentCategoryFont}>
                <h1>{t('NewsLetter')}</h1>
                <h5>{t('SubscribeUs')}</h5>
              </div>
              <div className="SubscribingInput">
                <input className='form-control' type="text" placeholder={t('YourEmail')} />
                <FontAwesomeIcon icon={faCircleArrowRight} />
              </div>
            </div>
          </div>
        </div>
      </section>

      

       
     
    </div>
  );
    
    

  
};

export default Home;
