import { useState } from 'react';
import './App.css';

import Board from './Board.js';

function App() {
  const [sideLength, setSideLength] = useState(9);

  return (
    <div className="Board">
      <Board sideLength={sideLength} strokeWidth={40/sideLength} size={700} />
      <br />
      <button className="Sidelength" onClick={() => setSideLength(4)}>Set 4x4</button>
      <button className="Sidelength" onClick={() => setSideLength(9)}>Set 9x9</button>
      <button className="Sidelength" onClick={() => setSideLength(16)}>Set 16x16</button>
    </div>
  );
}

export default App;
