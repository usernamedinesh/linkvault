import { useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const App = () => {

  useEffect(() => {
    const token = localStorage.getItem("linkToken");

    // ✅ If no token, do nothing
    if (!token) return;

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem("linkToken");
      window.location.href = "/auth"
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("linkToken");
      window.location.href = "/auth"
    }
  }, []);

  return (
    <div>
      {/* Your app routes/pages go here */}
    </div>
  );
};

export default App;

