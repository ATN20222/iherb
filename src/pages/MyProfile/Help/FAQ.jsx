import { faCaretDown, faCaretLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './Help.css'
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Notification from "../../../components/Notification/Notification";
import { ProfileService } from "../../../services/Services";

const FAQ = ({ onSelectComponent }) => {
    const { t, i18n } = useTranslation();
    const [FaqData, setFaqData] = useState([]);
    const [dropdownStates, setDropdownStates] = useState({});

    const toggleDropdown = (dropdownName) => {
        setDropdownStates(prevState => ({
            ...prevState,
            [dropdownName]: !prevState[dropdownName]
        }));
    };

    useEffect(() => {
        fetchFAQData();
    }, []);

    const fetchFAQData = async () => {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ProfileService.FAQ(auth_key, user_id); 
            if (response.status) {
                setFaqData(response.data); 
                const initialDropdownStates = {};
                response.data.forEach((faqItem, index) => {
                    initialDropdownStates[`Q${index}`] = false;
                });
                setDropdownStates(initialDropdownStates);
            } else {
                alert("Failed to fetch FAQ data");
            }
        } catch (error) {
            alert("Failed to fetch FAQ data");
        }
    };

    return (
        <ul className="list-unstyled">
            <div className="CurrentLocationInProfile">
                <h5> 
                    {t("Help")} 
                    <FontAwesomeIcon icon={faChevronLeft} />
                    {t("TheQuestions")}
                </h5>
            </div>
            
            {FaqData.map((faqItem, index) => (
                <li className="list-item ItemInPersonalSettings  row EmailRow" key={index}>
                    <div className={`MainItem col-lg-12 ${dropdownStates[`Q${index}`] ? 'Opend' : ''}`} onClick={() => toggleDropdown(`Q${index}`)}>
                        <FontAwesomeIcon icon={dropdownStates[`Q${index}`] ? faCaretDown : faCaretLeft} />
                        <Link className="text-decoration-none link-dark">
                            <span>{faqItem.question}</span>
                        </Link>
                    </div>
                    <div className={`DropDown col-lg-12 ${dropdownStates[`Q${index}`] ? 'Opend' : ''}`}>
                        <div className="Answer">
                            <span>{faqItem.answer}</span>
                        </div>
                    </div>
                </li>
            ))}
            
            
        </ul>
    );
}

export default FAQ;
