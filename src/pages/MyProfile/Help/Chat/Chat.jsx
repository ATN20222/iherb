import React from "react";
import { useTranslation } from "react-i18next";
import './Chat.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import {  faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Notifications from "../../Notification/Notifications";
import Message from "../../../../components/Chat/Message";
const Chat = ()=>{
    const { t, i18n } = useTranslation();

    return(
        <ul className="list-unstyled">
            <div className="CurrentLocationInProfile">
                            <h5>
                            {t("Help")} 
                            <FontAwesomeIcon icon={faChevronLeft} />
                            {t("ChatWithUs")}
                                
                                
                            </h5>
                                
                            
                        </div>
            
            <li className="list-item RedeemeLi">
                    <div className="row EditMailRow ">
                        <div className="col-lg-7 col-md-7 ChatArea">
                           <Message sent={true}/>
                           <Message sent={false}/>
                           <Message sent={true}/>
                           <Message sent={false}/>
                           <Message sent={true}/>
                           <Message sent={false}/>
                           <Message sent={true}/>
                           <Message sent={false}/>
                           <Message sent={true}/>
                           <Message sent={false}/>
                           <Message sent={true}/>
                           <Message sent={false}/>
                           
                        </div>
                        <div className="col-lg-7 col-md-7 BottomChatBar">
                            <input
                                className="col-lg-12 form-control EmailInput MessageInput"
                                dir="rtl"
                                placeholder={t("WriteMsg")}
                                type="text"
                            />
                            <button className="Send">
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                            <div className="Attach">
                                <input type="file" name="" id="Attachments" />
                                <label htmlFor="Attachments">
                                    <FontAwesomeIcon icon={faPaperclip} />
                                </label>
                            </div>
                        
                        </div>



                        
                    </div>
            </li>

        </ul>
    );
}
export default Chat;