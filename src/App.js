import { useState } from "react";

import Board from "./Board";
import Navbar from "./Navbar";

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
