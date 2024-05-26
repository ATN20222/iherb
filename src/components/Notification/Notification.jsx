import React from "react";
import './Notification.css'
import i18next from "i18next";
const Notification=({title , body , Date})=>{
    return(
        <div className="col-lg-12 Notify " dir={`${i18next.language === 'en' ? 'rtl' : ''}`}>
            <h5>
                {title}
                <span className="NotifyDateTime">{Date}</span>
            </h5>
            <span>{body}</span>
        </div>
    );
}
export default Notification;