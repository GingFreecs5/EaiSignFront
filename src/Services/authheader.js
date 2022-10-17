const asyncLocalStorage = {
  setItem: async function (key, value) {
    await Promise.resolve();
    localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await Promise.resolve();
    return localStorage.getItem(key);
  },
};
export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    user = JSON.parse(sessionStorage.getItem("user"));
  }
  if (user && user.accessToken) {
    // For Spring Boot back-end
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
