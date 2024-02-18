import { Fragment, forwardRef, useMemo, useState } from "react";

import Cell from "./Cell";
import Wavefunction from "./Wavefunction";


function Board({ sideLength = 9, strokeWidth = 10, size = 512 }, ref){
    const [cells, setCells] = useState([]);
    const wavefunction = useMemo(() => {
        let wf = new Wavefunction(sideLength);
        setCells([...wf.cells]);
        return wf
    }, [sideLength]);

    const cellOffset = 0.75*strokeWidth;
    const cellSize = (size - 2*cellOffset - 0.5*(wavefunction.blockLength - 1)*strokeWidth)/wavefunction.sideLength;


    if (!Number.isInteger(wavefunction.blockLength))
        return (
            <span>Variable <code>sidelength</code> must be a square number.</span>
        );


    return (
        <svg ref={ref} viewBox={`0 0 ${size} ${size}`}>
            {
                cells.map((value, index) => {
                    let [x, y] = wavefunction.index2coord(index);
                    let [xBlock, yBlock] = wavefunction.cell2blockCoord(index);
                    return (
                        <Cell key={index}
                            onClick={(i) => {wavefunction.collapseTo(index, i); setCells([...wavefunction.cells])}}
                            x={cellOffset + x*cellSize + 0.5*xBlock*strokeWidth} y={cellOffset + y*cellSize + 0.5*yBlock*strokeWidth}
                            size={cellSize} strokeWidth={strokeWidth/4}
                            possibilities={value.possibilities}
                        />
                    );
                })
            }
            <rect className="OuterBorder"
                x={strokeWidth/2} y={strokeWidth/2}
                width={size - strokeWidth} height={size - strokeWidth}
                stroke="black" strokeWidth={strokeWidth} fill="None"
            />
            {
                [...Array(wavefunction.blockLength - 1).keys()].map((value) => {
                    let no = value + 1;
                    return (
                        <Fragment key={value}>
                            <line className="ThickLines"
                                x1={cellOffset + no*wavefunction.blockLength*cellSize + value*0.5*strokeWidth + 0.25*strokeWidth} y1={0}
                                x2={cellOffset + no*wavefunction.blockLength*cellSize + value*0.5*strokeWidth + 0.25*strokeWidth} y2={size}
                                stroke="black" strokeWidth={strokeWidth}
                            />
                            <line className="ThickLines"
                                x1={0} y1={cellOffset + no*wavefunction.blockLength*cellSize + value*0.5*strokeWidth + 0.25*strokeWidth}
                                x2={size} y2={cellOffset + no*wavefunction.blockLength*cellSize + value*0.5*strokeWidth + 0.25*strokeWidth}
                                stroke="black" strokeWidth={strokeWidth}
                            />
                        </Fragment>
                    );
                })
            }
        </svg>
    );
}

export default forwardRef(Board);
