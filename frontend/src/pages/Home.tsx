import { getPostCount } from "@/api/postApi";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import UpdateStatus from "@/components/UpdateStatus";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const userContext = useUserContext();
  console.log(userContext?.user);

  useEffect(() => {
    getPostCount(userContext?.user.token).then((res) => {
      setCount(res.count);
    });
  }, []);

  return (
    <div className="flex justify-center items-center gap-4 flex-col w-full">
      <UpdateStatus />
      <Posts />
      <Pagination count={count} />
    </div>
  );
}
