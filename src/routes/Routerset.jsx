import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignInView from "../pages/OnBoarding/Sign in/SignInView";
import DashboardLayout from "../pages/Layout/DashboardLayout";

const Routerset = () => {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      {/* -----------------------------basic routes----------------------------- */}
      {/* <Route path="/login" element={<LoginEmail />} />
      <Route path="signup/*" element={<SignUp />}>
        <Route path="" element={<SignUpEmail />} />
        <Route path="sign-up-email" element={<SignUpEmail />} />
        <Route path="email-verification" element={<EmailVerification />} />
      </Route> */}

      {/* -----------------------------private & public routes----------------------------- */}
      {token !== null && token !== "" ? (
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route
            path="pipelines"
            element={<PrivateRoute element={<PipeLines />} requiredRole={13} />}
          />
          <Route
            path="users"
            element={<PrivateRoute element={<Users />} requiredRole={5} />}
          />
          <Route
            path="lead-sources"
            element={
              <PrivateRoute element={<LeadSources />} requiredRole={21} />
            }
          /> */}
        </Route>
      ) : (
        <Route path="*" element={<SignInView />} />
      )}
    </Routes>
  );
};

export default Routerset;

const PublicRoutes = ({ element, allow }) => {
  const { block, user } = useContext(AuthContext);

  if (block) {
    if (allow) {
      if (user?.role === 3) {
        return element;
      } else {
        // return <Navigate to="/unauthorized-error" replace />;
        return element;
      }
    } else {
      return <Navigate to="/subscription-expired" replace />;
    }
  } else {
    return element;
  }
};

const PrivateRoute = ({ element, requiredRole, allow }) => {
  const { userPermissionList, block } = useContext(AuthContext);
  if (block) {
    if (allow) {
      if (userPermissionList.includes(requiredRole)) {
        return element;
      } else {
        return <Navigate to="/unauthorized-error" replace />;
      }
    } else {
      return <Navigate to="/subscription-expired" replace />;
    }
  } else {
    if (userPermissionList.includes(requiredRole)) {
      return element;
    } else {
      return <Navigate to="/unauthorized-error" replace />;
    }
  }
};