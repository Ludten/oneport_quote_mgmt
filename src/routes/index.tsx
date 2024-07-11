import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import Index from "../pages";
import NewQuote from "../pages/newQuote";
import EditDraftQuote from "../pages/editDraftQuote";
import EditQuote from "../pages/editQuote";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
    // errorElement: </>,
  },
  {
    path: "/newquote/:id",
    element: <NewQuote />,
  },
  {
    path: "/editquote/:id",
    element: <EditQuote />,
  },
  {
    path: "/editdraftquote/:id",
    element: <EditDraftQuote />,
  },
];

const router = createBrowserRouter(routes);

export default router;
