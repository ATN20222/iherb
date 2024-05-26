import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ListService } from "../../services/Services";
import './List.css';
import ProductCard from '../Product/ProductCard';

const List = ({ data, IsFavList }) => {
    const [products, setProducts] = useState(data.products);
    const [NoItem , SetNoItem] = useState(data.total_products);
    const RemoveList = async () => {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ListService.RemoveList(auth_key, user_id, data.id);
            if (response.status) {
                alert("List has been removed");
                window.location.reload();
            } else {
                alert("Error");
            }
        } catch (e) {
            alert("Error");
        }
    };

    const RemoveItem = async (id) => {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ListService.RemoveProductInList(auth_key, user_id, data.id, id);
            if (response.status) {
                const updatedList = products.filter(product => product.id !== id);
                SetNoItem(updatedList.length)
                setProducts(updatedList);
            } else {
                alert("Error");
            }
        } catch (e) {
            alert("Error");
        }
    };

    return (
        <li className="list-item ListItem">
            <div className="ListHeader">
                {!IsFavList&&
                
                    <button className="btn RemoveList" onClick={RemoveList}>ازالة <FontAwesomeIcon icon={faTrash} /></button>
                }
                <span className="ListItemCount">(منتجات {NoItem})</span>
                <span className="ListTitle">{data.name}</span>
                {IsFavList && <FontAwesomeIcon className="ListIcon" icon={faHeart} />}
                {!IsFavList && <FontAwesomeIcon className="ListIcon" icon={faCircle} />}
            </div>
            <div className="ProductsInList ProductsRow">
                <div className="col-lg-12 ProductsListCol">
                    <div className="row ProductListRow">
                        {products.map((product, index) => (
                            <div className="ProductInList" key={index}>
                                <ProductCard product={product} IsInHome={true} />
                                <button className="btn" onClick={() => RemoveItem(product.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr className="ListsHr" />
        </li>
    );
};

export default List;
