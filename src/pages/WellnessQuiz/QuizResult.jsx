import React, { useEffect, useState } from "react";
import CategoriesBar from "../../components/Categories/CategoriesBar";
import './WellnessQuiz.css';
import HerbImg from '../../Assets/Images/HERBSIMAGE.png';
import LeftQuizImage from '../../Assets/Images/LeftQuizImage.png';
import RightQuizImage from '../../Assets/Images/RightQuizImage.png';
import QuestionImage from '../../Assets/Images/QuestionImage.png'
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../../components/Product/ProductCard";
import { useLocation } from "react-router-dom";
import { QuizService } from "../../services/Services";
const QuizResult = ()=>{
    const [products , setProducts] = useState([]);
    const [description , setdscription ] = useState('');
    const location = useLocation();
    
    useEffect(() => {
        console.log(location.search);
        var ids = location.search.split("=")[1].split("&").join(",");
        console.log("ids" , ids);
        console.log(description);
        GetProducts(ids);
    }, []);

    async function GetProducts(quests){
        
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
      
            const response = await QuizService.GetQuizResult(auth_key , user_id ,quests);
            console.log(response.data);
            if(response.status){
                setdscription(response.data.description);
                console.log("response.description" , response.data.description);
                console.log("dscription" ,description);
                setProducts(response.data.products);
            }
            

          } catch (error) {
            console.error('Error fetching products:', error);
      
          }
    }
    
    return(
        <section className="AllProductsSection">
            
            {/* <div className="Container">
                <div className="HeaderRow row">
                    <div className="col-lg-7">
                        <div className="">
                        <CategoriesBar/>
                        </div>
                    </div>
                    <div className="col-lg-3">
                    

                    </div>
                </div>



                
            </div> */}

            <div className=" QuizContainer">
                   
                <div className="row QuizRow Center">

                       

                    <img src={LeftQuizImage} className="LeftQuizImage"  width="100px" alt="" />
                    <img src={RightQuizImage} className="RightQuizImage" width="100px"  alt="" />
                    
                    <div className="col-lg-3 col-md-6 col-sm-6 col-10 Center QuizResCol">
                        <div className="row Center ResultText">
                            
                            <div className="col-lg-5 QuizItem">
                                <img src={HerbImg} width="100%" alt="" />
                            </div>
                            <h3 className="QuizItem">{t("HereTheRecommendations")}</h3>
                            <span className="">
                                { description }
                            </span>
                            
                        </div>
                    </div>
                    
                        <hr className="col-lg-10" />
                        <div className="col-lg-10 QuizProductsTitle">
                            <h3>{t("RecommendedProducts")}</h3>
                           
                            
                        </div>
                        <div className="col-lg-10 QuizProducts">
                            
                                
                            
                            <div className="row ProductListRow">
                            {
                                products.map((product) => (
                                    <ProductCard key={product.id} product={product} IsInHome={true} />
                                ))
                            }
                            </div>
                        </div>
               
           
                        
                        

                        
                    
                </div>
            </div>
            
                          
          

        </section>
    );   


}
export default QuizResult;