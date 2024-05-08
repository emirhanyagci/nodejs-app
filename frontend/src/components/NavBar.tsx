import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <>
      <nav className="container py-4 text-xl flex justify-between items-center">
        <div className="">NODEJS - REACT</div>
        <div>
          <Button variant="ghost" size="sm" className="text-base">
            Logout
          </Button>
        </div>
      </nav>
      <main className="container ">
        <Outlet />
      </main>
    </>
  );
}
