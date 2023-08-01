import serverConfig from "../serverConfig.json";

const customerEndpoint = serverConfig.SERVER_URL + "/customers";

export const CustomersAPI = {
  getAllCustomers: () => {
    return fetch(customerEndpoint + "/get");
  },

  getCustomerById: (id) => {
    return fetch(customerEndpoint + "/get" + `/${id}`);
  },

  addNewCustomer: (customer) => {
    return fetch(customerEndpoint + "/post", {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  updateCustomerById: (customer) => {
    return fetch(customerEndpoint + "/update" + `/${customer.id}`, {
      method: "PUT",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  deleteCustomerById: (id) => {
    return fetch(customerEndpoint + "/delete" + `/${id}`, {
      method: "DELETE"
    });
  }
};
