import serverConfig from "../serverConfig.json";

const engagementEndpoint = serverConfig.SERVER_URL + "/engagements";

export const EngagementsAPI = {
  getAllEngagements: () => {
    return fetch(engagementEndpoint + "/get");
  },

  getEngagementById: (id) => {
    return fetch(engagementEndpoint + "/get" + `/${id}`);
  },

  getEngagementsByCustomerId: (customerId) => {
    return fetch(engagementEndpoint + "/get/customer" + `/${customerId}`);
  },

  addNewEngagement: (engagement) => {
    return fetch(engagementEndpoint + "/post", {
      method: "POST",
      body: JSON.stringify(engagement),
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  updateEngagementById: (engagement) => {
    return fetch(engagementEndpoint + "/update" + `/${engagement.id}`, {
      method: "PUT",
      body: JSON.stringify(engagement),
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  deleteEngagementById: (id) => {
    return fetch(engagementEndpoint + "/delete" + `/${id}`, {
      method: "DELETE"
    });
  }
};
