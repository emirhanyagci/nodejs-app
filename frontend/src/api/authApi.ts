export const signup = (email: string, name: string, password: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("name", name);
  return fetch("http://localhost:8080/signup", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (res.status === 422) {
        throw new Error("Validation failed. Make sure email address not exist");
      }
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Signup failed");
      }
      return res.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
export const login = (email: string, password: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  return fetch("http://localhost:8080/login", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Login failed");
      }
      return res.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
