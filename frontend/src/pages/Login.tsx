import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../api/authApi";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useUserContext();
  const navigate = useNavigate();
  function loginHandler() {
    login(email, password)
      .then((res) => {
        userContext?.setUserHandler({
          userId: res.user._id,
          isAuth: true,
          token: res.token,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={loginHandler} className="w-full">
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
