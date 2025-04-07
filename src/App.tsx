import { useRef, useState } from 'react';
import './App.css'
import { SvgRepresentation } from './components'

function App() {
  const [decimalNumber, setDecimalNumber] = useState('0');
  const svgRef = useRef<SVGSVGElement>(null);

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

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;

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
