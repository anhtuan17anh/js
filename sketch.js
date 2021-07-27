const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.fillRect(0,0,canvas.width, canvas.height);
var cols, rows;

var w = 40;
var grid = [];
var current;
cols = Math.floor(canvas.width / w);
rows = Math.floor(canvas.height / w);


for (let j = 0; j < rows ; j++){
    for(let i = 0; i < cols; i ++){
        var cell = new Cell(i,j);
        grid.push(cell);
    }
}
current = grid[0];

function index(i,j){
    if (i < 0 || i > cols-1 || j < 0 || j > rows-1){
        return -1;
    }

    return i + (j * cols);
}
    console.log(grid[index(0,2)])
function Cell(i,j){

    this.i = i;
    this.j = j;
    this.walls = [true, true, true,true];
    this.visited = false;

    this.checkNeighbor = function(){
        var neighbors = [];

        var top = grid[index(i,j - 1)];
        if (top && !top.visited){
            neighbors.push(top);
        }
        var right = grid[index(i + 1,j)];
        if (right && !right.visited){
            neighbors.push(right);
        }
        var bottom = grid[index(i,j + 1)];
        if (bottom && !bottom.visited){
            neighbors.push(bottom);
        }
        var left = grid[index(i - 1,j)];
        if (left && !left.visited){
            neighbors.push(left);
        }
        var random = Math.floor(Math.random() * 4);
        if (neighbors.length > 0){
            return neighbors[random];
        } else{
            return undefined;
        }
        


    }
        

    this.show = function(){
        var x = this.i * w;
        var y = this.j * w;

        if (this.walls[0]){
            ctx.moveTo(x,y);
            ctx.lineTo(x+w,y);     
        }
        if (this.walls[1]){
            ctx.moveTo(x+w,y);
            ctx.lineTo(x+w,y+w);    
        }
        if (this.walls[2]){
            ctx.moveTo(x+w,y+w);
            ctx.lineTo(x,y+w);    
        }
        if (this.walls[3]){
            ctx.moveTo(x,y+w);
            ctx.lineTo(x,y);    
        }
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.stroke();
        

        if (this.visited){
            ctx.moveTo(x,y);
            ctx.fillStyle = "#934833";
            ctx.fillRect(x,y,w,w);
        }

        // noFill();
        // rect(x,y,w,w);
    }
}

function draw(){
    current.visited = true;
    for (let i = 0; i < grid.length; i ++){
        grid[i].show();
    }
    var next = current.checkNeighbor();
    if(next){
       next.visited = true;
       current = next; 
    }
    //console.log(current);
    

    //requestAnimationFrame(draw);
}
draw();
function main(){
    setInterval(draw,1);
}
main ();