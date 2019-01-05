import axios from "axios";

export default () =>
  axios.create({
    baseURL: "https://api.civicmonitor.com/api/v2/",
    timeout: 1000
    // headers: { "X-Custom-Header": "foobar" }
  });
