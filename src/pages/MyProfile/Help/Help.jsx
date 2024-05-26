import { faCaretDown, faCaretLeft, faLocation, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './Help.css'
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { ProfileService } from "../../../services/Services";

const Help = ({ onSelectComponent }) => {
    const { t, i18n } = useTranslation();

    const [IsEmailOpen, setIsEmailOpen] = useState(false);
    const [IsAddressOpen, setIsAddressOpen] = useState(false);
    const [IsPhoneOpen, setIsPhoneOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const OpenEmail = () => {
        setIsEmailOpen(!IsEmailOpen);
    };

    const OpenAddress = () => {
        setIsAddressOpen(!IsAddressOpen);
    };


    const OpenPhone = () => {
        setIsPhoneOpen(!IsPhoneOpen);
    };
    useEffect(()=>{
        GetInfo();
    },[]);

    async function GetInfo(){
        try{
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            const response = await ProfileService.StoreInfo(auth_key , user_id);
            if (response.status) {
                setEmail(response.data.email);
                setAddress(response.data.address);
                setPhone(response.data.phone);
            } else {
                alert("Error getting data");
            }
            
        }catch(e){
            alert("error getting data");
        }
    }
    return (
        <ul className="list-unstyled">
            <div className="CurrentLocationInProfile">
                <h5> {t("Help")} </h5>
            </div>
            <li className="list-item ItemInPersonalSettings">
                <FontAwesomeIcon icon={faCaretLeft} />
                <Link className="text-decoration-none link-dark"  onClick={() => onSelectComponent('FAQ')}>
                    <span> {t("TheQuestions")} </span>
                </Link>
            </li>

            <li className="list-item ItemInPersonalSettings">
                <FontAwesomeIcon icon={faCaretLeft} />
                <Link to="/" className="text-decoration-none link-dark">
                    <span>{t("Website")}</span>
                </Link>
            </li>

            <li className="list-item ItemInPersonalSettings  row EmailRow">
                <div className={`MainItem col-lg-12 ${IsEmailOpen ? 'Opend' : ''}`} onClick={OpenEmail}>
                    <FontAwesomeIcon icon={IsEmailOpen ? faCaretDown : faCaretLeft} />
                    <Link className="text-decoration-none link-dark" >
                        <span>{t("Email")}</span>
                    </Link>
                </div>

                <div className={`DropDown col-lg-12 ${IsEmailOpen ? 'Opend' : ''}`}>
                    <Link className="text-decoration-none ">{email}</Link>
                </div>
            </li>

            <li className="list-item ItemInPersonalSettings  row EmailRow">
                <div className={`MainItem col-lg-12 ${IsAddressOpen ? 'Opend' : ''}`} onClick={OpenAddress}>
                    <FontAwesomeIcon icon={IsAddressOpen ? faCaretDown : faCaretLeft} />
                    <Link className="text-decoration-none link-dark" >
                        <span>{t("Address")}</span>
                    </Link>
                </div>

                <div className={`DropDown col-lg-12 ${IsAddressOpen ? 'Opend' : ''}`}>
                    <Link className="text-decoration-none ">
                         {address}                         
                    </Link>
                </div>
            </li>
            

            <li className="list-item ItemInPersonalSettings  row EmailRow">
                <div className={`MainItem col-lg-12 ${IsPhoneOpen ? 'Opend' : ''}`} onClick={OpenPhone}>
                    <FontAwesomeIcon icon={IsPhoneOpen ? faCaretDown : faCaretLeft} />
                    <Link className="text-decoration-none link-dark" >
                        <span>{t("Phone")}</span>
                    </Link>
                </div>

                <div className={`DropDown col-lg-12 ${IsPhoneOpen ? 'Opend' : ''}`}>
                    <Link className="text-decoration-none ">
                         {phone}                         
                    </Link>
                </div>
            </li>

            

            <li className="list-item ItemInPersonalSettings">
                <FontAwesomeIcon icon={faCaretLeft} />
                <Link className="text-decoration-none link-dark" onClick={() => {
                    window.open('https://wa.me/+971506655677', '_blank');
                }}>
                    <span>{t("ChatWithUs")}</span>
                </Link>
            </li>
        </ul>
    );
}

export default Help;
