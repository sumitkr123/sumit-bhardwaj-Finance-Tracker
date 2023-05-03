import { Link, Outlet } from "react-router-dom";
import "./css/navbar.css";
import { useAuth } from "../../providers/authprovider";
import { useEffect, useState } from "react";

export const NavBar = () => {
  const auth = useAuth();

  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setIsAuth(auth.auth);
    setUserData(auth.user);
  }, [auth]);

  const logout = () => {
    localStorage.removeItem("auth_token");
    auth.setAuth(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="hcontent">
            <div className="logo">
              <img src="/logo192.png" alt="alt" />
             
            </div>

            {userData && (
                <div className="namediv">
                  <h2>Welcome</h2>
                  <h1>{userData.name}</h1>
                </div>
              )}

            <div className="navdiv">
              <nav className="nav">
                <ul className="ul">
                  <li className="li">
                    <Link to={`/`}>Home</Link>
                  </li>
                  <li className="li">
                    <Link to={`/view`}>View</Link>
                  </li>
                  {!isAuth && (
                    <li className="li">
                      <Link to={`/register`}>Sign-up</Link>
                    </li>
                  )}

                  <li className="li">
                    {isAuth ? (
                      <Link to={`/login`} onClick={() => logout()}>
                        Logout
                      </Link>
                    ) : (
                      <Link to={`/login`}>Login</Link>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};
