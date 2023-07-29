import serverConfig from "../serverConfig.json";

const customerEndpoint = serverConfig.SERVER_URL + "/customers";

export const CustomersAPI = {
  getAllCustomers: () => {
    return fetch(customerEndpoint + "/get");
  }
};
