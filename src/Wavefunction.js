function Wavefunction(sideLength){
    this.sideLength = sideLength;
    this.blockLength = Math.sqrt(this.sideLength);

    this.cells = [];
    for (let i = 0; i  < this.sideLength*this.sideLength; i++) {
        this.cells.push({
            collapsed: false,
            possibilities: [...Array(this.sideLength).keys()].map(i => i+1),
        });
    }
}


Wavefunction.prototype.index2coord = function(i){
    return [i % this.sideLength, Math.floor(i / this.sideLength)]
}


Wavefunction.prototype.coord2index = function(x, y) {
    return y*this.sideLength + x
}


Wavefunction.prototype.collapseTo = function(cellId, to){
    // set cell's status to collapsed by leaving only a single choice
    this.cells[cellId].collapsed = true;
    this.cells[cellId].possibilities = [to];

    // propagate in rows and columns
    let [x, y] = this.index2coord(cellId);
    for (let i = 0; i < this.sideLength; i++){
        [this.coord2index(x, i), this.coord2index(i, y)].forEach((newId) => {
            if (newId === cellId){
                return
            }
            
            this.cells[newId].possibilities.filter((val, idx, arr) => {
                if (val !== to){
                    return false
                }
                arr.splice(idx, 1);
                return true
            });
        })
    }
}


export default Wavefunction;