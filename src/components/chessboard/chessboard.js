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
            if((turn && check_mate("w",newBoard)) || (!turn && check_mate("b",newBoard))){console.log(inital[2][1] + "wins")}
            return newBoard;
    });
    }

    function grabPiece(e) {
        const clickedElement = e.target;
        if (activepiece===null && clickedElement.tagName === 'IMG') {
            activepiece = clickedElement;
        } 
        else if(activepiece!==null){
            var inital =ret_square(activepiece.classList.value);
            var final  =ret_square(clickedElement.classList.value);
            var pp =valid_moves(inital,final,boardCurr);
            if(pp[0] && ((turn && inital[2][1]==="w")||(!turn && inital[2][1]==="b"))){
                update_board(inital, final).then(() => {
                    activepiece = null;
                  });
                  
                  
                  
                  return;
            }
            activepiece=clickedElement;
        }
    }

    function check_mate( color, board){
        board =boardCurr
        console.log(board[3][6])
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(board[i][j][1]===(color) && (valid_moves([i,j,board[i][j]] ,[i,j,board[i][j]] ,board))[1].length!==0){
                    console.log(i , j)
                    return false;
                }
            }
        }
        return true
    }

    function check_or_not(color,board){
        var x=null;
        var y=null;
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(board[i][j]===("k"+color)){
                    x=i;
                    y=j;
                    break;
                }
            }if(x||y){break;}
        }
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if((possible_move([i,j,board[i][j]] ,[x,y,"ee"] ,board))[0] && board[i][j][1]!==(color)){
                    return true;
                }
            }
        }
        return false;
    }

    function leadsToCheck(tempInital, tempFinal, color) {
        let tempBoard = JSON.parse(JSON.stringify(boardCurr)); // Deep copy

        tempBoard[tempFinal[0]][tempFinal[1]] = tempInital[2];
        tempBoard[tempInital[0]][tempInital[1]] = ".";
        
        return check_or_not(color, tempBoard);
    }

    
    function valid_moves(inital,final,board){
        let poss=false
        let final_poss=[]
        let p_moves = possible_move(inital,final,board)[1]
        let i = 0;
            
        while (i < p_moves.length) {
            if (leadsToCheck(inital,ret_square(inital[2]+p_moves[i]) , inital[2][1])===false) {
                final_poss.push(p_moves[i]);
            }
            i++;
        }
        if (final_poss.includes(final[0].toString() + final[1])) {
            poss = true;
        }
        return [poss,final_poss];
    }

    function possible_move(inital,final,board){
        var poss=false;
        var p_moves=[];
        var x = inital[0];
        var y = inital[1];
        if(inital[2]==="pw"){
            p_moves=pw_moves(x,y,board);
        }
        else if(inital[2]==="pb"){
            p_moves=pb_moves(x,y,board);
        }
        else if(inital[2][0]==="n"){
            p_moves=n_moves(x,y,inital,board);
        }
        else if(inital[2][0]==="r"){
            p_moves=r_moves(x,y,inital,board);
        }

        else if(inital[2][0]==="b"){
            p_moves=b_moves(x,y,inital,board);
        }
        else if(inital[2][0]==="q"){
            var r=r_moves(x,y,inital,board);
            var b=b_moves(x,y,inital,board);
            p_moves=r.concat(b);
        }

        else if(inital[2][0]==="k"){
            p_moves=k_moves(x,y,inital,board);
        }

        if (p_moves.includes(final[0].toString() + final[1])) {
            poss = true;
        }
        return [poss,p_moves];
    }

    function pw_moves(x,y,board){
        var p_moves=[];
        if(board[x+1][y]==="."){
            p_moves.push((x+1).toString()+y);
        }
        if(board[x+2][y]==="." && x===1){
            p_moves.push((x+2).toString()+y);
        }
        if(board[x+1][y+1]!=="."){
            p_moves.push((x+1).toString()+(y+1));
        }
        if(board[x+1][y-1]!=="."){
            p_moves.push((x+1).toString()+(y-1));
        }
        return p_moves;
    }

    function pb_moves(x,y,board){
        var p_moves=[];
        if(board[x-1][y]==="."){
            p_moves.push((x-1).toString()+y);
        }
        if(board[x-2][y]==="." && x===6){
            p_moves.push((x-2).toString()+y);
        }
        if(board[x-1][y+1]!=="."){
            p_moves.push((x-1).toString()+(y+1));
        }
        if(board[x-1][y-1]!=="."){
            p_moves.push((x-1).toString()+(y-1));
        }
        return p_moves;
    }

    function n_moves(x,y,inital,board){
        var p_moves=[];
        for(var i=-2;i<3;i++){
            for(var j=-2;j<3;j++){
                if(i===j || i+j===0 || i===0 || j===0 || x+i>7 || x+i<0 || y+j>7 || y+j<0){continue;}
                else if(board[x+i][y+j][1]!==inital[2][1] || board[x+i][y+j][1]==="."){p_moves.push((x+i).toString()+(y+j));}
            }
        }
        return p_moves;
    }
    function r_moves(x,y,inital,board){    
        var p_moves=[];
        for(let i=x+1;i<8;i++){
            if(board[i][y]==="."){p_moves.push((i).toString()+(y));}
            else{
                if(board[i][y][1]!==inital[2][1]){p_moves.push((i).toString()+(y));}
                break;
            }
        }
        for(let i=x-1;i>=0;i--){
            if(board[i][y]==="."){p_moves.push((i).toString()+(y));}
            else{
                if(board[i][y][1]!==inital[2][1]){p_moves.push((i).toString()+(y));}
                break;
            }
        }
        for(let i=y+1;i<8;i++){
            if(board[x][i]==="."){p_moves.push((x).toString()+(i));}
            else{
                if(board[x][i][1]!==inital[2][1]){p_moves.push((x).toString()+(i));}
                break;
            }
        }
        for(let i=y-1;i>=0;i--){
            if(board[x][i]==="."){p_moves.push((x).toString()+(i));}
            else{
                if(board[x][i][1]!==inital[2][1]){p_moves.push((x).toString()+(i));}
                break;
            }
        }
        return p_moves;
    }

    function b_moves(x,y,inital,board){
        var p_moves=[];
        for(let i=1;x+i<8 && y+i<8;i++){
            if(board[x+i][y+i]==="."){p_moves.push((x+i).toString()+(y+i));}
            else{
                if(board[x+i][y+i][1]!==inital[2][1]){p_moves.push((x+i).toString()+(y+i));}
                break;
            }
        }
        for(let i=1;x-i>=0 && y+i<8;i++){
            if(board[x-i][y+i]==="."){p_moves.push((x-i).toString()+(y+i));}
            else{
                if(board[x-i][y+i][1]!==inital[2][1]){p_moves.push((x-i).toString()+(y+i));}
                break;
            }
        }
        for(let i=1;x-i>=0 && y-i>=0;i++){
            if(board[x-i][y-i]==="."){p_moves.push((x-i).toString()+(y-i));}
            else{
                if(board[x-i][y-i][1]!==inital[2][1]){p_moves.push((x-i).toString()+(y-i));}
                break;
            }
        }
        for(let i=1;x+i<8 && y-i>=0;i++){
            if(board[x+i][y-i]==="."){p_moves.push((x+i).toString()+(y-i));}
            else{
                if(board[x+i][y-i][1]!==inital[2][1]){p_moves.push((x+i).toString()+(y-i));}
                break;
            }
        }
        return p_moves;
    }
    function k_moves(x,y,inital,board){
        let p_moves=[];
        for(let i=-1;i<2;i++){
            for(let j=-1;j<2;j++){
                if(i===0 && j===0){continue;}
                else if (x + i >= 0 && x + i < 8 &&  y + j >= 0 && y + j < 8 && (board[x + i][y + j][1] !== inital[2][1] || board[x + i][y + j][1] === ".")
                ) {
                    p_moves.push((x + i).toString() + (y + j));
                }
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
