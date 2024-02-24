import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

export default function App() {
    const mainRef = useRef(null);
    const [wavefunction, setWavefunction] = useState(null);

    return (
        <>
            <Navbar svgContainerRef={mainRef} wavefunction={wavefunction} />
            <main ref={mainRef} className="container-fluid text-center vh-100 pt-5">
                <Outlet context={setWavefunction} />
            </main>
        </>
    );
}
