import { getPostCount } from "@/api/postApi";
import NewPost from "@/components/NewPost";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import UpdateStatus from "@/components/UpdateStatus";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const userContext = useUserContext();
  useEffect(() => {
    if (!userContext?.user.isAuth) {
      return navigate("/login");
    }
    getPostCount(userContext?.user.token).then((res) => {
      console.log(res);

      setCount(res.count);
    });
  }, []);
  if (!userContext?.user.isAuth) {
    return <div>Redirecting to login page</div>;
  }
  return (
    <div className="flex justify-center items-center gap-4 flex-col w-full">
      <UpdateStatus />
      <NewPost />
      <Posts />
      <Pagination count={count} />
    </div>
  );
}
