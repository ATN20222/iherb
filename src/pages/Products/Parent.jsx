import React from "react";
import Child from "./Child";
const Parent = ()=>{
    const A =(a)=>{
        alert(a);
    }
    return(
        
        <Child apply={A}></Child>
    );
}
export default Parent;