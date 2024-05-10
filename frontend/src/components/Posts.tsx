import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { getPosts } from "@/api/postApi";
import type { Post } from "@/types/post";

import { useSearchParams } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page") || 1;
    getPosts(+page).then((posts) => {
      console.log(posts);

      setPosts(posts);
    });
  }, [searchParams]);

  return (
    <div className="w-full space-y-5">
      {posts?.map((post) => {
        return <PostItem key={post._id} post={post} />;
      })}
    </div>
  );
}
// calc count of the posts
// count of the post  s
