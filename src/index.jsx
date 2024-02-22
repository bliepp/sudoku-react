import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.scss";
import App from "./App";
import Board from "./Board"
import Root from "./Root";
import ErrorBoundary from "./ErrorBoundary";

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: "/",
                element: <Root />,
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
            {
                path: "/test/",
                element: (<>
                    Hello
                </>),
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
