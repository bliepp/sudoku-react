import { Link, useLocation } from "react-router-dom";

export default function Navbar({ svgContainerRef, wavefunction }){
    function closeMobileMenu(){
        let nav = document.getElementById("navbarCollapse");
        let btn = document.getElementById("navbarCollapseBtn");
        nav.classList.remove("show");
        btn.classList.add("collapsed");
        btn.ariaExpanded = false;
    }

    function createHandleNew(value){
        const pathRegEx = /^\/(\d*x\d*)\/?/g;
        const matches = [...useLocation().pathname.matchAll(pathRegEx)];
        let isSudoku = matches.length > 0 && wavefunction !== null;

        return function(event){
            closeMobileMenu();

            if (!isSudoku)
            return

        if (matches[0][1] === value){
                event.preventDefault();
                wavefunction.reset();
            }
        }
    }

    function handleSolve(event){
        closeMobileMenu();
        event.preventDefault();

        if (wavefunction === null)
            return

        wavefunction.solve();
    }

    function handleRestore(event){
        closeMobileMenu();
        event.preventDefault();

        if (wavefunction === null)
            return

        wavefunction.loadInitialState();
    }

    function handleDownloadSvg(event){
        closeMobileMenu();
        event.preventDefault();

        const svgNode = svgContainerRef.current?.querySelector("svg");
        if (!svgNode)
            return

        const uri = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(svgNode)], {
            type: 'image/svg+xml;charset=utf-8'
        }));

        let a = document.createElement("a");
        a.href = uri;
        a.download = "sudoku.svg";
        a.click();

        window.URL.revokeObjectURL(uri);
    }

    return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-primary">
        <div className="container-fluid flex-lg-row-reverse">
            <Link className="navbar-brand" onClick={() => closeMobileMenu()} to="/">Sudoku Generator</Link>
            <button className="navbar-toggler" id="navbarCollapseBtn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded={false}><i className="bi bi-plus-lg d-none d-lg-inline" /> New</a>
                        <ul className="dropdown-menu">
                            <li><h6 className="dropdown-header">Choose size</h6></li>
                            <li><Link className="dropdown-item" onClick={createHandleNew("4x4")} to="/4x4/">4x4</Link></li>
                            <li><Link className="dropdown-item" onClick={createHandleNew("9x9")} to="/9x9/">9x9</Link></li>
                            <li><Link className="dropdown-item" onClick={createHandleNew("16x16")} to="/16x16/">16x16</Link></li>
                        </ul>
                    </li>
                    {Boolean(wavefunction) && <>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded={false}>Actions</a>
                        <ul className="dropdown-menu">
                            <li><h6 className="dropdown-header">Choose action</h6></li>
                            <li><a className="dropdown-item" onClick={handleSolve} href="#/">Solve</a></li>
                            <li><a className="dropdown-item" onClick={handleRestore} href="#/">Restore</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded={false}>Export</a>
                        <ul className="dropdown-menu">
                            <li><h6 className="dropdown-header">Choose format</h6></li>
                            <li><a className="dropdown-item" href="#/" onClick={handleDownloadSvg}>SVG</a></li>
                        </ul>
                    </li>
                    </>}
                </ul>
            </div>
        </div>
    </nav>
    );
}
