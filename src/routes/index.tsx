import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from 'react-router-dom';
import Index from "../pages";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Index />,
        // errorElement: </>,
    },
];

const router = createBrowserRouter(routes);

export default router;
