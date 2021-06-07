let cells = document.querySelectorAll(".row");
let lastselectedcell;
let cellselected = false;
let movetocell;
let rowid;
let colid;
let cellobj
let counter = true;
let winner = document.querySelector(".winner");
let one = winner.querySelector(".one");
let two = winner.querySelector(".two");
let chessboard = document.querySelector(".chess-board");
let turn = true;

for(let i=0;i<cells.length;i++){

    cells[i].addEventListener("click",function(e){

        if(cellselected){

            let rowid1 = e.path[2].id;
            let x;
            let y;
            if(rowid1){
                y = e.path[2].id;
                x = e.path[3].id;
            }else{
                y = e.path[0].id;
                x = e.path[1].id;
            }

            let path = e.path;
            y = Number(y);
            x = Number(x);
            
            let div1 = document.querySelector(`div[rowid="${x}"][id="${y}"]`);
            let div2 = document.querySelector(`div[rowid="${rowid}"][id="${colid}"]`);
            

            if(div1.classList.contains("valid")){
                move(x,y,rowid,colid);
                turn = false;
                socket.emit("move",{x,y,rowid,colid});

            }else{
                console.log("illegeal move");
                cellselected = false;
                for(let i=1;i<=8;i++){
                    for(let j=1;j<=8;j++){
                        document.querySelector(`div[rowid="${i}"][id="${j}"]`).classList.remove("valid");
                    }
                }
            }   

            
        }else{
            
            if(turn){

                let rowid1 = e.path[2].id;
                if(rowid1){
                    colid = e.path[2].id;
                    rowid = e.path[3].id;
                }else{
                    colid = e.path[0].id;
                    rowid = e.path[1].id;
                }

                colid = Number(colid);
                rowid = Number(rowid);
                cellobj = db[rowid-1][colid-1];

                if(counter && cellobj.color=="white"){
                    cellselected = true;    
                    checkvalid(rowid,colid,cellobj.piece,cellobj);
                    
                }else if(!counter && cellobj.color=="black"){
                    cellselected = true;    
                    checkvalid(rowid,colid,cellobj.piece,cellobj);
                    
                }

            }
            

            

        }
    })

}

function move(x,y,rowid,colid){

    cellobj = db[rowid-1][colid-1];
    db[x-1][y-1].piece = cellobj.piece;
    db[x-1][y-1].color = cellobj.color;
    db[x-1][y-1].step = cellobj.step+1;
    db[rowid-1][colid-1].piece = "";
    db[rowid-1][colid-1].color = "";
    cellobj.step = 0;

    let div1 = document.querySelector(`div[rowid="${x}"][id="${y}"]`);
    let div2 = document.querySelector(`div[rowid="${rowid}"][id="${colid}"]`);

    let removedpiece = div1.querySelector("div");

    if(div1.querySelector("div")){
        div1.innerHTML = "";
    }

    div1.append(div2.querySelector("div"));
    cellselected = false;

    if(removedpiece){
        if(removedpiece.classList.contains("king")){
            winner.classList.remove("hide");
            if(removedpiece.classList.contains("black")){
                console.log("player1 won");
                one.classList.remove("hide");
            }else{
                console.log("player2 won");
                two.classList.remove("hide");
            }
            chessboard.classList.add("fade");
        }
    }

    for(let i=1;i<=8;i++){
        for(let j=1;j<=8;j++){
            document.querySelector(`div[rowid="${i}"][id="${j}"]`).classList.remove("valid");
        }
    }

    counter = !counter;

    

}

