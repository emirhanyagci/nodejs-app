import { getPostCount } from "@/api/postApi";
import NewPost from "@/components/NewPost";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import UpdateStatus from "@/components/UpdateStatus";
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    getPostCount().then((res) => {
      setCount(res.count);
    });
  }, []);
  return (
    <div className="flex justify-center items-center gap-4 flex-col w-full">
      <UpdateStatus />
      <NewPost />
      <Posts />
      <Pagination count={count} />
    </div>
  );
}
