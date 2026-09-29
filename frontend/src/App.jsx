import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import { useSelector } from "react-redux";
import GetCurrentUser from "../hooks/GetCurrentUser.jsx";
export const serverUrl =
  import.meta.env.VITE_BASE_URL || "http://localhost:8000";

function App() {
  GetCurrentUser();

  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={userData ? "/user-dashboard" : "/login"} replace />
          }
        />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to={"/user-dashboard"} />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to={"/user-dashboard"} />}
        />
        <Route
          path="/user-dashboard"
          element={
            userData ? <UserDashboard /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
