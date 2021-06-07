let db = [];

for(let i=0;i<8;i++){

    let row = [];

    for(let j=0;j<8;j++){

        let name = String.fromCharCode(97+j)+(i+1)+"";
        let cellobj = {
            name:name,
            piece:"",
            color:"",
            step:0
        }

        row.push(cellobj);
    }

    db.push(row);

}

function fill(){
    db[0][0].piece = "rook";
    db[0][0].color = "black";
    db[0][1].piece = "knight";
    db[0][1].color = "black";
    db[0][2].piece = "bishop";
    db[0][2].color = "black";
    db[0][3].piece = "queen";
    db[0][3].color = "black";
    db[0][4].piece = "king";
    db[0][4].color = "black";
    db[0][5].piece = "bishop";
    db[0][5].color = "black";
    db[0][6].piece = "knight";
    db[0][6].color = "black";
    db[0][7].piece = "rook";
    db[0][7].color = "black";

    db[1][0].piece = "pawn";
    db[1][0].color = "black";
    db[1][1].piece = "pawn";
    db[1][1].color = "black";
    db[1][2].piece = "pawn";
    db[1][2].color = "black";
    db[1][3].piece = "pawn";
    db[1][3].color = "black";
    db[1][4].piece = "pawn";
    db[1][4].color = "black";
    db[1][5].piece = "pawn";
    db[1][5].color = "black";
    db[1][6].piece = "pawn";
    db[1][6].color = "black";
    db[1][7].piece = "pawn";
    db[1][7].color = "black";

    db[6][0].piece = "pawn";
    db[6][0].color = "white";
    db[6][1].piece = "pawn";
    db[6][1].color = "white";
    db[6][2].piece = "pawn";
    db[6][2].color = "white";
    db[6][3].piece = "pawn";
    db[6][3].color = "white";
    db[6][4].piece = "pawn";
    db[6][4].color = "white";
    db[6][5].piece = "pawn";
    db[6][5].color = "white";
    db[6][6].piece = "pawn";
    db[6][6].color = "white";
    db[6][7].piece = "pawn";
    db[6][7].color = "white";

    db[7][0].piece = "rook";
    db[7][0].color = "white";
    db[7][1].piece = "knight";
    db[7][1].color = "white";
    db[7][2].piece = "bishop";
    db[7][2].color = "white";
    db[7][3].piece = "king";
    db[7][3].color = "white";
    db[7][4].piece = "queen";
    db[7][4].color = "white";
    db[7][5].piece = "bishop";
    db[7][5].color = "white";
    db[7][6].piece = "knight";
    db[7][6].color = "white";
    db[7][7].piece = "rook";
    db[7][7].color = "white";

}

fill();

// console.log(db);