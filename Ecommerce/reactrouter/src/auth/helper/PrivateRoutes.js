import { Navigate } from "react-router-dom";
import { isAuthenticated } from ".";


const PrivateRoute = ({ Component }) => {
 
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;