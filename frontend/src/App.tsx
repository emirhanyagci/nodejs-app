import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostDetails from "./pages/PostDetails";
import { useUserContext } from "./context/UserContext";
import { useEffect } from "react";
import { reLogin } from "./api/authApi";
function App() {
  const navigate = useNavigate();
  const userContext = useUserContext();
  useEffect(() => {
    if (!userContext?.user.isAuth) {
      const jwToken = localStorage.getItem("jwt") as string;
      if (!jwToken) {
        return navigate("/login");
      }
      reLogin(jwToken)
        .then((user) => {
          userContext?.setUserHandler({
            userId: user.userId,
            token: jwToken,
            isAuth: true,
          });
          navigate("/");
        })
        .catch(() => {
          return navigate("/login");
        });
    }
  }, [userContext?.user.isAuth]);
  console.log(userContext?.user.isAuth);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<NavBar />}>
          {userContext?.user.isAuth ? (
            <>
              <Route index element={<Home />}></Route>
              <Route path="/:postId" element={<PostDetails />}></Route>
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </>
          )}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
