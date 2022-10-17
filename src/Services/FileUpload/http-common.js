import axios from "axios";
import authHeader from "../authheader";
export default axios.create({
  baseURL: "http://localhost:8080/api/v1/files/",

  headers: authHeader(),
  "Content-type": "application/json",
});
