import { Navigate } from "react-router-dom";

const ADMIN_ID = "693970f820a140853f8af66f";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");

  if (userId !== ADMIN_ID) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
