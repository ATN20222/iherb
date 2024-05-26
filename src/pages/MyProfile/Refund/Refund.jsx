import React, { useEffect, useState } from "react";
import { faCamera, faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import './Refund.css';
import { useParams } from "react-router-dom";
import { ProfileService } from "../../../services/Services";

const Refund = () => {
    const [selectedReason, setSelectedReason] = useState({ id: '', text: '' });
    const [IsReasonsOpen, setIsReasonsOpen] = useState(false);
    const [Reasons, SetReasons] = useState([]);
    const [textareaValue, setTextareaValue] = useState('');
    const { ItemId } = useParams();

    useEffect(() => {
        GetReasons();
    }, []);

    async function GetReasons() {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            const response = await ProfileService.ReturnReasons(auth_key, user_id);
            if (response.status) {
                SetReasons(response.data);
            } else {
                alert("Try again later");
                window.location.href = '/';
            }
        } catch (error) {
            alert("Try again later");
        }
    }

    const { t } = useTranslation();

    const OpenReasons = () => {
        setIsReasonsOpen(!IsReasonsOpen);
    };

    const handleReasonSelect = (reason) => {
        setSelectedReason({ id: reason.id, text: reason.reason });
        setIsReasonsOpen(false);
    };

    const handleTextAreaChange = (event) => {
        setTextareaValue(event.target.value);
    };

    const handleSendButtonClick = async () => {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const { id, text } = selectedReason;

            const response = await ProfileService.ReturnItem(auth_key, user_id, ItemId, id, textareaValue);

            if (response.status) {
                alert("Data sent successfully");
                window.location.href = '/';
            } else {
                alert("Failed to send data. Please try again later.");
            }
        } catch (error) {
            alert("Failed to send data. Please try again later.");
        }
    };

    return (
        <ul className="list-unstyled">
            <div className="CurrentLocationInProfile">
                <h5>
                    <span>{t("Refund")}</span>
                </h5>
            </div>

            <li className="list-item">
                <div className="row EditMailRow">
                    <div className="col-lg-8">
                        <h5 className="LabelInEditProfile">{t("RefundReason")}</h5>
                        <div className={`col-lg-12 form-control EmailInput AllReasonsContainer ${IsReasonsOpen ? 'OpenReasons' : ''}`} dir="rtl">
                            <div className="TransportProblem" onClick={OpenReasons}>
                                <span className="TheProblem">{selectedReason.text || t("TransportProblem")}</span>
                                <FontAwesomeIcon icon={IsReasonsOpen ? faCaretDown : faCaretLeft} />
                            </div>
                            <div className="hr col-lg-12 col-md-12 col-sm-12 col-12"></div>
                            <div className="ReasonsContainer">
                                <ul className="list-unstyled">
                                    {Reasons.map(reason => (
                                        <li className="list-item" key={reason.id} onClick={() => handleReasonSelect(reason)}>
                                            {reason.reason}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <h5 className="LabelInEditProfile">{t("RefundDescribtion")}</h5>
                        <textarea
                            className="col-lg-12 form-control EmailInput RefundTextArea"
                            dir="rtl"
                            placeholder={t("RefundDescribtion")}
                            type="text"
                            value={textareaValue}
                            onChange={handleTextAreaChange}
                        />
                    </div>
                    <div className="col-lg-8 LoginWithCol SavePasswordBtn">
                        <button className="btn btn-warning col-12 LoginBtn " onClick={handleSendButtonClick}>
                            <span className="Login">{t("Send")}</span>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default Refund;
