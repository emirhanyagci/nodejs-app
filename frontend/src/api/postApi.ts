import type { Post } from "@/types/post";
export const getPosts = (): Promise<Post[]> => {
  return fetch("http://localhost:8080/feed/posts")
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed");
      }
      return res.json();
    })
    .then((res) => {
      return res.posts;
    });
};
export const createPost = (
  title: string,
  imageUrl: string,
  content: string
) => {
  return fetch("http://localhost:8080/feed/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status !== 200 && res.status !== 201) {
      return res.json().then((err) => {
        throw new Error(err.message);
      });
    }
    return res.json();
  });
};
