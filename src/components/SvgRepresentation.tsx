import { forwardRef, ReactElement } from "react";
import config from "../config";

/**
 * A record of SVG line elements representing different line segments.
 * Each key in the record corresponds to a unique identifier for a line,
 * and the value is a ReactElement representing an SVG `<line>` element.
 */
const lines: Record<string, ReactElement> = {
  "a": <line key="A" data-title="top horizontal" x1="50" y1="20" x2="150" y2="20" stroke="gray" strokeWidth="10" strokeLinecap="round" />,
  "b": <line key="B" data-title="right vertical" x1="150" y1="20" x2="150" y2="130" stroke="gray" strokeWidth="10" strokeLinecap="round" />,
  "d": <line key="D" data-title="middle horizontal" x1="50" y1="135" x2="150" y2="135" stroke="gray" strokeWidth="10" strokeLinecap="round" />,
  "e": <line key="E" data-title="diagonal \" x1="50" y1="20" x2="150" y2="130" stroke="gray" strokeWidth="10" strokeLinecap="round" />,
  "f": <line key="F" data-title="diagonal /" x1="150" y1="20" x2="50" y2="130" stroke="gray" strokeWidth="10" strokeLinecap="round" />,
}

interface SvgRepresentationProps {
  number: string;
}

export const SvgRepresentation = forwardRef<SVGSVGElement, SvgRepresentationProps>(({ number }: SvgRepresentationProps, svgRef) => {
  /**
   * Transforms a given number into an array of SVG elements based on a predefined configuration.
   *
   * @param number - A string representing the number to be transformed.
   * @returns An array of React elements representing the SVG lines corresponding to the given number.
   *          If the number is not found in the configuration, returns an empty array.
   */
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

  /**
   * Computes the transformation properties for an element based on the given order.
   *
   * @param order - A number representing the order of the transformation.
   *                - If `order % 2 === 0`, the element is not flipped horizontally.
   *                - If `order % 2 !== 0`, the element is flipped horizontally.
   *                - If `order > 1`, the element is flipped vertically.
   */
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
        <line id="baseline" data-title="left vertical" x1="50" y1="350" x2="50" y2="20" stroke="gray" strokeWidth="10" strokeLinecap="round" />
        {number.split('').reverse().map((num, order) => <g key={`${num}_${order}`} data-number={num} style={getTransform(order)}>{transformToSvg(num)}</g>)}
      </g>
    </svg>
  )
})