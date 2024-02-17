import { useState } from 'react';
import './App.css';

import Board from './Board.js';
import Navbar from './Navbar.js';

function App() {
  const [sideLength, setSideLength] = useState(9);

  return (
    <>
    <Navbar setSize={setSideLength} />
    <main id="Board" className="container-fluid text-center mt-5">
      <Board sideLength={sideLength} strokeWidth={40/sideLength} size={700} />
    </main>
    </>
  );
}

export default App;
