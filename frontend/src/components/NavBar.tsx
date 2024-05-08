import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <nav className="container py-4 text-xl flex justify-between items-center">
        <Link to="/" className="">
          NODEJS - REACT
        </Link>
        <div>
          <Button variant="ghost" size="sm" className="text-base">
            Logout
          </Button>
        </div>
      </nav>
      <main className="container  ">
        <Outlet />
      </main>
    </>
  );
}
