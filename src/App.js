import { useState } from 'react';
import './App.css';

import Board from './Board.js';

function App() {
  const [sideLength, setSideLength] = useState(9);

  function chooseSize(size){
    return function(e){
      e.preventDefault();
      setSideLength(size);
    };
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Sudoku Generator</span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/" onClick={(e) => e.preventDefault()}>Solve</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/" onClick={(e) => e.preventDefault()}>Reset</a>
          </li>
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded={false}>Size: { sideLength }x{sideLength}</a>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                <li><h6 class="dropdown-header">Choose your size</h6></li>
                <li><a className="dropdown-item" href="#/" onClick={chooseSize(4)}>4x4</a></li>
                <li><a className="dropdown-item" href="#/" onClick={chooseSize(9)}>9x9</a></li>
                <li><a className="dropdown-item" href="#/" onClick={chooseSize(16)}>16x16</a></li>
              </ul>
          </li>
        </ul>
      </div>
    </nav>
    <div className="Board">
      <Board sideLength={sideLength} strokeWidth={40/sideLength} size={700} />
    </div>
    </>
  );
}

export default App;
