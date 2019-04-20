import * as axios from "axios";
import * as ET from '../core';

class FunctionRoute {
  constructor(action) {
      this.action = action;
      this.fullUrl = "/" + controller + (action ? "/" + action : '');
  }
}

const instance = axios.default;

async function get(route) {
  return (await instance.get(makeUrl(routeData, queryString), config)).data;
};

async function post(route, payload) {
  return (await instance.post(makeUrl(routeData), payload, config)).data;
};

function makeUrl(
  routeData
) {
  const baseUrl = ET.Configuration.api;
  let url = `${baseUrl}api${routeData.url()}`;

  return url;
}

export default {
  FunctionRoute,
  get,
  post
};