import { useMemo } from "react";

export default function Cell({ x, y, size, strokeWidth, possibilities, onClick }){
    const innerSize = size - strokeWidth;
    const sideLength = useMemo(
        () => Math.ceil(Math.sqrt(possibilities.length)),
        [possibilities]
    );

    return (
        <g>
            <rect
                x={x + strokeWidth/2} y={y + strokeWidth/2}
                width={innerSize} height={innerSize}
                stroke="black" strokeWidth={strokeWidth} fill="None"
            />
            {
                possibilities.map((value, index) => {
                    let new_x = x + size/2 + (index % sideLength - 0.5*sideLength + 0.5)*size/sideLength;
                    let new_y = y + size/2 + (Math.floor(index/sideLength) - 0.5*sideLength + 0.5)*size/sideLength;
                    return (
                        <text key={index}
                            onClick={() => {onClick(value)}}
                            x={new_x} y={new_y}
                            textAnchor="middle" dominantBaseline="central" fontSize={possibilities.length > 1 ? size/(2*sideLength) : size/2}
                        >
                            {possibilities.length > 1 && <>&nbsp;</>}
                            { value }
                            {possibilities.length > 1 && <>&nbsp;</>}
                        </text>
                    );
                })
            }
        </g>
    )
}
