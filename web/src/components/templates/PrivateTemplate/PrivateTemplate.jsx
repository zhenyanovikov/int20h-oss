import { Navigate } from "react-router-dom";
import useIsLoggedIn from "../../../hooks/useIsLoggedIn";

function PrivateTemplate({ children }) {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default PrivateTemplate;
