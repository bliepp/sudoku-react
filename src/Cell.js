import { useMemo, useState } from "react";

export default function Cell({ x, y, size, strokeWidth, possibilities, onClick }){
    const [gridSize, setGridSize] = useState(0);
    useMemo(() => {
        setGridSize(Math.ceil(Math.sqrt(possibilities.length)))
    }, [possibilities]);

    const innerSize = size - strokeWidth;

    return (
        <g>
            <rect
                x={x + strokeWidth/2} y={y + strokeWidth/2}
                width={innerSize} height={innerSize}
                stroke="black" strokeWidth={strokeWidth} fill="None"
            />
            {
                possibilities.map((value, index) => {
                    let new_x = x + size/2 + (index % gridSize - 0.5*gridSize + 0.5)*size/gridSize;
                    let new_y = y + size/2 + (Math.floor(index/gridSize) - 0.5*gridSize + 0.5)*size/gridSize;
                    return (
                        <text key={index}
                            onClick={() => {onClick(value)}}
                            x={new_x} y={new_y}
                            textAnchor="middle" dominantBaseline="central" fontSize={possibilities.length > 1 ? size/(2*gridSize) : size/2}
                        >{ value }</text>
                    );
                })
            }
        </g>
    )
}