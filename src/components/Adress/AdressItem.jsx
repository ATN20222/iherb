import { t } from "i18next";
import React from "react";

const AddressItem = ({Item, name, address,IsMain, phone, checked, onChange, onEdit, onDelete }) => {
    return (
        <div className="AddressItem">
            <div className="row">
                <div className="col-lg-12 AddCol">
                   {IsMain&&<span className="MainAdd">العنوان الرئيسي</span>} 
                    <label className="form-check-label" htmlFor={Item}>
                        {name}
                    </label>
                    <input
                        type="radio"
                        name="deliveryLocation"
                        id={Item}
                        value={name}
                        checked={checked}
                        onChange={onChange}
                    />
                </div>
                <div className="col-lg-4 col-md-4 AdddressBtnsCol">
                    <div className="row">
                        <button className="btn col-lg-12" onClick={onDelete}>{t("Delete")}</button>
                        <button className="btn col-lg-12" onClick={onEdit}>{t("Edit")}</button>
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 AddCol AddressCol">
                    <ul className="list-unstyled">
                        <li className="list-item AddressLi">
                            <span>{address}</span>
                        </li>
                       
                        <li className="list-item AddressLi">
                            <span>{phone}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddressItem;
