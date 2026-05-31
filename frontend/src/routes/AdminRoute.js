import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

function AdminRoute({ children }) {
  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;