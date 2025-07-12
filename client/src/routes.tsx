import { createBrowserRouter}  from "react-router"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const router = createBrowserRouter ([
    {
        path : "/",
        element: <Home />
    },
     {
        path : "/login",
        element: <Login />
    },
    {
        path : "/signup",
        element: <Signup />
    },
    {
        path: "*",
        element : (
            <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
                <h1 className="text-4xl font-bold text-red-500">
                    404 - Page Not Found
                </h1>
            </div>
        )
    }
])

export default router;
