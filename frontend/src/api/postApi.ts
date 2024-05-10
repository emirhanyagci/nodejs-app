import type { Post } from "@/types/post";
export const getPosts = (page: number): Promise<Post[]> => {
  return fetch(`http://localhost:8080/feed/posts/${page}`)
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
export const getPost = (postId: string) => {
  return fetch(`http://localhost:8080/feed/post/${postId}`)
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        res.json().then((err) => {
          throw new Error(err.message);
        });
      }

      return res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });
};
export const createPost = (title: string, image: File, content: string) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);
  formData.append("content", content);
  console.log(formData);

  return fetch("http://localhost:8080/feed/post", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      }
      return res.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
export const updatePost = (
  postId: string,
  title: string,
  image: File | null,
  content: string
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (image) {
    formData.append("image", image);
  }
  return fetch(`http://localhost:8080/feed/post/edit/${postId}`, {
    method: "PATCH",
    body: formData,
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        res.json().then((err) => {
          throw new Error(err.message);
        });
      }

      return res.json();
    })
    .catch((err) => {
      throw new Error(err);
    });
};
export const deletePost = (postId: string) => {
  console.log(postId);

  return fetch(`http://localhost:8080/feed/post/delete/${postId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        res.json().then((err) => {
          throw new Error(err.message);
        });
      }
      return res.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
export const getPostCount = () => {
  return fetch("http://localhost:8080/feed/post/count")
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        res.json().then((err) => {
          throw new Error(err.message);
        });
      }
      return res.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
