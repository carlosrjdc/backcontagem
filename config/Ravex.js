require("dotenv").config();
const axios = require("axios");

const Axios = axios.create({
  baseURL: process.env.URL_RAVEX,
  timeout: 5000,
  headers: {
    Authorization: process.env.RAVEX_LG,
  },
});

module.exports = Axios;
