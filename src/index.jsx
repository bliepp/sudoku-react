import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.scss";
import App from "./App";
import Board from "./Board"

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (<>
                    <h1>Start a new Sudoku</h1>
                    <p className="lead">
                        by clicking on <span style={{"--bs-text-opacity": "0.55"}} className="bg-primary text-light rounded-1 px-2 py-1"><i className="bi bi-plus-lg" /> New</span>
                    </p>
                </>),
            },
            {
                path: "/4x4/",
                element: <Board sideLength={4} strokeWidth={10} size={700} />,
            },
            {
                path: "/9x9/",
                element: <Board sideLength={9} strokeWidth={5} size={700} />,
            },
            {
                path: "/16x16/",
                element: <Board sideLength={16} strokeWidth={3} size={700} />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
