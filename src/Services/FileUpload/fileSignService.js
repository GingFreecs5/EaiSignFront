import axios from "axios";
const API_URL =
  "http://172.31.250.15:5020/ws-signing/api/v2.2/transactions?inputInline=true&outputInline=true";
const xapp_token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImE3NWQ0OTJkLTI4MWUtNGNiMC1hZjZlLTg2NGE5MGI0ZWU0ZiJ9.eyJzdWIiOiIxMCIsImF1ZCI6ImFkbWluIiwiYXBwSWRzIjpbIjEwIl0sIm9yZ0lkcyI6WyI1Il0sImF1dGhfdGltZSI6MTY1Njk0MjQyNywiYXBwSWQiOiIxMCIsImlzcyI6IkdBSUFfSVAvd3Mtb3BlbmlkL2FkbWluIiwidGVuYW50SWQiOiJkZWZhdWx0Iiwic2NvcGVzIjpbIlJPTEVfQVBQTElDQVRJT04iXSwiZXhwIjoxNjY0ODM4MDAwLCJpYXQiOjE2NTY5NDI0MjcsImp0aSI6IjdhZmRiYzg2LTQyZWQtNDI4NS1hZmNkLWY5YTQ3NWI4ZWFhNCJ9.HIGZ07X8nB-zVEWsD36AH8IpLQkuRV_FXcgF4LocPncBBV1vvmRoAiZDCe9spEn_KzNRY6K6q-KU7OcaC7zI9lvawHs-IYIp7RahKh68kXgOSDGVAxl9VQ0bSnlmEVPx4OccLBfcHcOSn987K498G0Ur8BiPi1os5LsscE-a01WGBgzPmAUEav9FMejbTa1DQrSES7JK9quqw0O56FOBlCFz8QCl0dEqdIc1FuJxMBD6NuTLjT_x6ovh4oeswD7rb-D0ZUHrRHut8fpg5E83HtF86KiNzScrQNWIT_ZRfo7vyC_wVJbeCwzl0oCVPOCF8CQNmCMeTeDyoQ4wuegpow";
class FileSignService {
  async signFile01(files) {
    const usageId = "e653e578-e008-11eb-8d51-0050568aa089";
    const taskName = "sigOOB01";
    const language = "fr";
    const formData = new FormData();
    formData.append("usageId", usageId);
    formData.append("taskName", taskName);
    formData.append("language", language);

    for (let i = 0; i < files.length; i++) {
      if (i === 0) {
        formData.append("pdfB64", files[i].b64);
      } else {
        formData.append("pdfB64_" + (i + 1), files[i].b64);
      }
    }

    const object = {};
    formData.forEach((value, key) => (object[key] = value));
    const json = JSON.stringify(object);
    return axios.post(API_URL, json, {
      headers: {
        "Content-Type": "application/json",
        xapp_token: xapp_token,
      },
    });
  }

  async signFile02(email, transactionid, channel_) {
    const taskName = "sigOOB02";
    const validateConditions = true;
    const formData = new FormData();
    formData.append("taskName", taskName);
    formData.append("channel", channel_);
    formData.append("validateConditions", validateConditions);
    formData.append("reference", email);
    const object = {};
    formData.forEach((value, key) => (object[key] = value));
    const json = JSON.stringify(object);

    return axios.post(
      "http://172.31.250.15:5020/ws-signing/api/v2.2/transactions/" +
        transactionid +
        "/tasks?inputInline=true&outputInline=true",
      json,
      {
        headers: {
          "Content-Type": "application/json",
          xapp_token: xapp_token,
        },
      }
    );
  }

  async signFile03(otp_, pjList, transactionid, channel) {
    const taskName = "sigOOB03";
    const resend = "false";
    const formData = new FormData();
    formData.append("taskName", taskName);
    formData.append("channel", channel);
    formData.append("resend", resend);
    formData.append("otp", otp_);
    formData.append("pjList", pjList);
    const object = {};
    formData.forEach((value, key) => (object[key] = value));
    const json = JSON.stringify(object);
    return axios.post(
      "http://172.31.250.15:5020/ws-signing/api/v2.2/transactions/" +
        transactionid +
        "/tasks?inputInline=true&outputInline=true",
      json,
      {
        headers: {
          "Content-Type": "application/json",
          xapp_token: xapp_token,
        },
      }
    );
  }
}
export default new FileSignService();
