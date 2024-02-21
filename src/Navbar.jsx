import { Link, useLocation } from "react-router-dom";

export default function Navbar({ exportRef }){
    function forceRefresh(value){
        const pathRegEx = /^\/(\d*x\d*)\/?/g;
        const matches = [...useLocation().pathname.matchAll(pathRegEx)];
        let isSudoku = matches.length > 0;

        return function(event){
            closeMobileMenu();

            if (!isSudoku)
                return

            if (matches[0][1] === value){
                event.preventDefault();
                window.location.reload();
            }
        }
    }

    function closeMobileMenu(){
        let nav = document.getElementById("navbarCollapse");
        let btn = document.getElementById("navbarCollapseBtn");
        nav.classList.remove("show");
        btn.classList.add("collapsed");
        btn.ariaExpanded = false;
    }

    return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-primary">
        <div className="container-fluid flex-lg-row-reverse">
            <Link className="navbar-brand" to="/">Sudoku Generator</Link>
            <button className="navbar-toggler" id="navbarCollapseBtn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded={false}><i className="bi bi-plus-lg d-none d-lg-inline" /> New</a>
                        <ul className="dropdown-menu">
                            <li><h6 className="dropdown-header">Choose size</h6></li>
                            <li><Link className="dropdown-item" onClick={forceRefresh("4x4")} to="/4x4/">4x4</Link></li>
                            <li><Link className="dropdown-item" onClick={forceRefresh("9x9")} to="/9x9/">9x9</Link></li>
                            <li><Link className="dropdown-item" onClick={forceRefresh("16x16")} to="/16x16/">16x16</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded={false}>Actions</a>
                        <ul className="dropdown-menu">
                            <li><h6 className="dropdown-header">Choose action</h6></li>
                            <li><a className="dropdown-item" onClick={() => closeMobileMenu()} href="#/">Solve</a></li>
                            <li><a className="dropdown-item" onClick={() => closeMobileMenu()} href="#/">Restore</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded={false}>Export</a>
                        <ul className="dropdown-menu">
                            <li><h6 className="dropdown-header">Choose format</h6></li>
                            <li><a className="dropdown-item" href="#/" onClick={(e) => {
                                e.preventDefault();
                                closeMobileMenu();

                                if (!exportRef.current) {
                                    console.warn("Main object not found");
                                    return
                                }

                                const svgDom = exportRef.current.querySelector("svg");
                                if (!svgDom) {
                                    console.warn("No svg object to export");
                                    return
                                }

                                console.log(svgDom);
                            }}>SVG</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}
