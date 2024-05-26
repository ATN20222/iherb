import React from "react";
import CategoriesBar from "../../components/Categories/CategoriesBar";
import './WellnessQuiz.css';
import HerbImg from '../../Assets/Images/HERBSIMAGE.png'
import { Link } from "react-router-dom";
import { t } from "i18next";
const WellnessQuiz = ()=>{
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
                    
                    
                    <div className="col-lg-6 col-md-6 col-sm-6 col-8 ">
                        <div className="row Center">
                            
                            <div className="col-lg-5 QuizItem">
                                <img src={HerbImg} width="100%" alt="" />
                            </div>
                            <h3 className="QuizItem">{t("Recommendations")}</h3>
                            <span className="">{t("AnswerTheFollowing")}</span>
                            <Link to="/quiz" className="QuizItem StartQuizBtn btn btn-warning col-lg-4 col-md-6 col-sm-6 col-10 LoginBtn" >{t("StartQuiz")}</Link>
                        </div>
                    </div>

                        
                    
                </div>
            </div>
            
                          
          

        </section>
    );   


}
export default WellnessQuiz;