import React, { useState } from 'react';
import Tile from "../tile/tile"
import "./chessboard.css"

const verticalaxis = [1,2,3,4,5,6,7,8];
const horizontalaxis =["a","b","c","d","e","f","g","h"];

const initialBoard = [
    ["rw","nw","bw","qw","kw","bw","nw","rw"],
    ["pw","pw","pw","pw","pw","pw","pw","pw"],
    [".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".","."],
    ["pb","pb","pb","pb","pb","pb","pb","pb"],
    ["rb","nb","bb","qb","kb","bb","nb","rb"]
];
var turn = true;
var activepiece = null;
// var check =false;
export default function Chessboard() {
    const [boardCurr, setBoardCurr] = useState(initialBoard);
    function ret_square(piece){
        var y = parseInt(piece[3]);
        var x = parseInt(piece[2]);
        return [x,y,piece.substring(0,2)];
    }

    async function update_board(inital , final){
        turn=!turn;
        setBoardCurr(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[final[0]][final[1]] = inital[2];
            newBoard[inital[0]][inital[1]] = ".";
            return newBoard;
    });
    }

    function grabPiece(e) {
        const clickedElement = e.target;
        console.log(clickedElement);
        if (activepiece===null && clickedElement.tagName === 'IMG') {
            activepiece = clickedElement;
        } 
        else if(activepiece!==null){
            var inital =ret_square(activepiece.classList.value);
            var final  =ret_square(clickedElement.classList.value);
            var pp =possible_move(inital,final);
            if(pp[0] && ((turn && inital[2][1]==="w")||(!turn && inital[2][1]==="b"))){
                update_board(inital, final).then(() => {
                    console.log(boardCurr[4][1]);
                    if (turn) {
                      console.log(check_or_not('w') + 'check');
                    } else {
                      console.log(check_or_not('b') + 'black check');
                    }
                    activepiece = null;
                  });
                  return;
            }
            activepiece=clickedElement;
        }
    }

    function check_or_not(color){
        var x=null;
        var y=null;
        console.log("k"+color);
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(boardCurr[i][j]===("k"+color)){
                    x=i;
                    y=j;
                    break;
                }
            }if(x||y){console.log(x.toString()+y+"ee" );break;}
        }

        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if((possible_move([i,j,boardCurr[i][j]] ,[x,y,"ee"] ))[0] && boardCurr[i][j][1]!==(color)){
                    // // check =true;
                    // console.log("final ->",[x,y,"ee"]);
                    // console.log([i,j,boardCurr[i][j]]);
                    // console.log("check ->",i,j);
                    return true;
                }
            }
        }
        return false;
    }


    function possible_move(inital,final){
        var poss=false;
        var p_moves=[];
        var x = inital[0];
        var y = inital[1];
        if(inital[2]==="pw"){
            p_moves=pw_moves(x,y);
        }
        else if(inital[2]==="pb"){
            p_moves=pb_moves(x,y);
        }
        else if(inital[2][0]==="n"){
            p_moves=n_moves(x,y,inital);
        }
        else if(inital[2][0]==="r"){
            p_moves=r_moves(x,y,inital);
        }

        else if(inital[2][0]==="b"){
            p_moves=b_moves(x,y,inital);
        }
        else if(inital[2][0]==="q"){
            var r=r_moves(x,y,inital);
            var b=b_moves(x,y,inital);
            p_moves=r.concat(b);
        }
        if(p_moves.includes(final[0].toString()+final[1])){
            poss=true;
        }
        return [poss,p_moves];
    }

    function pw_moves(x,y){
        var p_moves=[];
        if(boardCurr[x+1][y]==="."){
            p_moves.push((x+1).toString()+y);
        }
        if(boardCurr[x+2][y]==="." && x===1){
            p_moves.push((x+2).toString()+y);
        }
        if(boardCurr[x+1][y+1]!=="."){
            p_moves.push((x+1).toString()+(y+1));
        }
        if(boardCurr[x+1][y-1]!=="."){
            p_moves.push((x+1).toString()+(y-1));
        }
        return p_moves;
    }

    function pb_moves(x,y){
        var p_moves=[];
        if(boardCurr[x-1][y]==="."){
            p_moves.push((x-1).toString()+y);
        }
        if(boardCurr[x-2][y]==="." && x===6){
            p_moves.push((x-2).toString()+y);
        }
        if(boardCurr[x-1][y+1]!=="."){
            p_moves.push((x-1).toString()+(y+1));
        }
        if(boardCurr[x-1][y-1]!=="."){
            p_moves.push((x-1).toString()+(y-1));
        }
        return p_moves;
    }

    function n_moves(x,y,inital){
        var p_moves=[];
        for(var i=-2;i<3;i++){
            for(var j=-2;j<3;j++){
                if(i===j || i+j===0 || i===0 || j===0 || x+i>7 || x+i<0 || y+j>7 || y+j<0){continue;}
                else if(boardCurr[x+i][y+j][1]!==inital[2][1] || boardCurr[x+i][y+j][1]==="."){p_moves.push((x+i).toString()+(y+j));}
            }
        }
        return p_moves;
    }
    function r_moves(x,y,inital){    
        var p_moves=[];
        for(let i=x+1;i<8;i++){
            if(boardCurr[i][y]==="."){p_moves.push((i).toString()+(y));}
            else{
                if(boardCurr[i][y][1]!==inital[2][1]){p_moves.push((i).toString()+(y));}
                break;
            }
        }
        for(let i=x-1;i>=0;i--){
            if(boardCurr[i][y]==="."){p_moves.push((i).toString()+(y));}
            else{
                if(boardCurr[i][y][1]!==inital[2][1]){p_moves.push((i).toString()+(y));}
                break;
            }
        }
        for(let i=y+1;i<8;i++){
            if(boardCurr[x][i]==="."){p_moves.push((x).toString()+(i));}
            else{
                if(boardCurr[x][i][1]!==inital[2][1]){p_moves.push((x).toString()+(i));}
                break;
            }
        }
        for(let i=y-1;i>=0;i--){
            if(boardCurr[x][i]==="."){p_moves.push((x).toString()+(i));}
            else{
                if(boardCurr[x][i][1]!==inital[2][1]){p_moves.push((x).toString()+(i));}
                break;
            }
        }
        return p_moves;
    }

    function b_moves(x,y,inital){
        var p_moves=[];
        for(let i=1;x+i<8 && y+i<8;i++){
            if(boardCurr[x+i][y+i]==="."){p_moves.push((x+i).toString()+(y+i));}
            else{
                if(boardCurr[x+i][y+i][1]!==inital[2][1]){p_moves.push((x+i).toString()+(y+i));}
                break;
            }
        }
        for(let i=1;x-i>=0 && y+i<8;i++){
            if(boardCurr[x-i][y+i]==="."){p_moves.push((x-i).toString()+(y+i));}
            else{
                if(boardCurr[x-i][y+i][1]!==inital[2][1]){p_moves.push((x-i).toString()+(y+i));}
                break;
            }
        }
        for(let i=1;x-i>=0 && y-i>=0;i++){
            if(boardCurr[x-i][y-i]==="."){p_moves.push((x-i).toString()+(y-i));}
            else{
                if(boardCurr[x-i][y-i][1]!==inital[2][1]){p_moves.push((x-i).toString()+(y-i));}
                break;
            }
        }
        for(let i=1;x+i<8 && y-i>=0;i++){
            if(boardCurr[x+i][y-i]==="."){p_moves.push((x+i).toString()+(y-i));}
            else{
                if(boardCurr[x+i][y-i][1]!==inital[2][1]){p_moves.push((x+i).toString()+(y-i));}
                break;
            }
        }
        return p_moves;
    }
    
    let board = [];
    for (let i = verticalaxis.length - 1; i >= 0; i--) {
        for (let j = 0; j < horizontalaxis.length; j++) {
            const num = j + i + 2;
            board.push(<Tile key={`${i}-${j}`} num={num} pieces={boardCurr[i][j]} x={i} y={j} />);
        }
    }

    return (
        <div  onMouseDown={e => grabPiece(e)} id='chessboard'>
            {board}
        </div>
    );
}
