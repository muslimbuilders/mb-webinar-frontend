/* eslint-disable  */

// First we need to import axios.js
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: "https://secret-woodland-85477.herokuapp.com/api/",
});

// Where you would set stuff like your 'Authorization' header, etc ...


// Also add/ configure interceptors && all the other cool stuff

export default instance;
