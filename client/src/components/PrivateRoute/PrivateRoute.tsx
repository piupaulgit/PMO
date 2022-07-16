import { Navigate, useLocation } from "react-router-dom";
import Utilities from '../../Services/helpers/utilities';


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const authRoutes = [
        'Login',
        'Register',
        'ForgotPassword',
        'SetPassword',
    ]
    
    const auth = Utilities.isValidUser();
    let location = useLocation();
  
    if (!auth) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If user logged in and trying to access auth routes then redirect to dashboard page
    if (auth && authRoutes.includes(children.type.name)) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
  
    return children;
}

export default PrivateRoute;