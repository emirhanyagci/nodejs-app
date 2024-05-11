import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
export default function NavBar() {
  const userContext = useUserContext();
  const isAuth = userContext?.user.isAuth;

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
            <Button variant="ghost" size="sm" className="text-base">
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
