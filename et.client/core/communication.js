import * as axios from "axios";
import * as ET from '../core';

class FunctionRoute {
  constructor(action) {
      this.action = action;
      this.fullUrl = "/" + action;
  }
}

const instance = axios.default;

function get(route) {
  return axios.get(makeUrl(route));
};

function post(route, payload) {
  return axios.post(makeUrl(route), payload);
};

function makeUrl(
  route
) {
  const baseUrl = ET.Configuration.api;
  let url = `${baseUrl}/api${route.fullUrl}`;

  return url;
}

export default {
  FunctionRoute,
  get,
  post
};