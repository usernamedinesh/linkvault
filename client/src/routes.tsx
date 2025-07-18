import { createBrowserRouter}  from "react-router"
import Home from "./pages/Home";
import AuthPage from "./components/AuthPage";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./components/NewPassword";

const router = createBrowserRouter ([
    {
        path : "/",
        element: <Home />
    },
    {
        path : "/auth",
        element: <AuthPage />
    },
    {
        path : "/forgot-password",
        element: <ForgotPassword />
    },
    //dynamic page for new-password-page
    {
        path : "/new-password/:token",
        element: <NewPassword />
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
