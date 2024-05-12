import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { getPosts } from "@/api/postApi";
import type { Post } from "@/types/post";

import { useSearchParams } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import NewPost from "./NewPost";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>();
  const [searchParams] = useSearchParams();
  const userContext = useUserContext();
  const token = userContext?.user.token;
  useEffect(() => {
    const page = searchParams.get("page") || 1;

    getPosts(+page, token)
      .then((posts) => {
        console.log(posts);

        setPosts(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParams]);

  return (
    <section className="w-full space-y-5 ">
      <div className="flex justify-center">
        <NewPost setPosts={setPosts} />
      </div>
      <div className="space-y-5">
        {posts?.map((post) => {
          return <PostItem key={post._id} post={post} setPosts={setPosts} />;
        })}
      </div>
    </section>
  );
}
// calc count of the posts
// count of the post  s
