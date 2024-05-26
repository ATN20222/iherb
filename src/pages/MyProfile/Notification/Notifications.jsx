import React, { useEffect, useState } from "react";
import Notification from "../../../components/Notification/Notification";
import { ProfileService } from "../../../services/Services";
import { t } from "i18next";

const Notifications = () => {
    const [Notifications, setNotifications] = useState([]);

    useEffect(() => {
        GetNotification();
    }, []);

    async function GetNotification() {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ProfileService.ListNotifications(auth_key, user_id); 
            if (response.status) {
                setNotifications(response.data);
            } else {
                alert("Failed");
            }
        } catch (error) {
            alert("Failed");
        }
    }

    return (
        <ul className="list-unstyled">
            <div className="CurrentLocationInProfile">
                <h3>{t("Notify")}</h3>
            </div>
            {Notifications.map((note, index) => (
                <li className="list-item" key={index}>
                    <Notification 
                        title={note.title}
                        body={note.body}
                        Date={note.added_on}
                    />
                </li>
            ))}
        </ul>
    );
}

export default Notifications;
