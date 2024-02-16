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


Wavefunction.prototype.coord2index = function(x, y){
    return y*this.sideLength + x
}


Wavefunction.prototype.cell2blockCoord = function(cellId){
    let [x, y] = this.index2coord(cellId);
    return [Math.floor(x/this.blockLength), Math.floor(y/this.blockLength)];
}


Wavefunction.prototype.cell2blockIndex = function(cellId){
    let [xBlock, yBlock] = this.cell2blockCoord(cellId);
    return this.coord2index(xBlock, yBlock);
}


Wavefunction.prototype.collapseTo = function(cellId, to){
    // set cell's status to collapsed by leaving only a single choice
    this.cells[cellId].collapsed = true;
    this.cells[cellId].possibilities = [to];

    /*
     * TODO: remove code duplication
     */

    // propagate in rows and columns
    let [x, y] = this.index2coord(cellId);
    for (let i = 0; i < this.sideLength; i++){
        [this.coord2index(x, i), this.coord2index(i, y)].forEach((otherId) => {
            if (otherId === cellId){
                return
            }
            
            this.cells[otherId].possibilities.filter((val, idx, arr) => {
                if (val !== to){
                    return false
                }
                arr.splice(idx, 1);
                return true
            });

            if (this.cells[otherId].possibilities.length === 1 && !this.cells[otherId].collapsed){
                this.collapseTo(otherId, this.cells[otherId].possibilities[0])
            }
        })
    }

    // propagate block
    let block = this.cell2blockIndex(cellId);
    this.cells.forEach((other, otherId) => {
        if (this.cell2blockIndex(otherId) !== block){
            return
        }

        if (otherId === cellId){
            return
        }

        other.possibilities.filter((val, idx, arr) => {
            if (val !== to){
                return false
            }
            arr.splice(idx, 1);
            return true
        });

        if (this.cells[otherId].possibilities.length === 1 && !this.cells[otherId].collapsed){
            this.collapseTo(otherId, this.cells[otherId].possibilities[0])
        }
    });
}


export default Wavefunction;