import React from "react";
import "./Tile.css";

export default function TILE({num,pieces,x,y}){
    var image= "asset/pieces/"+pieces+".png";

    if(pieces!=="."){    if(num%2===0){
            return<div id="black" >
                <img id="p" className={pieces+x+y} src={image }  alt=" "/> 
                </div>
        }
        else{
            return <div id="white" className={"white"+x+y}>
                <img  id="p" className={pieces+x+y} src={image}  alt=" "/>
                </div>
        }
    }
    else{
        if(num%2===0){
            return<div id="black" className={"ee"+x.toString()+y}>        </div>
        }
        else{
            return <div id="white" className={"ee"+x.toString()+y}>       </div>
        }
    }
}

