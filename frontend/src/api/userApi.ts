const baseUrl = import.meta.env.VITE_URL;

export const getStatus = (token: string | undefined) => {
  return fetch(`${baseUrl}/user/status`, {
    headers: {
      Authorization: "Bearer " + token,
    },
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

export const updateStatus = (status: string, token: string | undefined) => {
  return fetch(`${baseUrl}/user/update-status`, {
    method: "PATCH",
    body: JSON.stringify({
      status,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        return res.json().then((err) => {
          throw new Error(err.message);
        });
      }
      console.log("nooo");

      return res.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
