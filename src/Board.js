import { Fragment, useMemo, useState } from "react";
import Cell from "./Cell";


export default function Board({ sidelength, strokeWidth }){
    sidelength = sidelength || 9;
    strokeWidth = strokeWidth || 0;

    const SIZE = 750;

    const blockLength = Math.sqrt(sidelength);
    const cellOffset = 0.75*strokeWidth;
    const cellSize = (SIZE - 2*cellOffset - 0.5*(blockLength - 1)*strokeWidth)/sidelength;

    const [cells, setCells] = useState([]);
    useMemo(() => {
        if (cells.length !== 0)
            return;
        
        for (let id = 0; id < sidelength*sidelength; id++){
            cells.push({
                possibilities: [...Array(sidelength).keys()].map(i => i+1),
            });
        }
        setCells(cells);
    }, [cells, sidelength]);

    if (!Number.isInteger(blockLength))
        return (
            <span>Variable <code>sidelength</code> must be a square number.</span>
        );
    

    function index2coord(id){
        return [id % sidelength, Math.floor(id / sidelength)];
    }
    
    function coord2index(x, y){
        return y*sidelength + x;
    }

    function collapseTo(cellId, to){
        // set cell's status to collapsed by leaving only a single choice
        let newCells = [...cells];
        newCells[cellId].possibilities = [to];

        // propagate in rows and columns
        let [x, y] = index2coord(cellId);
        for (let i = 0; i < sidelength; i++){
            [coord2index(x, i), coord2index(i, y)].forEach((newId) => {
                if (newId === cellId){
                    return
                }
                
                newCells[newId].possibilities.filter((val, idx, arr) => {
                    if (val !== to){
                        return false
                    }
                    arr.splice(idx, 1);
                    return true
                });
            })
        }

        setCells(newCells);
    }

    return (
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}>
            {
                cells.map((value, index) => {
                    const [x, y] = index2coord(index);
                    let xBlock = Math.floor(x/blockLength);
                    let yBlock = Math.floor(y/blockLength);
                    return (
                        <Cell key={index}
                            onClick={(i) => {collapseTo(index, i)}}
                            x={cellOffset + x*cellSize + 0.5*xBlock*strokeWidth} y={cellOffset + y*cellSize + 0.5*yBlock*strokeWidth}
                            size={cellSize} strokeWidth={strokeWidth/4}
                            possibilities={value.possibilities}
                        />
                    );
                })
            }
            <rect className="OuterBorder"
                x={strokeWidth/2} y={strokeWidth/2}
                width={SIZE - strokeWidth} height={SIZE - strokeWidth}
                stroke="black" strokeWidth={strokeWidth} fill="None"
            />
            {
                [...Array(blockLength - 1).keys()].map((value) => {
                    let no = value + 1;
                    return (
                        <Fragment key={value}>
                            <line className="ThickLines"
                                x1={cellOffset + no*blockLength*cellSize + value*0.5*strokeWidth + 0.25*strokeWidth} y1={0}
                                x2={cellOffset + no*blockLength*cellSize + value*0.5*strokeWidth + 0.25*strokeWidth} y2={SIZE}
                                stroke="black" strokeWidth={strokeWidth}
                            />
                            <line className="ThickLines"
                                x1={0} y1={cellOffset + no*blockLength*cellSize + value*0.5*strokeWidth + 0.25*strokeWidth}
                                x2={SIZE} y2={cellOffset + no*blockLength*cellSize + value*0.5*strokeWidth + 0.25*strokeWidth}
                                stroke="black" strokeWidth={strokeWidth}
                            />
                        </Fragment>
                    );
                })
            }
        </svg>
    );
};