function checkvalid(i,j,piece,cellobj){

    if(piece=="rook"){
        for(let i1=j+1;i1<=8;i1++){
            if(cellobj.color=="white"){
                if(db[i-1][i1-1].color=="white"){
                    break;
                }
                if(db[i-1][i1-1].color=="black"){
                    document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
            }else{
                if(db[i-1][i1-1].color=="black"){
                    break;
                }
                if(db[i-1][i1-1].color=="white"){
                    document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
            }
            
        }

        for(let i1=j-1;i1>0;i1--){
            if(cellobj.color=="white"){
                if(db[i-1][i1-1].color=="white"){
                    break;
                }
                if(db[i-1][i1-1].color=="black"){
                    document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
            }else{
                if(db[i-1][i1-1].color=="black"){
                    break;
                }
                if(db[i-1][i1-1].color=="white"){
                    document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
            }
            
        }

        for(let i1=i+1;i1<=8;i1++){
            if(cellobj.color=="white"){
                if(db[i1-1][j-1].color=="white"){
                    break;
                }
                if(db[i1-1][j-1].color=="black"){
                    document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
            }else{
                if(db[i1-1][j-1].color=="black"){
                    break;
                }
                if(db[i1-1][j-1].color=="color"){
                    document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
            }
            
        }

        for(let i1=i-1;i1>0;i1--){
            if(cellobj.color=="white"){
                if(db[i1-1][j-1].color=="white"){
                    break;
                }
                if(db[i1-1][j-1].color=="black"){
                    document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
            }else{
                if(db[i1-1][j-1].color=="black"){
                    break;
                }
                if(db[i1-1][j-1].color=="white"){
                    document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
            }
            
        }
    }else if(piece=="pawn"){
        //2 steps implemetation left
        if(cellobj.color=="white"){
            if(i!=1 && db[i-2][j-1].color!="white" && db[i-2][j-1].color!="black"){
                document.querySelector(`div[rowid="${i-1}"][id="${j}"]`).classList.add("valid");
            }
            if(i!=1 && j!=1){
                if(db[i-2][j-2].color=="black"){
                    document.querySelector(`div[rowid="${i-1}"][id="${j-1}"]`).classList.add("valid");
                }
            }
            if(i!=1 && j!=8){
                if(db[i-2][j].color=="black"){
                    document.querySelector(`div[rowid="${i-1}"][id="${j+1}"]`).classList.add("valid");
                }
            }
            if(i!=2 && cellobj.step==0 && db[i-3][j-1].color!="white" && db[i-3][j-1].color!="black"){
                document.querySelector(`div[rowid="${i-2}"][id="${j}"]`).classList.add("valid");
            }
        }else{
            if(i!=8 && db[i][j-1].color!="white" && db[i][j-1].color!="black"){
                document.querySelector(`div[rowid="${i+1}"][id="${j}"]`).classList.add("valid");
            }
            if(i!=8 && j!=1){
                if(db[i][j-2].color=="white"){
                    document.querySelector(`div[rowid="${i+1}"][id="${j-1}"]`).classList.add("valid");
                }
            }
            if(i!=8 && j!=8){
                if(db[i][j].color=="white"){
                    document.querySelector(`div[rowid="${i+1}"][id="${j+1}"]`).classList.add("valid");
                }
            }
            if(i!=7 && cellobj.step==0){
                if(db[i+1][j-1].color!="white" && db[i+1][j-1].color!="black"){
                    document.querySelector(`div[rowid="${i+2}"][id="${j}"]`).classList.add("valid");
                }
            }
        }

    }else if(piece=="bishop"){

        if(cellobj.color=="white"){

            for(let n=i+1,m=j+1;n<=8 && m<=8;n++,m++){
                if(db[n-1][m-1].color=="white"){
                    break;
                }
                if(db[n-1][m-1].color=="black"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i+1,m=j-1;n<=8 && m>0;n++,m--){
                if(db[n-1][m-1].color=="white"){
                    break;
                }
                if(db[n-1][m-1].color=="black"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i-1,m=j-1;n>0 && m>0;n--,m--){
                if(db[n-1][m-1].color=="white"){
                    break;
                }
                if(db[n-1][m-1].color=="black"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i-1,m=j+1;n>0 && m<=8;n--,m++){
                if(db[n-1][m-1].color=="white"){
                    break;
                }
                if(db[n-1][m-1].color=="black"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

        }else{

            for(let n=i+1,m=j+1;n<=8 && m<=8;n++,m++){
                if(db[n-1][m-1].color=="black"){
                    break;
                }
                if(db[n-1][m-1].color=="white"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i+1,m=j-1;n<=8 && m>0;n++,m--){
                if(db[n-1][m-1].color=="black"){
                    break;
                }
                if(db[n-1][m-1].color=="white"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i-1,m=j-1;n>0 && m>0;n--,m--){
                if(db[n-1][m-1].color=="black"){
                    break;
                }
                if(db[n-1][m-1].color=="white"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i-1,m=j+1;n>0 && m<=8;n--,m++){
                if(db[n-1][m-1].color=="black"){
                    break;
                }
                if(db[n-1][m-1].color=="white"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }
        }

    }else if(piece=="knight"){

        if(i-2>0 && j-1>0){
            if(cellobj.color=="black" && db[i-3][j-2].color!="black"){
                document.querySelector(`div[rowid="${i-2}"][id="${j-1}"]`).classList.add("valid");
            }else if(cellobj.color=="white" && db[i-3][j-2].color!="white"){
                document.querySelector(`div[rowid="${i-2}"][id="${j-1}"]`).classList.add("valid");
            }
        }

        if(i-1>0 && j-2>0){
            if(cellobj.color=="black" && db[i-2][j-3].color!="black"){
                document.querySelector(`div[rowid="${i-1}"][id="${j-2}"]`).classList.add("valid");
            }else if(cellobj.color=="white" && db[i-2][j-3].color!="white"){
                document.querySelector(`div[rowid="${i-1}"][id="${j-2}"]`).classList.add("valid");
            }
        }

        if(i+1<=8 && j-2>0){
            if(cellobj.color=="black" && db[i][j-3].color!="black"){
                document.querySelector(`div[rowid="${i+1}"][id="${j-2}"]`).classList.add("valid");
            }else if(cellobj.color=="white" && db[i][j-3].color!="white"){
                document.querySelector(`div[rowid="${i+1}"][id="${j-2}"]`).classList.add("valid");
            }
        }

        if(i+2<=8 && j-1>0){
            if(cellobj.color=="black" && db[i+1][j-2].color!="black"){
                document.querySelector(`div[rowid="${i+2}"][id="${j-1}"]`).classList.add("valid");
            }else if(cellobj.color=="white" && db[i+1][j-2].color!="white"){
                document.querySelector(`div[rowid="${i+2}"][id="${j-1}"]`).classList.add("valid");
            }
        }

        if(i+2<=8 && j+1<=8){
            if(cellobj.color=="black" && db[i+1][j].color!="black"){
                document.querySelector(`div[rowid="${i+2}"][id="${j+1}"]`).classList.add("valid");
            }else if(cellobj.color=="white" && db[i+1][j].color!="white"){
                document.querySelector(`div[rowid="${i+2}"][id="${j+1}"]`).classList.add("valid");
            }
        }

        if(i+1<=8 && j+2<=8){
            if(cellobj.color=="black" && db[i][j+1].color!="black"){
                document.querySelector(`div[rowid="${i+1}"][id="${j+2}"]`).classList.add("valid");
            }else if(cellobj.color=="white" && db[i][j+1].color!="white"){
                document.querySelector(`div[rowid="${i+1}"][id="${j+2}"]`).classList.add("valid");
            }
        }

        if(i-1>0 && j+2<=8){
            if(cellobj.color=="black" && db[i-2][j+1].color!="black"){
                document.querySelector(`div[rowid="${i-1}"][id="${j+2}"]`).classList.add("valid");
            }else if(cellobj.color=="white" && db[i-2][j+1].color!="white"){
                document.querySelector(`div[rowid="${i-1}"][id="${j+2}"]`).classList.add("valid");
            }
        }

        if(i-2>0 && j+1<=8){
            if(cellobj.color=="black" && db[i-3][j].color!="black"){
                document.querySelector(`div[rowid="${i-2}"][id="${j+1}"]`).classList.add("valid");
            }else if(cellobj.color=="white" && db[i-3][j].color!="white"){
                document.querySelector(`div[rowid="${i-2}"][id="${j+1}"]`).classList.add("valid");
            }
        }

    }else if(piece=="queen"){
        for(let i1=j+1;i1<=8;i1++){
            if(cellobj.color=="white"){
                if(db[i-1][i1-1].color=="white"){
                    break;
                }
                if(db[i-1][i1-1].color=="black"){
                    document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
            }else{
                if(db[i-1][i1-1].color=="black"){
                    break;
                }
                if(db[i-1][i1-1].color=="white"){
                    document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
            }
            
        }

        for(let i1=j-1;i1>0;i1--){
            if(cellobj.color=="white"){
                if(db[i-1][i1-1].color=="white"){
                    break;
                }
                if(db[i-1][i1-1].color=="black"){
                    document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
            }else{
                if(db[i-1][i1-1].color=="black"){
                    break;
                }
                if(db[i-1][i1-1].color=="white"){
                    document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i}"][id="${i1}"]`).classList.add("valid");
            }
            
        }

        for(let i1=i+1;i1<=8;i1++){
            if(cellobj.color=="white"){
                if(db[i1-1][j-1].color=="white"){
                    break;
                }
                if(db[i1-1][j-1].color=="black"){
                    document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
            }else{
                if(db[i1-1][j-1].color=="black"){
                    break;
                }
                if(db[i1-1][j-1].color=="white"){
                    document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
            }
            
        }

        for(let i1=i-1;i1>0;i1--){
            if(cellobj.color=="white"){
                if(db[i1-1][j-1].color=="white"){
                    break;
                }
                if(db[i1-1][j-1].color=="black"){
                    document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
            }else{
                if(db[i1-1][j-1].color=="black"){
                    break;
                }
                if(db[i1-1][j-1].color=="white"){
                    document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${i1}"][id="${j}"]`).classList.add("valid");
            }
            
        }

        if(cellobj.color=="white"){

            for(let n=i+1,m=j+1;n<=8 && m<=8;n++,m++){
                if(db[n-1][m-1].color=="white"){
                    break;
                }
                if(db[n-1][m-1].color=="black"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i+1,m=j-1;n<=8 && m>0;n++,m--){
                if(db[n-1][m-1].color=="white"){
                    break;
                }
                if(db[n-1][m-1].color=="black"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i-1,m=j-1;n>0 && m>0;n--,m--){
                if(db[n-1][m-1].color=="white"){
                    break;
                }
                if(db[n-1][m-1].color=="black"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i-1,m=j+1;n>0 && m<=8;n--,m++){
                if(db[n-1][m-1].color=="white"){
                    break;
                }
                if(db[n-1][m-1].color=="black"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

        }else{

            for(let n=i+1,m=j+1;n<=8 && m<=8;n++,m++){
                if(db[n-1][m-1].color=="black"){
                    break;
                }
                if(db[n-1][m-1].color=="white"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i+1,m=j-1;n<=8 && m>0;n++,m--){
                if(db[n-1][m-1].color=="black"){
                    break;
                }
                if(db[n-1][m-1].color=="white"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i-1,m=j-1;n>0 && m>0;n--,m--){
                if(db[n-1][m-1].color=="black"){
                    break;
                }
                if(db[n-1][m-1].color=="white"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }

            for(let n=i-1,m=j+1;n>0 && m<=8;n--,m++){
                if(db[n-1][m-1].color=="black"){
                    break;
                }
                if(db[n-1][m-1].color=="white"){
                    document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
                    break;
                }
                document.querySelector(`div[rowid="${n}"][id="${m}"]`).classList.add("valid");
            }
        }
    }else{

        if(i-1>0){
            if((cellobj.color=="white" && db[i-2][j-1].color!="white") || (cellobj.color=="black" && db[i-2][j-1].color!="black")){
                document.querySelector(`div[rowid="${i-1}"][id="${j}"]`).classList.add("valid");
            }
        }
        if(i+1<=8){
            if((cellobj.color=="white" && db[i][j-1].color!="white") || (cellobj.color=="black" && db[i][j-1].color!="black")){
                document.querySelector(`div[rowid="${i+1}"][id="${j}"]`).classList.add("valid");
            }
        }
        if(j-1>0){
            if((cellobj.color=="white" && db[i-1][j-2].color!="white") || (cellobj.color=="black" && db[i-1][j-2].color!="black")){
                document.querySelector(`div[rowid="${i}"][id="${j-1}"]`).classList.add("valid");
            }
        }
        if(j+1<=8){
            if((cellobj.color=="white" && db[i-1][j].color!="white") || (cellobj.color=="black" && db[i-1][j].color!="black")){
                document.querySelector(`div[rowid="${i}"][id="${j+1}"]`).classList.add("valid");
            }
        }
        if(i-1>0 && j-1>0){
            if((cellobj.color=="white" && db[i-2][j-2].color!="white") || (cellobj.color=="black" && db[i-2][j-2].color!="black")){
                document.querySelector(`div[rowid="${i-1}"][id="${j-1}"]`).classList.add("valid");
            }
        }
        if(i+1<=8 && j-1>0){
            if((cellobj.color=="white" && db[i][j-2].color!="white") || (cellobj.color=="black" && db[i][j-2].color!="black")){
                document.querySelector(`div[rowid="${i+1}"][id="${j-1}"]`).classList.add("valid");
            }
        }
        if(i+1<=8 && j+1<=8){
            if((cellobj.color=="white" && db[i][j].color!="white") || (cellobj.color=="black" && db[i][j].color!="black")){
                document.querySelector(`div[rowid="${i+1}"][id="${j+1}"]`).classList.add("valid");
            }
        }
        if(i-1>0 && j+1<=8){
            if((cellobj.color=="white" && db[i-2][j].color!="white") || (cellobj.color=="black" && db[i-2][j].color!="black")){
                document.querySelector(`div[rowid="${i-1}"][id="${j+1}"]`).classList.add("valid");
            }
        }

    }


}
