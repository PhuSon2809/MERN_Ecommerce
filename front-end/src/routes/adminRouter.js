import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRouter({ path, component: Component, exact, roles }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return isAuthenticated && user.role === "admin" ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
}

export default AdminRouter;
