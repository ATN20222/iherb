import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './Footer.css';
import Logo  from  '../../Assets/Images/I_H_H_LOGO.png';
import AppStoreImg from '../../Assets/Images/download-on-the-app-store.svg'
import GooglePlayImg from '../../Assets/Images/Google_Play_Store_badge_EN.svg.png'
import { Link } from 'react-router-dom';

const Footer = ()=>{
    const { t, i18n } = useTranslation();
    const [CurrentFooterFont, setCurrentFooterFont] = useState('LightFontEn');
  
    useEffect(() => {
        if (i18n.language === 'ar') {
            setCurrentFooterFont('LightFontAr');
        } else {
            setCurrentFooterFont('FooterFontEn');
        }
    }, [i18n.language]);
  
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return(
        <section className="FooterSection">
        <div className="FooterShadow"></div>
        <footer>
          <div className="container">
            <div className="row FooterRow">
              <div className="col-lg-3 FooterLogo">
                <div className="row">
                  <div className="col-lg-12">
                    <img src={Logo} alt="" width="80px"/> 

                    <span className='LogoFooterWords BoldFontEn Center'>
                        I HONEYHERB
                    </span>
                    
                  </div>
                  
                  <div className="col-lg-12 btnCotainer FooterDownload Center">
                    
                      <img className="bn46" src={AppStoreImg} width="100%" alt="bn45" />
                    
                    
                  </div>
                  <div className="col-lg-12 btnCotainer FooterDownload Center">
                  
                      <img className="bn45" src={GooglePlayImg} alt="bn45" width="100%" />
                    
                  </div>
                </div>
                <div></div>
              </div>
  
              <div className="col-lg-3 col-md-4 col-sm-4 Center LinksCol">
                <div className="row Center">
                  <div className="col-lg-12">
                    <ul className="list-unstyled">
                      <li className="list-item FooterListItem">
                        <Link  onClick={() => {
                            window.location.href='/categories/62';
                        }}
                         className={`FooterLink ${CurrentFooterFont}`} >{t('TheHoney')}</Link>
                      </li>
                      <li className="list-item FooterListItem">
                        <Link
                        onClick={() => {
                          window.location.href='/categories/83';
                      }}
                        className={`FooterLink ${CurrentFooterFont}`}  >{t('Oils')}</Link>
                      </li>
                      <li className="list-item FooterListItem">
                        <Link
                        onClick={() => {
                          window.location.href='/categories/77';
                      }}
                         className={`FooterLink ${CurrentFooterFont}`}  >{t('Herbs')}</Link>
                      </li>
                      <li className="list-item FooterListItem">
                        <Link
                        onClick={() => {
                          window.location.href='/categories/69';
                      }}
                         className={`FooterLink ${CurrentFooterFont}`} >{t('HealthBeauty')}</Link>
                      </li>
                      
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-3 col-md-4 col-sm-4 Center LinksCol">
                <div className="row Center">
                  <div className="col-lg-12">
                    <ul className="list-unstyled">
                      <li className="list-item FooterListItem">
                        <Link
                        onClick={() => {
                          window.location.href='/products/products';
                      }}
                        className={`FooterLink ${CurrentFooterFont}`}  >{t('products')}</Link>
                      </li>
                      <li className="list-item FooterListItem">
                        <Link
                        onClick={() => {
                          window.location.href='/products/new';
                      }}
                         className={`FooterLink ${CurrentFooterFont}`} >{t('NewProducts')}</Link>
                      </li>
                      <li className="list-item FooterListItem">
                        <Link
                        onClick={() => {
                          window.location.href='/products/selected';
                      }}
                         className={`FooterLink ${CurrentFooterFont}`}  href="">{t('ForYou')}</Link>
                      </li>
                      
                    </ul>
                  </div>
                </div>
              </div>
  
              <div className="col-lg-3 col-md-4 col-sm-4 Center FooterContact">
                <div className="row Center">
                  <div className="col-lg-12">
                  <ul className="list-unstyled">
                      <li className="list-item FooterListItem">
                        <Link  to="/termsofconditions" className={`FooterLink ${CurrentFooterFont}`} >{t('TermsOfCondition')}</Link>
                      </li>
                      <li className="list-item FooterListItem">
                        <Link to="/privacypolicy" className={`FooterLink ${CurrentFooterFont}`}  >{t('PrivacyPolicy')}</Link>
                      </li>
                      <li className="list-item FooterListItem">
                        <Link className={`FooterLink ${CurrentFooterFont}`}  onClick={() => {
                            window.open('https://wa.me/+971506655677', '_blank');
                        }}>{t('ContactUs')}</Link>
                      </li>
                      
                      
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div className="Center CopyRightsContainer">
          <h6 className="Center copyRights FooterFontEn">© 2024 MIND for Information Technology & Media. All Rights Reserved.</h6>
        </div>
      </section>
    );
}
export default Footer;