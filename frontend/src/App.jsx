import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import { useSelector } from "react-redux";
import GetCurrentUser from "./hooks/GetCurrentUser";
import Loading from "./components/Loading.jsx";
import TicketRaised from "./pages/TicketRaised.jsx";
import MyTickets from "./pages/MyTickets.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AllTickets from "./pages/admin/AllTickets.jsx";
import AllUsers from "./pages/admin/AllUsers.jsx";
export const serverUrl =
  import.meta.env.VITE_BASE_URL || "http://localhost:8000";

const getDashboardPath = (userData) =>
  userData?.role === "Admin" ? "/admin-dashboard" : "/user-dashboard";

function App() {
  GetCurrentUser();

  const { userData, loading } = useSelector((state) => state.user);
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={userData ? getDashboardPath(userData) : "/login"}
              replace
            />
          }
        />
        <Route
          path="/signup"
          element={
            !userData ? (
              <Signup />
            ) : (
              <Navigate to={getDashboardPath(userData)} replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            !userData ? (
              <Login />
            ) : (
              <Navigate to={getDashboardPath(userData)} replace />
            )
          }
        />
        <Route
          path="/user-dashboard"
          element={
            !userData ? (
              <Navigate to="/login" replace />
            ) : userData.role === "Admin" ? (
              <Navigate
                to="/admin-dashboard"
                replace
                state={{ accessDenied: true }}
              />
            ) : (
              <UserDashboard />
            )
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            userData?.role === "Admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate
                to={userData ? "/user-dashboard" : "/login"}
                replace
                state={{ accessDenied: true }}
              />
            )
          }
        />
        <Route
          path="/all-tickets"
          element={
            userData?.role === "Admin" ? (
              <AllTickets />
            ) : (
              <Navigate
                to={userData ? "/user-dashboard" : "/login"}
                replace
                state={{ accessDenied: true }}
              />
            )
          }
        />
        <Route
          path="/raise-ticket"
          element={
            userData ? <TicketRaised /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/my-tickets"
          element={
            userData?.role === "Admin" ? (
              <Navigate to={"/admin-dashboard"} replace />
            ) : userData ? (
              <MyTickets />
            ) : (
              <Navigate to={"/login"} replace state={{ accessDenied: true }} />
            )
          }
        />

        <Route
          path="/all-users"
          element={
            userData?.role === "Admin" ? (
              <AllUsers/>
            ) : (
              <Navigate
                to={userData ? "/user-dashboard" : "/login"}
                replace
                state={{ accessDenied: true }}
              />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
