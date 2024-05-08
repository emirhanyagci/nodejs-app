import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { getPosts } from "@/api/postApi";
import type { Post } from "@/types/post";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);
  return (
    <div className="w-full">
      {posts?.map((post) => {
        return <PostItem key={post._id} post={post} />;
      })}
    </div>
  );
}
