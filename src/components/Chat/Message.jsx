import React from "react";
import './Message.css'
import personImage from '../../Assets/Images/RagelKobara.png'
const SentMessage = () => {
    return(
        
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 Msg">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 DateTime">
                    <span>11:30am 12/02/2024</span>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-3 col-2 PersonImgCol">
                    <div className="PersonImgContainer">
                        <img src={personImage} width="100%" alt="" />
                    </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-8 col-8 MsgText">
                    <span>
                      اهلا يا صاحبي
                    </span>
                </div>
        </div>
    );
}

const ReceivedMessage = () => {
    return (
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12 Msg Received">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 DateTime">
          <span>11:30am 12/02/2020</span>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-3 col-2 PersonImgCol">
          <div className="PersonImgContainer">
            <img src={personImage} width="100%" alt="" />
          </div>
        </div>
        <div className="col-lg-9 col-md-8 col-sm-8 col-8 MsgText MsgTextReceived">
          <span>
            اهلا بيك ياعمنا
          </span>
        </div>
        
      </div>
    );
  }

  const Message = ({ sent }) => {
    return sent ? <SentMessage /> : <ReceivedMessage />;
  }

export default Message;