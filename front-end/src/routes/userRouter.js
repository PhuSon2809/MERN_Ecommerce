import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function UserRouter({ path, component: Component, exact, roles }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return isAuthenticated && user.role === "user" ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
}

export default UserRouter;
