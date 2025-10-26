import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Logic for authentication
  //   const { isAuthenticated } = useAuth();
  //   const location = useLocation();

  //   if (!isAuthenticated) {
  //     return <Navigate to="/login" replace state={{ from: location }} />;
  //   }

  return (
    <>
      {/* optional shared UI: header, nav, etc */}
      <Outlet />
    </>
  );
};

export default ProtectedRoute