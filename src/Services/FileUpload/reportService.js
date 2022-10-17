import http from "./http-common";

class ReportService {
  exportReport = (status, date, type, reportName) => {
    return http.post(
      "exportReport",
      {
        status,
        date,
        type,
        reportName,
      },
      {
        responseType: "arraybuffer",
      }
    );
  };
  exportUserReport = () => {
    return http.post(
      "exportUserReport",
      {},
      {
        responseType: "arraybuffer",
      }
    );
  };
  sendReportsperEmail = (email, reports) => {
    return http.post("sendReports/" + email, {
      reports,
    });
  };
}
export default new ReportService();
