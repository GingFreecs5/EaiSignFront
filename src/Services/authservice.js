import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

class AuthService {
  async login(email, password, checked) {
    const response = await axios.post(API_URL + "signin", {
      email,
      password,
    });
    if (response.data.accessToken) {
      if (checked) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("checked ");
      } else {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async checkEmail(email) {
    return axios.post(API_URL + "checkEmail", {
      email,
    });
  }

  signup(nom, prenom, email, num_telephone, piece_justicatif, password) {
    return axios.post(API_URL + "signup", {
      nom,
      prenom,
      email,
      num_telephone,
      piece_justicatif,
      password,
    });
  }
  createFolder(id) {
    return axios.post(API_URL + "createfolder/" + id);
  }
}

export default new AuthService();
