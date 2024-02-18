export default function Navbar({ setSize }){
    function setSizeWrapper(size){
        return function(e){
          e.preventDefault();
          setSize(size);
        };
    }

    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid flex-row-reverse">
            <span className="navbar-brand">Sudoku Generator</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded={false}><i className="bi bi-plus-lg d-none d-lg-inline" /> New</a>
                    <ul className="dropdown-menu">
                        <li><h6 className="dropdown-header">Choose size</h6></li>
                        <li><a className="dropdown-item" href="#/" onClick={setSizeWrapper(4)}>4x4</a></li>
                        <li><a className="dropdown-item" href="#/" onClick={setSizeWrapper(9)}>9x9</a></li>
                        <li><a className="dropdown-item" href="#/" onClick={setSizeWrapper(16)}>16x16</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/" onClick={(e) => e.preventDefault()}>Solve</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#/" role="button" data-bs-toggle="dropdown" aria-expanded={false}>Export</a>
                    <ul className="dropdown-menu">
                        <li><h6 className="dropdown-header">Choose format</h6></li>
                        <li><a className="dropdown-item" href="#/" onClick={(e) => e.preventDefault()}>SVG</a></li>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    );
}
