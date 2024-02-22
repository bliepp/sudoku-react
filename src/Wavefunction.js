import isCallable from "is-callable";

function Wavefunction(sideLength, changeCallback){
    this.sideLength = sideLength;
    this.blockLength = Math.sqrt(this.sideLength);
    this.changeCallback = changeCallback;
    this.reset();
}


Wavefunction.prototype.reset = function(){
    this.cells = [];
    for (let i = 0; i  < this.sideLength*this.sideLength; i++) {
        this.cells.push({
            collapsed: false,
            possibilities: [...Array(this.sideLength).keys()].map(i => i+1),
        });
    }

    this.saveInitialState();

    if (isCallable(this.changeCallback))
        this.changeCallback(this);
}


Wavefunction.prototype.saveInitialState = function(){
    this.initialState = JSON.parse(JSON.stringify(this.cells));
}


Wavefunction.prototype.loadInitialState = function(){
    this.cells = JSON.parse(JSON.stringify(this.initialState));
    if (isCallable(this.changeCallback))
        this.changeCallback(this);
}


Wavefunction.prototype.getMinEntropy = function(){
    let entropies = this.cells.map((val) => {
        return val.collapsed ? Infinity : val.possibilities.length
    });
    return Math.min(...entropies)
}


Wavefunction.prototype.isFinished = function(){
    return this.cells.filter((val) => val.collapsed).length === this.cells.length
}


Wavefunction.prototype.isValid = function(){
    return this.cells.filter((val) => val.possibilities.length === 0).length === 0
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


Wavefunction.prototype.removePossibility = function(cellId, valueToRemove){
    this.cells[cellId].possibilities.filter((val, idx, arr) => {
        if (val !== valueToRemove){
            return false
        }
        arr.splice(idx, 1);
        return true
    });

    if (this.cells[cellId].possibilities.length === 1 && !this.cells[cellId].collapsed){
        this.collapseTo(cellId, this.cells[cellId].possibilities[0])
    }
}


Wavefunction.prototype.collapseTo = function(cellId, to){
    // set cell's status to collapsed by leaving only a single choice
    this.cells[cellId].collapsed = true;
    this.cells[cellId].possibilities = [to];

    // propagate in rows and columns
    let [x, y] = this.index2coord(cellId);
    for (let i = 0; i < this.sideLength; i++){
        [this.coord2index(x, i), this.coord2index(i, y)].forEach((otherId) => {
            if (otherId === cellId){
                return
            }

            this.removePossibility(otherId, to);
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

        this.removePossibility(otherId, to);
    });
}


Wavefunction.prototype.solveStep = function(){
    if (this.isFinished()){
        return
    }

    const minEntropy = this.getMinEntropy();
    const indexes = this.cells.map((val, index) => {
        if (val.possibilities.length === minEntropy){
            return index
        }
    }).filter((val) => val !== undefined);
    let randIndex = indexes[Math.floor(Math.random()*indexes.length)];
    let randValue = this.cells[randIndex].possibilities[Math.floor(Math.random() * this.cells[randIndex].possibilities.length)];

    this.collapseTo(randIndex, randValue);

    if (!this.isValid()){
        // TODO: Alert user?
        // TODO: Count failures and abort after maximum amount of failures
        console.log("Role back due to result being invalid")
        this.loadInitialState();
    }
}


Wavefunction.prototype.solve = function(){
    this.saveInitialState();

    while (!this.isFinished())
        this.solveStep();

    if (isCallable(this.changeCallback))
        this.changeCallback(this);
}


export default Wavefunction;
