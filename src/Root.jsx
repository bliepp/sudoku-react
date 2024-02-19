export default function Root(){
    return (
        <>
            <div className="mb-5"></div>
            <h1 className="lead fs-1">Create a new Sudoku</h1>
            <p className="lead">
                by clicking on <span style={{"--bs-text-opacity": "0.55"}} className="bg-primary text-light rounded-1 px-2 py-1 d-lg-inline d-none"><i className="bi bi-plus-lg" /> New</span>
                <span className="d-lg-none d-inline">
                    <span style={{"--bs-text-opacity": "0.55"}} className="bg-primary text-light rounded-1 px-2 py-1"><i className="bi bi-list" /></span> and then on <span style={{"--bs-text-opacity": "0.55"}} className="bg-primary text-light rounded-1 px-2 py-1">New</span>
                </span>
            </p>
        </>
    );
}
