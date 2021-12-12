import baseUrl from "../config";

const create = (bugs) => {
  return fetch(`${baseUrl}/api/bugs`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bugs),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const listBugs = () => {
  return fetch(`${baseUrl}/api/bugs`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const read = (params, token) => {
  return fetch(`${baseUrl}/api/bugs/${params.id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.t,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const update = (params, token, bugs) => {
  console.log(bugs);
  return fetch(`${baseUrl}/api/bugs/${params.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.t,
    },
    body: JSON.stringify(bugs),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const removeBug = (params) => {
  return fetch(`${baseUrl}/api/bugs/${params}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export { create, listBugs, read, update, removeBug };
