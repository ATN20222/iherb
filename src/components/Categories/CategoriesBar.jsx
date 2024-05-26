import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HealthImg from '../../Assets/Images/Health.png'
import HerbsImg from '../../Assets/Images/Herbs.png'
import OilsImg from '../../Assets/Images/Oils.png'
import HoneyImg from '../../Assets/Images/Honey.png'
const CategoriesBar= ()=>{
    const { t, i18n } = useTranslation();
    const [CurrentCategoryFont, setCurrentCategoryFont] = useState('LightFontEn');
  
    useEffect(() => {
        if (i18n.language === 'ar') {
            setCurrentCategoryFont('BoldFontAr');
        } else {
            setCurrentCategoryFont('BoldFontEn');
        }
    }, [i18n.language]);
  
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return(
            <div className="row container">
                <div className="col-lg-3 col-md-3 col-sm-3 CategoryItem pd-0"> 
                <button className='btn btn-outline-warning CategoryBtn'>
                    <div className="row">
                    <div className="col-lg-6 Center">
                        <img src={HealthImg} width="60%" alt="" />
                    </div>
                    <div className="col-lg-6 Center">
                        <span className={`CategoryText CategoryTextHealth Center ${CurrentCategoryFont}`}>
                        {t('HealthBeauty')}
                        </span>

                    </div>
                    </div>
                </button>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 CategoryItem pd-0"> 
                <button className='btn btn-outline-warning CategoryBtn'>
                    <div className="row">
                        <div className="col-lg-6 Center">
                        <img src={HoneyImg} width="60%" alt="" />
                        </div>
                        <div className="col-lg-6 Center">
                        <span className={`CategoryText Center ${CurrentCategoryFont}`}>
                            {t('Honey')}
                        </span>

                        </div>
                    </div>
                </button>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 CategoryItem pd-0"> 
                <button className='btn btn-outline-warning CategoryBtn Center'>
                    <div className="row">
                        <div className="col-lg-6 Center">
                        <img src={OilsImg} width="40%" alt="" />
                        </div>
                        <div className="col-lg-6 Center">
                        <span className={`CategoryText Center ${CurrentCategoryFont}`}>
                            {t('Oils')}
                        </span>

                        </div>
                    </div>
                </button>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 CategoryLastItem  pd-0"> 
                <button className='btn btn-outline-warning CategoryBtn'>
                        <div className="row">
                        <div className="col-lg-6 Center">
                            <img src={HerbsImg} width="50%" alt="" />
                        </div>
                        <div className="col-lg-6 Center">
                            <span className={`CategoryText Center ${CurrentCategoryFont}`}>
                            {t('Herbs')}
                            </span>

                        </div>
                        </div>
                </button>
                </div>
            </div>
    );
}
export default CategoriesBar;
