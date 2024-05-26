import React, { useEffect, useState } from "react";
import './MyProfile.css'
import { Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import PersonalSettings from "./PersonalSettings/PersonalSettings";
import EditEmail from "./PersonalSettings/EditEmail";
import MyProfileSideBar from "./MyProfileSideBar";
import Help from "./Help/Help";
import ChangePassword from "./PersonalSettings/ChangePassword";
import Wallet from "./Wallet/Wallet";
import Notifications from "./Notification/Notifications";
import FAQ from "./Help/FAQ";
import EditProfile from "./PersonalSettings/EditProfile";
import Chat from "./Help/Chat/Chat";
import Refund from "./Refund/Refund";
import Orders from "./Orders/Orders";
import DeliveryLocations from "./PersonalSettings/DeliveryLocations/DeliveryLocations";
import Lists from "./Lists/Lists";
import RatingProduct from "./RatingProduct/RatingProduct";

const MyProfile =({Component})=>{
    useEffect(()=>{
        if(localStorage.getItem("token")=="663c80d0af3d373895922158844jb768"||localStorage.getItem("user_id")==0){
          window.location.href="/login";
          alert("You Must Login First");
          
        }
      } , []);
    const { t, i18n } = useTranslation();
    const [selectedComponent, setSelectedComponent] = useState('PersonalSettings');
    const [isProfileMenuOpen, setMenuOpen] = useState(false);
    // setSelectedComponent(currentItem);
    const handleMenuClick = () => {
      setMenuOpen(!isProfileMenuOpen);
    };
    

    useEffect(() => {
      
      setSelectedComponent(Component);
      
    }, []);
    const renderComponent = () => {
        
        switch (selectedComponent) {
            
            case 'PersonalSettings':
                return <PersonalSettings onSelectComponent={handleSelectComponent} />;
            case 'EditEmail':
                return <EditEmail />;
            case 'ChangePassword':
                return <ChangePassword />;
            case 'EditProfile':
                return <EditProfile />;
            case 'Help':
                return <Help onSelectComponent={handleSelectComponent} />;
            case 'Wallet':
                return <Wallet/>
            case 'Chat':
                return <Chat/>
            case 'Notifications':
                return <Notifications/>
            case 'FAQ':
                return <FAQ/>
            case 'Refund':
                return <Refund/>
            case 'MyOrders':
                return <Orders/>
            case 'Delivery':
                return <DeliveryLocations/>
            case 'Lists':
                return <Lists/>
            case 'RatingProduct':
                return <RatingProduct/>
            default:
                return <PersonalSettings onSelectComponent={handleSelectComponent} />;
        }
    }
    const handleSelectComponent = (component) => {
        setSelectedComponent(component);
    };

    return(
        <section className="MyProfileSection">
            <div className="container">
                <div className="row MyProfileRow">
                    <div className="col-lg-7 col-9 LefSideProfile" >
                        
                    {/* {selectedComponent === 'EditEmail' && <EditEmail />}
                        {selectedComponent==='ChangePassword' &&<ChangePassword/>}
                        {selectedComponent === 'PersonalSettings' && <PersonalSettings />}
                        {selectedComponent === 'Help' && <Help />} */}
                         {renderComponent()}
                    </div>
                    <MyProfileSideBar onSelectComponent={handleSelectComponent} />
                </div>
            </div>
        </section>
    );

}
export default MyProfile;