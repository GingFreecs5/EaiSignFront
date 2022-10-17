import axios from "axios";

const API_URL =
  "http://172.31.250.15:5020/ws-signing/api/v2.2/transactions?inputInline=true&outputInline=true";
const xapp_token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImE3NWQ0OTJkLTI4MWUtNGNiMC1hZjZlLTg2NGE5MGI0ZWU0ZiJ9.eyJzdWIiOiIxMCIsImF1ZCI6ImFkbWluIiwiYXBwSWRzIjpbIjEwIl0sIm9yZ0lkcyI6WyI1Il0sImF1dGhfdGltZSI6MTY1Njk0MjQyNywiYXBwSWQiOiIxMCIsImlzcyI6IkdBSUFfSVAvd3Mtb3BlbmlkL2FkbWluIiwidGVuYW50SWQiOiJkZWZhdWx0Iiwic2NvcGVzIjpbIlJPTEVfQVBQTElDQVRJT04iXSwiZXhwIjoxNjY0ODM4MDAwLCJpYXQiOjE2NTY5NDI0MjcsImp0aSI6IjdhZmRiYzg2LTQyZWQtNDI4NS1hZmNkLWY5YTQ3NWI4ZWFhNCJ9.HIGZ07X8nB-zVEWsD36AH8IpLQkuRV_FXcgF4LocPncBBV1vvmRoAiZDCe9spEn_KzNRY6K6q-KU7OcaC7zI9lvawHs-IYIp7RahKh68kXgOSDGVAxl9VQ0bSnlmEVPx4OccLBfcHcOSn987K498G0Ur8BiPi1os5LsscE-a01WGBgzPmAUEav9FMejbTa1DQrSES7JK9quqw0O56FOBlCFz8QCl0dEqdIc1FuJxMBD6NuTLjT_x6ovh4oeswD7rb-D0ZUHrRHut8fpg5E83HtF86KiNzScrQNWIT_ZRfo7vyC_wVJbeCwzl0oCVPOCF8CQNmCMeTeDyoQ4wuegpow";
axios.interceptors.request.use(
  (config) => {
    config.headers.xapp_token = xapp_token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
class OtpService {
  async creation_identite(
    reference,
    email,
    family_name,
    name,
    phone_number,
    docValue
  ) {
    const usageId = "1fbbf557-e002-11eb-8d51-0050568aa089";
    const taskName = "getIdentityInformation";
    const topValidity = "N";
    const docType = "cin";
    const reference_checker = "REF_CH_2";
    const name_checker = "NAME_CH2";
    const family_name_checker = "FAMMILY NAME_CH2";
    const email_checker = "EMAIL_CH2@oxyliom.com";
    console.log(docValue);

    return axios.post(API_URL, {
      usageId,
      taskName,
      reference,
      family_name,
      name,
      email,
      phone_number,
      docType,
      docValue,
      topValidity,
      reference_checker,
      name_checker,
      family_name_checker,
      email_checker,
    });
  }
  async sendOtp(email, channel) {
    const usageId = "17453383-c08f-11ec-bffa-0050568aa089";
    const taskName = "getIdentityInformation";

    return axios.post(API_URL, {
      usageId,
      taskName,
      email,
      channel,
    });
  }

  async verifyOtp(otp, transactionid, channel) {
    const taskName = "verifySignatureTransactionOTP";
    const resend = false;
    return axios.post(
      "http://172.31.250.15:5020/ws-signing/api/v2.2/transactions/" +
        transactionid +
        "/tasks?inputInline=true&outputInline=true",
      {
        taskName,
        otp,
        resend,
        channel,
      }
    );
  }
}
export default new OtpService();
