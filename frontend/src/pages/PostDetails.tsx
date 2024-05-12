import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";
import { getPost } from "../api/postApi";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../types/post";
import { useUserContext } from "@/context/UserContext";
export default function PostDetails() {
  const [post, setPost] = useState<Post | null>();
  const { postId } = useParams();
  const navigate = useNavigate();
  const userContext = useUserContext();
  if (!postId) {
    navigate("/");
  }
  useEffect(() => {
    getPost(postId as string, userContext?.user.token)
      .then((res) => {
        console.log(res);

        setPost({
          ...res.post,
          imageUrl: `${import.meta.env.VITE_URL}/${res.post.imageUrl}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!post) return <p>Loading</p>;
  return (
    <article className="space-y-3 flex justify-center flex-col items-center">
      <h2 className="text-2xl">{post.title}</h2>
      <div className="flex gap-4">
        <Badge variant="secondary">Created by {post.creator.name}</Badge>
        <Badge variant="secondary">
          Created at
          {new Date(post.createdAt).toLocaleDateString()}
        </Badge>
      </div>
      <img width="300px" src={post.imageUrl} alt="" />
      <p className="text-[hsl(217.2 32.6% 17.5%)]">{post.content}</p>
    </article>
  );
}
