import { useRef, useState } from 'react';
import './App.css'
import { SvgRepresentation } from './components'

function App() {
  const [decimalNumber, setDecimalNumber] = useState('0');
  const svgRef = useRef<SVGSVGElement>(null);

  /**
   * Handles the download of an SVG element as a file.
   *
   * This function serializes the current SVG element referenced by `svgRef`,
   * creates a Blob object from the serialized SVG data, and generates a
   * downloadable link for the user. The downloaded file is named using the
   * format `runes_<decimalNumber>.svg`.
   */
  const handleDownload = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `runes_${decimalNumber}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Handles the change event for a number input field.
   * Ensures the input value is clamped between 0 and 9999 and updates the state with the clamped value.
   */
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value || '0';

    const clampedNumber = Math.max(0, Math.min(9999, parseInt(number)));
    setDecimalNumber(clampedNumber.toString());
  }

  return (
    <main className='main'>
      <SvgRepresentation number={decimalNumber} ref={svgRef} />
      <input
        className='number-input'
        type="number"
        onChange={handleNumberChange}
        value={decimalNumber}
      />
      <button onClick={handleDownload}>Download SVG</button>
    </main>
  )
}

export default App
