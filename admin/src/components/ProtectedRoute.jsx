import { Navigate } from "react-router-dom";

const ADMIN_ID = "6943c51ce254b70220305761";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");

  if (userId !== ADMIN_ID) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
