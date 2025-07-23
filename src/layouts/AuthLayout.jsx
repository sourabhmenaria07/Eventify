import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function AuthLayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
const { status: authStatus, userData } = useSelector((state) => state.auth);


  useEffect(() => {
  if (authentication && authStatus !== 'loggedIn') {
    navigate("/login");
  }
  else if (authentication && userData && !userData.emailVerification) {
    navigate("/verify-pending")
  }
  else if (!authentication && authStatus === 'loggedIn') {
    navigate("/");
  }

  setLoader(false);
}, [navigate, authStatus, authentication]);

  return loader ? <h2>Loading...</h2> : <>{children}</>;
}

export default AuthLayout;
