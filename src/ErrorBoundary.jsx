import { useLocation, useRouteError } from "react-router-dom"

import Navbar from "./Navbar";

export default function ErrorBoundary(){
    const error = useRouteError();
    const location = useLocation();

    return (<>
        <Navbar />
        <main className="container-fluid text-center vh-100 pt-5">
            <div className="mb-5"></div>
            <h1 className="lead fs-1">{`Error ${error.status} on '${location.pathname}'`}</h1>
            <p className="lead">
                { error.statusText}
            </p>
        </main>
    </>)
}
