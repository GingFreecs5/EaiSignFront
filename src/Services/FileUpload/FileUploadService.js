import http from "./http-common";
import axios from "axios";
class fileUploadService {
  upload = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    return http.post("uploadfile", formData, {});
  };

  saveEnvoloppe = (nom, status, favoris) => {
    return http.post("saveEnveloppe", {
      nom,
      status,
      favoris,
    });
  };
  updateEnveloppe = (id, nom, status, favoris) => {
    return http.put("updateEnveloppe/" + id, {
      nom,
      status,
      favoris,
    });
  };
  saveDocuments = (
    filesname,
    idEnveloppe,
    canalUtilise,
    signataireEmail,
    signataireNom,
    signatairePrenom,
    copyFiles
  ) => {
    const files = filesname;
    return http.post("saveDocuments", {
      files,
      idEnveloppe,
      canalUtilise,
      signataireEmail,
      signataireNom,
      signatairePrenom,
      copyFiles,
    });
  };
  copyFiles = (filesname, idEnveloppe) => {
    const files = filesname;
    return http.post("copyFiles", {
      files,
      idEnveloppe,
    });
  };
  getEnveloppes = (accessToken) => {
    return axios.get("http://localhost:8080/api/v1/files/enveloppes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  };
  getFilesbyEnvId = (envId) => {
    return http.post("files/" + envId);
  };
  updateEnveloppeStatus = (name) => {
    return http.post("updateEnvStatus" + name);
  };
  deleteEnveloppe = (id) => {
    return http.delete("delete/enveloppe/" + id);
  };
  deleteEnveloppes = (envIds) => {
    let formData = new FormData();
    formData.append("envIds", envIds);
    return http.post("delete/enveloppes", envIds);
  };
  deleteFiles = (files) => {
    let formData = new FormData();
    formData.append("files", files);
    return http.post("delete/files", formData);
  };
  delete = (name) => {
    const isDocdeleted = false;
    return http.post(`delete/` + name + "/" + isDocdeleted);
  };
  getFiles = () => {
    return http.get("files");
  };
  deleteDocumentsbyEnvId = (envId) => {
    return http.delete("delete/documents/" + envId);
  };
}

export default new fileUploadService();
