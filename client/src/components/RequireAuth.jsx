import { useLocation, Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  let location = useLocation();

  if (!sessionStorage.getItem("access")) {
    return <Navigate to="/loginpage" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
