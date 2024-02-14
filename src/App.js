import './App.css';

import Board from './Board.js';

function App() {
  return (
    <div className="Board">
      <Board sidelength={9} strokeWidth={10} />
    </div>
  );
}

export default App;
