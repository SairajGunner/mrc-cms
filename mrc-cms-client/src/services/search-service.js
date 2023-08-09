import serverConfig from "../serverConfig.json";

const searchEndpoint = serverConfig.SERVER_URL + "/search";

export const SearchAPI = {
  search: (query) => {
    return fetch(searchEndpoint + `/${query}`);
  }
};
