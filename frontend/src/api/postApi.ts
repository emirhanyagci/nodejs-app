import type { Post } from "@/types/post";
export const getPosts = (): Promise<Post[]> => {
  return fetch("http://localhost:8080/feed/posts")
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Failed");
      }
      return res.json();
    })
    .then((res) => {
      return res.posts;
    });
};
