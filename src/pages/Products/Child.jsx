import React from "react";
const Child = (props)=>{
    
    return(
        <div className="class">
            <h1>Hello Child</h1>
            <button onClick={()=>props.apply("Inside")}>Click!</button>
        </div>
        
        
    );
}
export default Child;