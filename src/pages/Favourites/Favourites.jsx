import React, { useEffect , useState } from 'react';
import ProductCard from '../../components/Product/ProductCard';
import './Favourites.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
const Favourites = () => {
    const { t, i18n } = useTranslation();
    const [CurrentHeaderFont, setCurrentHeaderFont] = useState('BoldFontEn');
    const [FavHeaderDirection, setFavHeaderDirection] = useState('FavHeader');
  
    useEffect(() => {
        if (i18n.language === 'ar') {
            setCurrentHeaderFont('BoldFontAr');
            setFavHeaderDirection('FavHeader');
        } else {
            setCurrentHeaderFont('BoldFontEn');
            setFavHeaderDirection('FavHeaderDirectionLtr');

        }
    }, [i18n.language]);
  
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return(
        <div className='container FavContainer'>
            
            <div className="ProductsRow row">
                
            <div className="col-lg-12">
            <div className="col-lg-12 FavHeader">
                    <h1 className={CurrentHeaderFont +" "+ FavHeaderDirection}> {t("MyFavourite")}</h1>
                </div>
            <div className="row FavRow Center">
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                <ProductCard IsInHome={false}/>
                </div>
                
              </div>
            </div>
            
        </div>
    );
}
export default Favourites;