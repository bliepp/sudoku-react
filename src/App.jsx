import { useRef } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

export default function App() {
    const mainRef = useRef(null);

    return (
        <>
            <Navbar exportRef={mainRef} />
            <main ref={mainRef} id="Board" className="container-fluid text-center mt-5">
                <Outlet />
            </main>
        </>
    );
}
