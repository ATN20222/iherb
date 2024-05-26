import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import WalletImg from "../../../Assets/Images/Wallet.png";
import PointsImg from "../../../Assets/Images/Points.png";
import './Wallet.css';
import { ProfileService } from "../../../services/Services";
const Wallet = ()=>{
    const { t, i18n } = useTranslation();
    const [Balance , SetBalance ] = useState(0);
    const [Points , SetPoints] = useState(0);
    const [AedPoints , SetAedPoints] = useState(0);
    const [PointsToBalance , SetPointsToBalance] = useState(0);
    useEffect(()=>{
        GetData();
    },[]);
    async function GetData(){
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ProfileService.GatWalletBalance(auth_key, user_id); 
            if (response.status) {
                SetBalance(response.data.balance);
                SetPoints(response.data.points);
                SetAedPoints(response.data.aed_points);
                SetPointsToBalance(response.data.points_to_balance);
                
            } else {
                alert("Failed to  get data");
            }
        } catch (error) {
            alert("Failed to get data");
        }
    }

    async function ExchangePoints(){
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ProfileService.WalletExchange(auth_key, user_id); 
            if (response.status) {
                SetBalance(response.data.balance);
                SetPoints(response.data.points);
                SetAedPoints(response.data.aed_points);
                SetPointsToBalance(response.data.points_to_balance);
                alert("Done");
            } else {
                alert("Failed");
            }
        } catch (error) {
            alert("Failed");
        }
    }
    return(
        <ul className="list-unstyled">
            <div className="CurrentLocationInProfile">
                            <h5>
                                <span>
                                    المحفظة
                                </span>
                                
                                
                            
                                
                            </h5>
                                
                            
                        </div>
            <li className="list-item">
                    <div className="row EditMailRow ">
                        <div className="col-lg-7 col-md-7 WalletImgContainer">
                            <img src={WalletImg} alt="" />
                        </div>
                                            


                        <div className="col-lg-7 col-md-7">
                            <div className="btn btn-warning col-12 LoginBtn WalletBalance">
                                <span className="Login">
                                    الرصيد : <span className="Balance">{Balance}</span> {t("UAD")}
                                </span>
                            </div>
                        </div>
                    </div>
            </li>
            <li className="list-item RedeemeLi">
                    <div className="row EditMailRow ">
                        <div className="col-lg-7 col-md-7 WalletImgContainer">
                            <img src={PointsImg} alt="" />
                        </div>
                                            


                        <div className="col-lg-7 col-md-7">
                            <div className="btn btn-warning col-12 LoginBtn WalletBalance">
                                <span className="Login">
                                    النقاط : <span className="Balance">{Points}</span> نقطة   
                                </span>
                            </div>
                        </div>
                        <span className="col-lg-7 col-md-7 EditEmailSpan equivilanceBalance">نقاط {AedPoints}   = 1 درهم  </span>

                        <div className="col-lg-7 col-md-7 Redeeme">
                            <button className="btn col-12 LoginBtn WalletBalance" onClick={ExchangePoints}>
                                <span className="Login">
                                    احصل علي <span className="Balance">{PointsToBalance}</span> درهم
                                </span>
                            </button>
                        </div>
                    </div>
            </li>

        </ul>
    );
}
export default Wallet;