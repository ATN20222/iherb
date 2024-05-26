import React, { useEffect, useState } from "react";
import CategoriesBar from "../../components/Categories/CategoriesBar";
import './WellnessQuiz.css';
import HerbImg from '../../Assets/Images/HERBSIMAGE.png';
import LeftQuizImage from '../../Assets/Images/LeftQuizImage.png';
import RightQuizImage from '../../Assets/Images/RightQuizImage.png';
import QuestionImage from '../../Assets/Images/QuestionImage.png'
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { QuizService } from "../../services/Services";
import { useLocation, useNavigate } from "react-router-dom";
const QuizPage = ()=>{
    const [Finish , setFinish] = useState(false);
    const [YesQuestions , setYesQuestions] = useState([]);
    const [CurrentQuestion , setCurrentQuestion] = useState(0);
    const [CurrentQuizQuestion , setCurrentQuizQuestion] = useState(0);
    const [FirstQuestionsRes , setFirstQuestionsResult] = useState([]);
    const [QuizQuestions , setQuizQuestions] = useState([]);
    const[InsideQuiz , setInsideQuiz] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (Finish) {
          const encodedYesQuestions = YesQuestions.map(question => encodeURIComponent(question));
          const queryString = encodedYesQuestions.join('&');
          navigate(`/quizresult?yesQuestions=${queryString}`);
        }
      }, [Finish, YesQuestions, navigate]);
      

    const [questions , setQuestions] = useState(
        [
            {
                questionText: `${t("WhatIsYourGender")}`,
                answers: [ `${t("Male")}`,  `${t("Female")}`]
            },
            {
              questionText: `${t("WhatIsYourAge")}`,
              answers: ["18-44", "45-64", "65+"]
            },
            
            
          ]
    );
    
    
    const HandleAnswer = (questionId , answerIndex)=>{
        const QuestAndAns = {
            QuestionId: questionId,
            QuestAns: answerIndex+1,
        };
        const updatedResult = [...FirstQuestionsRes, QuestAndAns];
        setFirstQuestionsResult(updatedResult);
        console.log(CurrentQuestion);
        if (CurrentQuestion  >= 1) {
            const gender = updatedResult[0]?.QuestAns;
            const age = updatedResult[1]?.QuestAns;
            GetQuests(gender, age);
        } else {
            setCurrentQuestion(CurrentQuestion + 1);
        }
    };

    
    async function GetQuests(gender , age){
        console.log("gender" , gender);
        console.log("age" , age);
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
      
            const response = await QuizService.GetQuestions(auth_key , user_id , gender ,age);
            console.log(response.data);
            if(response.status){
                if(response.data.length==0){
                    alert("There is no questions for you! .");
                    window.location.href="/wellnessquiz";
                    
                }else{
                    setInsideQuiz(!InsideQuiz);
                    setQuizQuestions(response.data);
                }
                
            }
            

          } catch (error) {
            console.error('Error fetching Questions:', error);
      
          }
    }
    const HandleQuizYesAnswer = (id)=>{
        var AllYes = [...YesQuestions, id];
        setYesQuestions(AllYes);
        console.log(AllYes);

        if(CurrentQuizQuestion < QuizQuestions.length - 1 ){

            setCurrentQuizQuestion(CurrentQuizQuestion+1);
        }else{
            setFinish(!Finish);
        }
        

    }
    const HandleQuizNoAnswer = ()=>{
        if(CurrentQuizQuestion < QuizQuestions.length - 1 ){

            setCurrentQuizQuestion(CurrentQuizQuestion+1);
        }else{
            setFinish(!Finish);

        }
    }

    const HandelFirstQuistionsBack = () =>{
        const cq = CurrentQuestion;
        console.log("cq" , cq)
        if( cq == 0 ){
            window.location.href='/wellnessquiz';
        }else{

            setCurrentQuestion(CurrentQuestion - 1);
        }
        
        
    }
    const HandelQuizBack = ()=>{
        if(CurrentQuizQuestion==0){
            setInsideQuiz(!InsideQuiz);
        }else{
            var AllYes = YesQuestions;
            AllYes.pop( QuizQuestions[CurrentQuizQuestion - 1].id);

            setCurrentQuizQuestion(CurrentQuizQuestion - 1);
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
                    
                    <div className="col-lg-3 col-md-6 col-sm-6 col-10 card QuizCard Center">
                        <div className="col-lg-12 ProgressCol">
                                    
                                  
                                
                            </div>
                            
                            {!InsideQuiz&&!Finish&&
                                <div className="container QRow row Center">
                                    <button className="BackQuestBtn" onClick={() => HandelFirstQuistionsBack()} >
                                        <FontAwesomeIcon icon={faCircleArrowLeft}/>
                                    </button>
                                <div className="col-lg-5 QuizItem">
                                    <img src={QuestionImage} width="100%" alt="" />
                                </div>
                                <h5 className="QuizItem QuizText">
                                    {questions[CurrentQuestion].questionText}
                                </h5>

                                <div className="QuizBtns">
                                
                                    {questions[CurrentQuestion].answers.map((answer, index) => (
                                        <button key={index} className="btn btn-warning LoginBtn QuizAnswerBtn" 
                                            onClick={() => HandleAnswer(CurrentQuestion ,index)}
                                        >{answer}</button>
                                    
                                    ))}
                                    

                                </div>

                                </div>
                            }
                            {InsideQuiz&&!Finish&&

                                <div className="container QRow row Center">
                                    <div className="CurrentQuest">
                                        {CurrentQuizQuestion + 1 } / {QuizQuestions.length}
                                    </div>
                                    <button className="BackQuestBtn" onClick={() => HandelQuizBack()} >
                                        <FontAwesomeIcon icon={faCircleArrowLeft}/>
                                    </button>
                                <div className="col-lg-5 QuizItem">
                                    <svg src={QuizQuestions[CurrentQuizQuestion].image} />
                                    <img  src={QuizQuestions[CurrentQuizQuestion].image} width="100%" alt="" />
                                    
                                </div>
                                <h5 className="QuizItem QuizText">
                                    {QuizQuestions[CurrentQuizQuestion].question}
                                </h5>

                                <div className="QuizBtns">
                                        <button className="btn btn-warning LoginBtn QuizAnswerBtn" 
                                            onClick={() => HandleQuizYesAnswer(QuizQuestions[CurrentQuizQuestion].id)}
                                        >{t("Yes")}</button>
                                        <button className="btn btn-warning LoginBtn QuizAnswerBtn" 
                                            onClick={() => HandleQuizNoAnswer()}
                                        >{t("No")}</button>

                                </div>

                                </div>
                            }
                            {Finish&&
                                <div className="Center">
                                    <h1>
                                        <FontAwesomeIcon icon={faCheckCircle}/>Done
                                    </h1>
                                </div>
                            }   
                            
                    </div>
                    

                        
                    
                </div>
            </div>
            
                          
          

        </section>
    );   


}
export default QuizPage;