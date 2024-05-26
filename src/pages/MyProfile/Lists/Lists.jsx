import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import './Lists.css'
import List from "../../../components/List/List";
import AddNewList from "./AddNewList";
import { ListService } from "../../../services/Services";

const Lists = () => {
    const { t, i18n } = useTranslation();
    const [ShowAddNewList,setShowAddNewList] = useState(false);
    const[Lists , SetLists ] = useState([]);
    const handleAddList = (e) => {
        setShowAddNewList(e);
    };
    
    useEffect(()=>{
        getLists();
    },[])
    async function getLists(){
        try{

            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ListService.GetLists(auth_key , user_id);
            console.log(response);
            if(response.status){
                SetLists(response.data);
            }else{
                alert("error");
            }


        }catch(e){
            alert("error");
        }
    }
    return (
        <ul className="list-unstyled">
            {ShowAddNewList && <AddNewList onClick={handleAddList} />}
            <div className="CurrentLocationInProfile LocationInLists">
                <h5> 
                    {t("Lists")} 
                    
                </h5>
                
            </div>
            <li className="list-item AddNewList">
                <div className="AddListHeader">
                    <Link className="link-item"  onClick={() => handleAddList(true)}>
                        
                        {t("AddNewList")}</Link>
                    <FontAwesomeIcon className="ListIcon AddIcon" icon={faPlusCircle} />
                
                
                </div>
               
            </li>


            {
                Lists.map((list , index)=>(

                    <List key={index} data={list} IsFavList={index==0}/>
                ))
            
            }

        </ul>
    );
}

export default Lists;
