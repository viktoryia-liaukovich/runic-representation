import { forwardRef, ReactElement } from "react";
import config from "../config.json";

const lines: Record<string, ReactElement> = {
  "a": <line id="A" data-title="top horizontal" x1="50" y1="20" x2="150" y2="20" stroke="gray" stroke-width="10" stroke-linecap="round" />,
  "b": <line id="B" data-title="right vertical" x1="150" y1="20" x2="150" y2="130" stroke="gray" stroke-width="10" stroke-linecap="round" />,
  "d": <line id="D" data-title="middle horizontal" x1="50" y1="135" x2="150" y2="135" stroke="gray" stroke-width="10" stroke-linecap="round" />,
  "e": <line id="E" data-title="diagonal \" x1="50" y1="20" x2="150" y2="130" stroke="gray" stroke-width="10" stroke-linecap="round" />,
  "f": <line id="F" data-title="diagonal /" x1="150" y1="20" x2="50" y2="130" stroke="gray" stroke-width="10" stroke-linecap="round" />,
}

interface SvgRepresentationProps {
  number: string;
}

export const SvgRepresentation = forwardRef<SVGSVGElement, SvgRepresentationProps>(({ number }: SvgRepresentationProps, svgRef) => {

  const transformToSvg = (number: string) => {
    const array = config[number as keyof typeof config];

    return array && Object.keys(lines).reduce((acc, lineId) => {
      if (array.includes(lineId)) {
        return [...acc, lines[lineId]];
      } else {
        return acc;
      }
    }, [] as ReactElement[]);
  }

  const getTransform = (order: number) => {
    const scaleX = (order % 2) * -1 || 1;
    const scaleY = order > 1 ? -1 : 1;
    return {
      transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
      transformOrigin: order > 1 ? '50px 185px' : '50px 20px'
    }
  }

  return (
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
      <g transform="translate(150, 0)">
        <line id="baseline" data-title="left vertical" x1="50" y1="350" x2="50" y2="20" stroke="gray" stroke-width="10" stroke-linecap="round" />
        {number.split('').reverse().map((num, order) => <g data-number={num} style={getTransform(order)}>{transformToSvg(num)}</g>)}
      </g>
    </svg>
  )
})