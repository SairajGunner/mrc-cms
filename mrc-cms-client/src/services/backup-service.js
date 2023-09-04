import serverConfig from "../serverConfig.json";

const backupEndpoint = serverConfig.SERVER_URL + "/backup";

export const BackupAPI = {
  createBackup: () => {
    return fetch(backupEndpoint + "/update");
  }
};
