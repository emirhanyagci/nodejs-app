import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
export default function NavBar() {
  const navigate = useNavigate();
  const userContext = useUserContext();
  const isAuth = userContext?.user.isAuth;
  function logoutHandler() {
    userContext?.logoutHandler();
    navigate("/login");
  }
  return (
    <>
      <nav className="container py-4 text-xl flex justify-between items-center">
        <Link to="/" className="">
          NODEJS - REACT
        </Link>
        <div>
          {!isAuth ? (
            <>
              <Button variant="ghost" size="sm" className="text-base" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-base" asChild>
                <Link to="/signup">Signup</Link>
              </Button>
            </>
          ) : (
            <Button
              onClick={logoutHandler}
              variant="ghost"
              size="sm"
              className="text-base"
            >
              Logout
            </Button>
          )}
        </div>
      </nav>
      <main className="container  ">
        <Outlet />
      </main>
    </>
  );
}
