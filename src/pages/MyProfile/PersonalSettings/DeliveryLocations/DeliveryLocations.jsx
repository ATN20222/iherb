import React, { useEffect, useState } from "react";
import { faChevronLeft, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import AddressItem from "../../../../components/Adress/AdressItem";
import AddLocation from "./AddLocation";
import EditLocation from "./EditLocation";
import DeleteLocation from "./DeleteLocation";
import { ProfileService } from "../../../../services/Services";

const DeliveryLocations = ({InCart}) => {
    const { t } = useTranslation();
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedLocationData, setSelectedLocationData] = useState(null);
    const [Locations, setLocations] = useState([]);
    const [showAddLocation, setShowAddLocation] = useState(false);
    const [showEditLocation, setShowEditLocation] = useState(false);
    const [showDeleteLocation, setShowDeleteLocation] = useState(false);
    const [deleteLocationId, setDeleteLocationId] = useState(null)
    useEffect(() => {
        ListLocations();
    }, []);

    async function ListLocations() {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ProfileService.ListLocations(auth_key, user_id);
            if (response.status) {
                setLocations(response.data);
                const primaryLocation = response.data.find(loc => loc.primary === '1');
                if (primaryLocation) {
                    setSelectedLocation(primaryLocation.id);
                }
            } else {
                alert("Error loading locations");
            }
        } catch (error) {
            alert("Error loading locations");
        }
    }

    const handleLocationChange = (locationId) => {
        setSelectedLocation(locationId);
        SetMainLocation(locationId)
        
    };

    async function SetMainLocation(id){
        var selectedLocation = '';
        Locations.forEach((e)=>{
            if(e.id ===id)
                selectedLocation = e;
        });

        console.log(selectedLocation);
        try{
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ProfileService.EditLocation(
                    auth_key ,
                    user_id , 
                    selectedLocation.id,
                    selectedLocation.name,
                    selectedLocation.phone,
                    1,
                    selectedLocation.address

                ); 
                console.log(response);
                window.location.reload();

        }catch(e){
            
        }



    }



    const handleAddLocation = (e) => {
        setShowAddLocation(e);
    };

    const handleDeleteLocation = (locationId) => {
        setDeleteLocationId(locationId); 
        setShowDeleteLocation(true); 
    };

    const handleEditLocation = (locationId) => {
        const locationData = Locations.find(loc => loc.id === locationId);
        setSelectedLocationData(locationData);
        setShowEditLocation(true);
    };
    async function handleConfirmDelete (){
        console.log("deleteLocationId",deleteLocationId);


        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            
            
                
            const response = await ProfileService.DeleteLocation(
                auth_key,
                user_id,
                deleteLocationId
            );
          if(response.status){
            alert("location deleted successfully");
    
            window.location.reload();
          }else{
            alert("Failed to delete location");
          }
          
          
          setShowDeleteLocation(false);

        } catch (error) {
            alert("Failed to delete location");
          
        }
    }
    return (
        <ul className="list-unstyled">
            {showAddLocation && <AddLocation onClick={handleAddLocation}  />}
            {showEditLocation && <EditLocation onClick={() => setShowEditLocation(false)} locationData={selectedLocationData} />}
            {showDeleteLocation && <DeleteLocation onClick={() => setShowDeleteLocation(false)} onConfirmDelete={handleConfirmDelete} />}
            {!InCart&&
            <div className="CurrentLocationInProfile">
                <h5>
                    <span>{t("PersonalSettings")}</span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>{t("Delivery")}</span>
                </h5>
            </div>
            }
            
            {Locations.map((loc, index) => {
                return (
                    <AddressItem
                        key={index}
                        Item={loc.id}
                        name={loc.name}
                        address={loc.address}
                        IsMain={loc.primary === '1'}
                        phone={loc.phone}
                        checked={loc.id === selectedLocation}
                        onChange={() => handleLocationChange(loc.id)}
                        onEdit={() => handleEditLocation(loc.id)}
                        onDelete={() => handleDeleteLocation(loc.id)}
                    />
                );
            })}

            <hr />
            <li className="list-item AddressLi AddNewAddLi" onClick={() => handleAddLocation(true)}>
                <FontAwesomeIcon icon={faPlusCircle} />
                <span>اضافة عنوان جديد</span>
            </li>
        </ul>
    );
}

export default DeliveryLocations;
