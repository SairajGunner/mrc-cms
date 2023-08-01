import serverConfig from "../serverConfig.json";

const noteEndpoint = serverConfig.SERVER_URL + "/notes";

export const NotesAPI = {
  getAllNotes: () => {
    return fetch(noteEndpoint + "/get");
  },

  getNoteById: (id) => {
    return fetch(noteEndpoint + "/get" + `/${id}`);
  },

  getNotesByCustomerId: (customerId) => {
    return fetch(noteEndpoint + "/get/customer" + `/${customerId}`);
  },

  addNewNote: (note) => {
    return fetch(noteEndpoint + "/post", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  updateNoteById: (note) => {
    return fetch(noteEndpoint + "/update" + `/${note.id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  deleteNoteById: (id) => {
    return fetch(noteEndpoint + "/delete" + `/${id}`, {
      method: "DELETE"
    });
  }
};
